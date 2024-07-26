
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    order_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_price FLOAT NOT NULL,
    discount_applied VARCHAR(50),
    final_price FLOAT NOT NULL
);


CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    sushi_type VARCHAR(50),
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
