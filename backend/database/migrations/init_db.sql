CREATE TABLE category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE product (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    in_stock BOOLEAN NOT NULL DEFAULT true,
    description TEXT NOT NULL,
    category_id BIGINT NOT NULL,
    brand VARCHAR(255) NOT NULL,
	FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE product_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255),
    image_url VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE product_prices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255),
    amount INT NOT NULL,
    currency_label VARCHAR(10),
    currency_symbol VARCHAR(5),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE product_attribute (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
	FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE product_attribute_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    attribute_id BIGINT,
    display_value VARCHAR(50),
    value VARCHAR(50),
    FOREIGN KEY (attribute_id) REFERENCES product_attribute(id)
);

CREATE TABLE orders (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	order_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_order (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	order_id BIGINT NOT NULL,
	product_id VARCHAR(255) NOT NULL,
	product_price_id BIGINT NOT NULL,
	product_amount INT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES orders(id),
	FOREIGN KEY (product_id) REFERENCES product(id),
	FOREIGN KEY (product_price_id) REFERENCES product_prices(id)
);

CREATE TABLE product_order_attribute_item (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	product_order_id BIGINT NOT NULL,
	product_attribute_item_id BIGINT NOT NULL,
	FOREIGN KEY (product_order_id) REFERENCES product_order(id),
	FOREIGN KEY (product_attribute_item_id) REFERENCES product_attribute_items(id)
);
