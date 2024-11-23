<?php

namespace App\Models;

use PDO;

class AttributeModel extends BaseModel {
	protected string $tableName = "product_attribute";

	/**
	 * Get the attributes of a product
	 */
	public function getAttributesByProductId(string|int $productId) {
		$rows = $this->db->query("SELECT id, name, type FROM {$this->tableName} WHERE {$this->tableName}.product_id = '{$productId}'");
		return $rows->fetchAll(PDO::FETCH_NAMED) ?? [];
	}

	public function getAttributeItems(string|int $attributeId) {
		$rows = $this->db->query("SELECT id, value, display_value FROM product_attribute_items WHERE attribute_id = '{$attributeId}'");
		return $rows->fetchAll(PDO::FETCH_NAMED) ?? [];
	}
}