-- Categories
INSERT IGNORE INTO category (id, name) VALUES
(1, 'clothes'),
(2, 'tech');


-- Products
INSERT IGNORE INTO product (id, name, in_stock, description, category_id, brand) VALUES
('huarache-x-stussy-le', 'Nike Air Huarache Le', true, '<p>Great sneakers for everyday use!</p>', 1, 'Nike x Stussy'),
('jacket-canada-goosee', 'Jacket', true, '<p>Awesome winter jacket</p>', 1, 'Canada Goose'),
('ps-5', 'PlayStation 5', true, '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>', 2, 'Sony'),
('xbox-series-s', 'Xbox Series S 512GB', false, '<div><ul><li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li><li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li><li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li><li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li><li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li><li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li><li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li><li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li><li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li><li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies & TV und mehr</span></li></ul></div>', 2, 'Microsoft'),
('apple-imac-2021', 'iMac 2021', true, 'The new iMac!', 2, 'Apple'),
('apple-iphone-12-pro', 'iPhone 12 Pro', true, 'This is iPhone 12. Nothing else to say.', 2, 'Apple'),
('apple-airpods-pro', 'AirPods Pro', false, '<h3>Magic like you’ve never heard</h3><p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound...</p>', 2, 'Apple'),
('apple-airtag', 'AirTag', true, '<h1>Lose your knack for losing things.</h1><p>AirTag is an easy way to keep track of your stuff...</p>', 2, 'Apple');

-- Images
INSERT IGNORE INTO product_images (id, product_id, image_url) VALUES
(1, 'huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087'),
(2, 'huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087'),
(3, 'huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087'),
(4, 'huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087'),
(5, 'huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087'),
(6, 'jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg'),
(7, 'jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg'),
(8, 'jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg'),
(9, 'jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg'),
(10, 'jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg'),
(11, 'jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png'),
(12, 'jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png'),
(13, 'ps-5', 'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg'),
(14, 'ps-5', 'https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg'),
(15, 'ps-5', 'https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg'),
(16, 'ps-5', 'https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg'),
(17, 'ps-5', 'https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg'),
(18, 'xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg'),
(19, 'xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg'),
(20, 'xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg'),
(21, 'xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg'),
(22, 'xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg'),
(23, 'apple-imac-2021', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000'),
(24, 'apple-iphone-12-pro', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&hei=1112&fmt');


-- Prices
INSERT IGNORE INTO product_prices (id, product_id, amount, currency_label, currency_symbol) VALUES
(1, 'huarache-x-stussy-le', 14469, 'USD', '$'),
(2, 'jacket-canada-goosee', 51847, 'USD', '$'),
(3, 'ps-5', 84402, 'USD', '$'),
(4, 'xbox-series-s', 33399, 'USD', '$'),
(5, 'apple-imac-2021', 168803, 'USD', '$'),
(6, 'apple-iphone-12-pro', 100076, 'USD', '$'),
(7, 'apple-airpods-pro', 30023, 'USD', '$'),
(8, 'apple-airtag', 12057, 'USD', '$');


-- Attributes
INSERT IGNORE INTO product_attribute (id, product_id, name, type) VALUES 
(1, 'huarache-x-stussy-le', 'Size', 'text'),
(2, 'jacket-canada-goosee', 'Size', 'text'),
(3, 'ps-5', 'Color', 'swatch'),
(4, 'ps-5', 'Capacity', 'text'),
(5, 'xbox-series-s', 'Color', 'swatch'),
(6, 'xbox-series-s', 'Capacity', 'text'),
(7, 'apple-imac-2021', 'Capacity', 'text'),
(8, 'apple-imac-2021', 'With USB 3 ports', 'text'),
(9, 'apple-imac-2021', 'Touch ID in keyboard', 'text'),
(10, 'apple-iphone-12-pro', 'Capacity', 'text'),
(11, 'apple-iphone-12-pro', 'Color', 'swatch');


-- Attribute items

-- Size for Nike Air Huarache Le
INSERT IGNORE INTO product_attribute_items (id, attribute_id, display_value, value) VALUES 
(1, 1, '40', '40'),  
(2, 1, '41', '41'),
(3, 1, '42', '42'),
(4, 1, '43', '43'),

-- Size for Jacket
(5, 2, 'Small', 'S'),  
(6, 2, 'Medium', 'M'),
(7, 2, 'Large', 'L'),
(8, 2, 'Extra Large', 'XL'),

-- Color for PlayStation 5
(9,  3, 'Green', '#44FF03'),  
(10, 3, 'Cyan', '#03FFF7'),
(11, 3, 'Blue', '#030BFF'),
(12, 3, 'Black', '#000000'),
(13, 3, 'White', '#FFFFFF'),

-- Capacity for PlayStation 5
(14, 4, '512G', '512G'),  
(15, 4, '1T', '1T'),

-- Color for Xbox Series S
(16, 5, 'Green', '#44FF03'),  
(17, 5, 'Cyan', '#03FFF7'),
(18, 5, 'Blue', '#030BFF'),
(19, 5, 'Black', '#000000'),
(20, 5, 'White', '#FFFFFF'),

-- Capacity for Xbox Series S
(21, 6, '512G', '512G'),  
(22, 6, '1T', '1T'),

-- Capacity for iMac 2021
(23, 7, '256G', '256G'),  
(24, 7, '512G', '512G'),

-- With USB 3 ports for iMac 2021
(25, 8, 'Yes', 'Yes'),  
(26, 8, 'No', 'No'),

-- Touch ID in keyboard for iMac 2021
(27, 9, 'Yes', 'Yes'),  
(28, 9, 'No', 'No'),

-- Capacity for iPhone 12 Pro
(29, 10, '512G', '512G'),  
(30, 10, '1T', '1T'),

-- Color for iPhone 12 Pro
(31, 11, 'Green', '#44FF03'),  
(31, 11, 'Cyan', '#03FFF7'),
(33, 11, 'Blue', '#030BFF'),
(34, 11, 'Black', '#000000'),
(35, 11, 'White', '#FFFFFF');