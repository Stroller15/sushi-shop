from pydantic import BaseModel
from datetime import datetime
from typing import List

class OrderItemBase(BaseModel):
    sushi_type: str
    quantity: int

class OrderCreate(BaseModel):
    customer_name: str
    sushi_a_qty: int
    sushi_b_qty: int

class OrderBase(BaseModel):
    id: int
    customer_name: str
    order_time: datetime
    total_price: float
    discount_applied: str
    final_price: float
    items: List[OrderItemBase]
