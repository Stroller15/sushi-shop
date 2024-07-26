from fastapi import FastAPI
from controllers import order_controller
from database.database import init_db

app = FastAPI()

init_db()

app.include_router(order_controller.router)
