# import requests
# import pandas as pd
# import os
# from datetime import datetime
#
# class AlphaVantageLoader:
#     BASE_URL = "https://www.alphavantage.co/query"
#
#     def __init__(self):
#         self.api_key = "5N4F6JOM1PKLGUIK"
#         if not self.api_key:
#             raise ValueError("API Key missing! Set ALPHA_VANTAGE_API_KEY in .env")
#
#     def get_historical_data(self, symbol: str, interval: str = "1min", outputsize: str = "compact"):
#         params = {
#             "function": "TIME_SERIES_INTRADAY",
#             "symbol": symbol,
#             "interval": interval,
#             "outputsize": outputsize,
#             "apikey": self.api_key
#         }
#         response = requests.get(self.BASE_URL, params=params)
#
#         if response.status_code != 200:
#             raise Exception(f"Error fetching data: {response.status_code}")
#
#         data = response.json()
#         key = f"Time Series ({interval})"
#         if key not in data:
#             raise Exception("Invalid response from Alpha Vantage")
#
#         df = pd.DataFrame.from_dict(data[key], orient="index")
#         df.index = pd.to_datetime(df.index)
#         df = df.rename(columns={
#             "1. open": "open",
#             "2. high": "high",
#             "3. low": "low",
#             "4. close": "close",
#             "5. volume": "volume"
#         })
#         df = df.sort_index()
#         return df
#
# loader = AlphaVantageLoader()
# df = loader.get_historical_data(symbol="AAPL", interval="5min")
# print(df.head())


import yfinance as yf
import pandas as pd
from datetime import datetime

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


loader = YahooFinanceLoader()
df = loader.get_historical_data(symbol="AAPL", interval="5min", start="2025-06-01", end="2025-06-13")
print(df.head())

