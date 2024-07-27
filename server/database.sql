
CREATE TABLE sushi_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(5, 2) NOT NULL
);


CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL(7, 2) NOT NULL,
    total_discount DECIMAL(7, 2) NOT NULL
);


CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    sushi_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (sushi_id) REFERENCES sushi_items(id)
);


INSERT INTO sushi_items (name, price) VALUES ('Sushi A', 3.00), ('Sushi B', 4.00);