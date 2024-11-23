<?php

namespace App\Controllers;

use App\GraphQL\AttributeType;
use App\GraphQL\CategoryType;
use App\GraphQL\ProductPriceType;
use App\GraphQL\ProductType;
use App\Models\CategoryModel;
use App\Models\OrderModel;
use App\Models\ProductModel;
use GraphQL\GraphQL;
use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use Throwable;

class GraphqlController {

	public static function handle() {
		try {
			$categoryType = new CategoryType;
			$productType = new ProductType(
				$categoryType,
				new AttributeType,
				new ProductPriceType
			);

			$queryType = new ObjectType([
				'name' => 'Query',
				'fields' => [
					'products' => [
						'type'	=> Type::listOf($productType),
						'args'	=> [
							'productId'		=> Type::getNullableType(Type::string()),
							'categoryId'	=> Type::getNullableType(Type::int()),
						],
						'resolve' => function ($_, array $args) {
							return (new ProductModel)->getProduct([
								'productId'			=> empty($args['productId']) ? '' : $args['productId'],
								'categoryId'		=> empty($args['categoryId']) ? '' : $args['categoryId'],
							]);
						}
					],
					'categories' => [
						'type'	=> Type::listOf($categoryType),
						'args'	=> [
							'id' => Type::getNullableType(Type::int())
						],
						'resolve'	=> function ($_, array $args) {
							return (new CategoryModel)->getCategories(empty($args['id']) ? null : $args['id']);
						}
					]
				]
			]);

			$productInputType = new InputObjectType([
				'name'			=> "ProductInput",
				'description'	=> "Product Mutation input",
				'fields'		=> [
					'productId'			=> Type::nonNull(Type::string()),
					'priceId'			=> Type::getNullableType(Type::int()),
					'amount'			=> Type::nonNull(Type::int()),
					'attributeItemsIds'	=> Type::getNullableType(Type::listOf(Type::int()))
				]
			]);

			$mutationType = new ObjectType([
				'name' => 'Create Order',
				'fields' => [
					'createOrder' => [
						'type' => Type::int(), // return only the key of the order 
						'args' => [
							'products'			=> Type::listOf($productInputType)
						],
						'resolve' => function ($_, array $args) {
							return (new OrderModel)->insert($args);
						}
					]
				]
			]);

			$schema = new Schema([
				'query' => $queryType,
				'mutation'	=> $mutationType
			]);

			header('Content-Type: application/json; charset=UTF-8');

			$rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
				return json_encode([
					'error' => 'A body must be provided'
				]);
            }
        
            $input = json_decode($rawInput, true);
            $query = $input['query'] ?? "";
			if(empty($query)) {
				return json_encode([
					'error' => 'A query must be defined'
				]);
			}

            $variableValues = $input['variables'] ?? null;
        
			$result = GraphQL::executeQuery($schema, $query, null, null, $variableValues);
            $output = $result->toArray();

			return json_encode($output);

		} catch (Throwable $t) {
			print_r($t);
			header('Content-Type: application/json; charset=UTF-8');
			return json_encode([
				'error' => $t->getMessage()
			]);
		}
	}
}