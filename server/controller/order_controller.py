from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.order_model import SessionLocal, Order, OrderItem
from views.order_view import OrderCreate, calculate_discount
from schemas.order_schemas import OrderBase, OrderCreate
from datetime import datetime

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/add_to_cart", response_model=OrderBase)
def add_to_cart(order: OrderCreate, db: Session = Depends(get_db)):
    total_items = order.sushi_a_qty + order.sushi_b_qty
    order_time = datetime.now()

    price_a = 3
    price_b = 4
    total_price = (order.sushi_a_qty * price_a) + (order.sushi_b_qty * price_b)
    
    discount, discount_name = calculate_discount(total_items, order_time)
    final_price = total_price * (1 - discount)

    db_order = Order(
        customer_name=order.customer_name,
        order_time=order_time,
        total_price=total_price,
        discount_applied=discount_name,
        final_price=final_price
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    db_items = [
        OrderItem(order_id=db_order.id, sushi_type="Sushi A", quantity=order.sushi_a_qty),
        OrderItem(order_id=db_order.id, sushi_type="Sushi B", quantity=order.sushi_b_qty)
    ]
    db.add_all(db_items)
    db.commit()

    return {
        'id': db_order.id,
        'customer_name': db_order.customer_name,
        'order_time': db_order.order_time,
        'total_price': db_order.total_price,
        'discount_applied': db_order.discount_applied,
        'final_price': db_order.final_price,
        'items': [{'sushi_type': item.sushi_type, 'quantity': item.quantity} for item in db_items]
    }

@router.get("/fetch_orders", response_model=List[OrderBase])
def fetch_orders(db: Session = Depends(get_db)):
    orders = db.query(Order).all()
    orders_list = []
    for order in orders:
        order_items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
        orders_list.append({
            'id': order.id,
            'customer_name': order.customer_name,
            'order_time': order.order_time,
            'total_price': order.total_price,
            'discount_applied': order.discount_applied,
            'final_price': order.final_price,
            'items': [{'sushi_type': item.sushi_type, 'quantity': item.quantity} for item in order_items]
        })
    return orders_list
