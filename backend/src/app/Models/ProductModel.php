<?php

namespace App\Models;

use PDO;

class ProductModel extends BaseModel {
	protected string $tableName = "product";


	/**
	 * Gets one or more products
	 * @param array{
	 * 		productId: string|null,
	 * 		categoryId: string|int|null
	 * } $filters Filters that can be used
	 */
	public function getProduct(array $filters) {
		if(!empty($filters['productId'])) {
			$this->where("{$this->tableName}.id = '{$filters['productId']}'");
		}

		if(!empty($filters['categoryId'])) {
			$this->where("{$this->tableName}.category_id = {$filters['categoryId']}");
		}

		$rows = $this->db->query("SELECT * FROM {$this->tableName} {$this->whereString}");
		return $rows->fetchAll(PDO::FETCH_NAMED) ?? [];
	}

	/**
	 * Fetch all the images of a product
	 */
	public function getProductImages(string $productId) {
		$rows = $this->db->query("SELECT image_url FROM product_images WHERE product_id = '{$productId}'");
		return $rows->fetchAll(PDO::FETCH_COLUMN, 0) ?? [];
	}

	/**
	 * Fetch all the prices of a product
	 */
	public function getProductPrices(string $productId) {
		$rows = $this->db->query("SELECT * FROM product_prices WHERE product_id = '{$productId}'");
		return $rows->fetchAll(PDO::FETCH_NAMED) ?? [];
	}
}