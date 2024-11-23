<?php

namespace App\GraphQL;

use App\Models\AttributeModel;
use App\Models\CategoryModel;
use App\Models\ProductModel;
use Attribute;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

/**
 * Product type to be used on GrapQL schema
 */
class ProductType extends ObjectType {

	public function __construct(
		CategoryType $categoryType,
		AttributeType $attributeType,
		ProductPriceType $priceType,

	) {
		$productModel = new ProductModel;
		$categoryModel = new CategoryModel;
		$attributeModel = new AttributeModel;

		parent::__construct([
			'name'			=> 'Product',
			'description'	=> 'A product',
			'fields'		=> [
				'id'			=> Type::string(),
				'name'			=> Type::string(),
				'in_stock'		=> Type::boolean(),
				'description'	=> Type::string(),
				'brand'			=> Type::string(),
				'category'		=> [
					'type'		=> $categoryType,
					'resolve'	=> function (array $product) use ($categoryModel): array {
						return $categoryModel->getOneById($product['category_id']);
					}
				],
				'images'		=> [
					'type' 		=> Type::listOf(Type::string()),
					'resolve'	=> function (array $product) use ($productModel): array  {
						return $productModel->getProductImages($product['id']);
					}
				],
				'attributes'	=> [
					'type'		=> Type::listOf($attributeType),
					'resolve'	=> function (array $product) use ($attributeModel): array {
						return $attributeModel->getAttributesByProductId($product['id']);
					}
				],
				'prices'		=> [
					'type'		=> Type::listOf($priceType),
					'resolve'	=> function (array $product) use ($productModel): array {
						return $productModel->getProductPrices($product['id']);
					}
				]
			]
		]);
	}
}