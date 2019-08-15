DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(100) NOT NULL,
  category  VARCHAR(45) NOT NULL,
  price INT default 0,
  qty INT default 0,
  PRIMARY KEY (id)
);
INSERT INTO products (item_name, category, price, qty)
VALUES  ('Ceramic Mug ', 'Home', 27.99, 100),
		('Cetaphil Cleanser', 'Cosmetics', 12.99, 630),
		('Mother Board', 'Electronics', 120.99, 300),
		('Paper Towels', 'Grocery', 6.25, 300),
		('Apples', 'Produce', 0.85, 100),
		('Bannana', 'Produce', 0.10, 1000),
		('Scissors', 'Home', 17.99, 290),
		('Organic Milk', 'Grocery', 4.55, 200),
		('Siriacha', 'Grocery', 6.99, 575),
		('Duvet cover set', 'Home', 51.50, 400),
		('Yoga Mat', 'Sports', 12.75, 150),
		('Solar Lights', 'Electronics', 19.99, 99),
		('Headphones', 'Electronics', 41.00, 520),
		('Mouse Pad', 'Office', 9.88, 200)
