from datetime import datetime

def calculate_discount(total_items, order_time):
    discount = 0
    discount_name = ""

    if total_items >= 20:
        discount = 0.20
        discount_name = "20 Deal"
    elif total_items >= 10:
        discount = 0.10
        discount_name = "10 Deal"

    if order_time.hour >= 11 and order_time.hour <= 14:
        if discount > 0:
            discount += 0.20
            discount_name += " + Lunch Deal"
        else:
            discount = 0.20
            discount_name = "Lunch Deal"

    return discount, discount_name
