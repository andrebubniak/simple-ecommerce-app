<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CategoryType extends ObjectType {

	public function __construct()
	{
		parent::__construct([
			'name'			=> 'Category',
			'description'	=> "A product category",
			'fields'		=> [
				'id'		=> Type::nonNull(Type::int()),
				'name'		=> Type::nonNull(Type::string()),
			]
		]);
	}
}