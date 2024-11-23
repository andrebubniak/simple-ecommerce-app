<?php

namespace App\Models;

use PDO;
use PDOException;

class CategoryModel extends BaseModel {
	protected string $tableName = "category";

	/**
	 * Get a category given a product ID
	 */
	public function getCategoryByProductId(string|int $productId) {
		$rows = $this->db->query("SELECT {$this->tableName}.id, {$this->tableName}.name FROM {$this->tableName} LEFT JOIN product ON {$this->tableName}.id = product.category_id WHERE product.id = '{$productId}' LIMIT 1");
		return $rows->fetchAll()[0] ?? [];
	}

	/**
	 * Get Some categories
	 */
	public function getCategories(?int $categoryId = null): array|string {
		try {
			if($categoryId) {
				$rows = $this->db->query("SELECT {$this->tableName}.id, {$this->tableName}.name FROM {$this->tableName} WHERE {$this->tableName}.id = {$categoryId}");
			} else {
				$rows = $this->db->query("SELECT {$this->tableName}.id, {$this->tableName}.name FROM {$this->tableName}");
			}
			// print_r(['p' => $rows->fetchAll(PDO::FETCH_NAMED)]);
			return $rows->fetchAll(PDO::FETCH_NAMED) ?? [];
		} catch (PDOException $e) {
			return $e->getMessage();
		}
	}
}