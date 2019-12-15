DROP DATABASE IF EXISTS products_db;

CREATE DATABASE products_db;

USE products_db;

CREATE TABLE products_list(
item_id INTEGER(50) AUTO_INCREMENT NOT NULL,

product_name VARCHAR(30),

department_name VARCHAR(20),

price DECIMAL(10,2),

stock_quantity INTEGER(3),

PRIMARY KEY (item_id)
);

INSERT INTO products_list (product_name, department_name, price, stock_quantity)
VALUES ("Apple Macbook", "Computers", 1500.00, 5);

INSERT INTO products_list (product_name, department_name, price, stock_quantity)
VALUES ("4K TV", "Entertainment", 2000.00, 15);

INSERT INTO products_list (product_name, department_name, price, stock_quantity)
VALUES ("3D Printing Filament (White)", "DIY", 14.99, 10);

INSERT INTO products_list (product_name, department_name, price, stock_quantity)
VALUES ("3D Printing Filament (Black)", "DIY", 14.99, 9);

INSERT INTO products_list (product_name, department_name, price, stock_quantity)
VALUES ("3D Printing Filament (Blue)", "DIY", 19.99, 12);

INSERT INTO products_list (product_name, department_name, price, stock_quantity)
VALUES ("SUPER ULTIMATE 3D PRINTAH", "DIY", 5000.00, 1);

INSERT INTO products_list (product_name, department_name, price, stock_quantity)
VALUES ("4k Projector", "Entertainment", 2500.00, 4);

INSERT INTO products_list (product_name, department_name, price, stock_quantity)
VALUES ("4k Projector", "Entertainment", 2500.00, 4);

INSERT INTO products_list (product_name, department_name, price, stock_quantity)
VALUES ("4k Camera", "Media", 1400.00, 6);

INSERT INTO products_list (product_name, department_name, price, stock_quantity)
VALUES ("Raspberry Pi 4 Model B ", "DIY", 35.00, 20);

SELECT * FROM products_list;