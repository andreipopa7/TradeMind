from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import uvicorn

from presentation.controllers.user_controller import router as user_router
from presentation.controllers.trading_account_controller import router as accounts_router
from presentation.controllers.trade_controller import router as trade_router

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(accounts_router)
app.include_router(trade_router)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
