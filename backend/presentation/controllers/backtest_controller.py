from fastapi import APIRouter
from business.bto.backtest_bto import BacktestRequestBTO, BacktestResultBTO
from business.bao.services.backtest_bao_service import BacktestService

router = APIRouter(
    prefix="/backtest",
    tags=["Backtest"]
)

@router.post("", response_model=BacktestResultBTO)
def run_backtest(request: BacktestRequestBTO):
    result = BacktestService.run_backtest(request)
    return result
