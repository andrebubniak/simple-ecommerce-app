<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

/**
 * Product type to be used on GrapQL schema
 */
class ProductPriceType extends ObjectType {

	public function __construct()
	{
		parent::__construct([
			'name'			=> "Product Price",
			'description'	=> "Instance of a product price",
			'fields'		=> [
				'id'					=> Type::nonNull(Type::int()),
				'amount'				=> Type::nonNull(Type::int()),
				'currency_label'		=> Type::string(),
				'currency_symbol'		=> Type::string(),
			]
		]);
	}
}