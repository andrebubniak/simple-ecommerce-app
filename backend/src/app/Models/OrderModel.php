<?php

namespace App\Models;
use App\Models\BaseModel;
use DateTime;

class OrderModel extends BaseModel {

	/**
	 * Insert a new order
	 * @param array{
	 * 		products: array{
	 * 			productId: string,
	 * 			priceId: int,
	 * 			amount: int,
	 * 			attributeItemsIds: string[]
	 * 		}[]
	 * } $data Data to be inserted
	 * @todo Error message when product is out of stock
	 */
	public function insert($data) {
		$this->db->query("INSERT INTO orders () VALUES ()");
		$orderId = $this->db->lastInsertId();

		
		foreach($data['products'] as $orderProduct) {

			// prevent negative amount
			$orderProduct['amount'] = abs($orderProduct['amount']);
			// inserts the product_order
			$this->db->query("INSERT INTO product_order (order_id, product_id, product_price_id, product_amount) VALUES ({$orderId}, '{$orderProduct['productId']}', {$orderProduct['priceId']}, {$orderProduct['amount']})");
			$productOrderId = $this->db->lastInsertId();

			foreach($orderProduct['attributeItemsIds'] as $attributeItemsId) {
				// inserts the product_order_attribute_items
				$this->db->query("INSERT INTO product_order_attribute_item (product_order_id, product_attribute_item_id) VALUES ({$productOrderId}, {$attributeItemsId})");
			}
		}
		return $orderId;
	}
}