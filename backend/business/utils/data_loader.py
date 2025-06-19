import requests
import pandas as pd
import os
from datetime import datetime, timedelta
import yfinance as yf


class AlphaVantageLoader:
    BASE_URL = "https://www.alphavantage.co/query"

    def __init__(self):
        self.api_key = os.getenv("ALPHA_VANTAGE_API_KEY")
        if not self.api_key:
            raise ValueError("API Key missing! Set ALPHA_VANTAGE_API_KEY in .env")

    def get_historical_data(self, symbol: str, interval: str = "1min", outputsize: str = "compact"):
        params = {
            "function": "TIME_SERIES_INTRADAY",
            "symbol": symbol,
            "interval": interval,
            "outputsize": outputsize,
            "apikey": self.api_key
        }
        response = requests.get(self.BASE_URL, params=params)

        if response.status_code != 200:
            raise Exception(f"Error fetching data: {response.status_code}")

        data = response.json()
        key = f"Time Series ({interval})"
        if key not in data:
            raise Exception("Invalid response from Alpha Vantage")

        df = pd.DataFrame.from_dict(data[key], orient="index")
        df.index = pd.to_datetime(df.index)
        df = df.rename(columns={
            "1. open": "open",
            "2. high": "high",
            "3. low": "low",
            "4. close": "close",
            "5. volume": "volume"
        })
        df = df.sort_index()
        return df


class YahooFinanceLoader:
    def get_historical_data(self, symbol: str, interval: str = "1m", start: str = None, end: str = None):
        interval_mapping = {
            "1min": "1m",
            "5min": "5m",
            "15min": "15m",
            "30min": "30m",
            "60min": "60m",
            "daily": "1d"
        }

        yf_interval = interval_mapping.get(interval, "1m")

        if not start or not end:
            end_date = datetime.today().strftime('%Y-%m-%d')
            start_date = (datetime.today() - pd.Timedelta(days=7)).strftime('%Y-%m-%d')
        else:
            start_date = start
            end_date = end

        df = yf.download(symbol, start=start_date, end=end_date, interval=yf_interval)

        df = df.rename(columns={
            "Open": "open",
            "High": "high",
            "Low": "low",
            "Close": "close",
            "Volume": "volume"
        })

        df.index = pd.to_datetime(df.index)
        df = df.sort_index()
        return df


class BinanceLoader:
    BASE_URL = "https://api.binance.com/api/v3/klines"

    def get_historical_data(self, symbol: str, interval: str = "1m", start: str = None, end: str = None,
                            limit: int = 1000) -> tuple[pd.DataFrame, list[dict]]:
        """
        :param symbol: Ex: "BTCUSDT"
        :param interval: Binance intervals: "1m", "5m", "15m", "1h", "1d" etc.
        :param start: format "YYYY-MM-DD"
        :param end: format "YYYY-MM-DD"
        :param limit: max 1000 per request (Binance API limitation)
        """
        if not start or not end:
            end_dt = datetime.utcnow()
            start_dt = end_dt - timedelta(days=1)
        else:
            start_dt = datetime.strptime(start, "%Y-%m-%d")
            end_dt = datetime.strptime(end, "%Y-%m-%d")

        start_ts = int(start_dt.timestamp() * 1000)
        end_ts = int(end_dt.timestamp() * 1000)

        df_all = pd.DataFrame()

        while start_ts < end_ts:
            params = {
                "symbol": symbol.upper(),
                "interval": interval,
                "startTime": start_ts,
                "endTime": end_ts,
                "limit": limit
            }

            response = requests.get(self.BASE_URL, params=params)
            if response.status_code != 200:
                raise Exception(f"Binance API error: {response.status_code}")

            data = response.json()
            if not data:
                break

            df = pd.DataFrame(data, columns=[
                "open_time", "open", "high", "low", "close", "volume",
                "close_time", "quote_asset_volume", "number_of_trades",
                "taker_buy_base_volume", "taker_buy_quote_volume", "ignore"
            ])

            df["open_time"] = pd.to_datetime(df["open_time"], unit="ms")
            df = df.set_index("open_time")
            df = df[["open", "high", "low", "close", "volume"]].astype(float)

            df_all = pd.concat([df_all, df])

            last_time = data[-1][0]
            start_ts = last_time + 1

        # return df_all.sort_index()

        df_all = df_all.sort_index()

        candles = [
            {
                "time": int(ts.timestamp()),
                "open": row["open"],
                "high": row["high"],
                "low": row["low"],
                "close": row["close"]
            }
            for ts, row in df_all.iterrows()
        ]

        return df_all, candles