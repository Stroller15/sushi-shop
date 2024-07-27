from flask import Flask, request, jsonify
from datetime import datetime
import mysql.connector

app = Flask(__name__)

# Database connection (assumed to be set up)
db = mysql.connector.connect(
    host="localhost",
    user="your_username",
    password="your_password",
    database="susan_sushi_shop"
)

def calculate_discount(total_pieces, order_time):
    discount = 0
    if total_pieces >= 20:
        discount = 0.20
    elif total_pieces >= 10:
        discount = 0.10
    
    # Check for lunch deal (11:00 - 14:00)
    if 11 <= order_time.hour < 14:
        discount = max(discount, 0.20)
    
    return discount

@app.route('/api/add-to-cart', methods=['POST'])
def add_to_cart():
    data = request.json
    sushi_a = data.get('sushiA', 0)
    sushi_b = data.get('sushiB', 0)
    
    # Calculate total price and apply discount
    total_pieces = sushi_a + sushi_b
    total_price = (sushi_a * 3) + (sushi_b * 4)
    discount = calculate_discount(total_pieces, datetime.now())
    discounted_price = total_price * (1 - discount)
    
    # In a real app, we'd save this to a cart in the database or session
    return jsonify({
        'totalPrice': total_price,
        'discount': discount,
        'discountedPrice': discounted_price
    })

@app.route('/api/place-order', methods=['POST'])
def place_order():
    data = request.json
    sushi_a = data.get('sushiA', 0)
    sushi_b = data.get('sushiB', 0)
    
    total_pieces = sushi_a + sushi_b
    total_price = (sushi_a * 3) + (sushi_b * 4)
    discount = calculate_discount(total_pieces, datetime.now())
    discounted_price = total_price * (1 - discount)
    
    cursor = db.cursor()
    
    # Insert order
    cursor.execute(
        "INSERT INTO orders (total_price, total_discount) VALUES (%s, %s)",
        (discounted_price, total_price - discounted_price)
    )
    order_id = cursor.lastrowid
    
    # Insert order items
    if sushi_a > 0:
        cursor.execute(
            "INSERT INTO order_items (order_id, sushi_id, quantity) VALUES (%s, %s, %s)",
            (order_id, 1, sushi_a)
        )
    if sushi_b > 0:
        cursor.execute(
            "INSERT INTO order_items (order_id, sushi_id, quantity) VALUES (%s, %s, %s)",
            (order_id, 2, sushi_b)
        )
    
    db.commit()
    
    return jsonify({'orderId': order_id, 'message': 'Order placed successfully'})

@app.route('/api/orders', methods=['GET'])
def get_orders():
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT o.id, o.created_at, o.total_price, o.total_discount,
               SUM(CASE WHEN si.id = 1 THEN oi.quantity ELSE 0 END) as sushi_a_quantity,
               SUM(CASE WHEN si.id = 2 THEN oi.quantity ELSE 0 END) as sushi_b_quantity
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN sushi_items si ON oi.sushi_id = si.id
        GROUP BY o.id
        ORDER BY o.created_at DESC
    """)
    orders = cursor.fetchall()
    return jsonify(orders)

if __name__ == '__main__':
    app.run(debug=True)