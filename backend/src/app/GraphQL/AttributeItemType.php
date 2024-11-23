<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeItemType extends ObjectType {

	public function __construct()
	{
		parent::__construct([
			'name'			=> "Attribute Item",
			'description'	=> "Instance of a product attribute",
			'fields'		=> [
				'id'		=> Type::nonNull(Type::int()),
				'value'			=> Type::string(),
				'display_value'	=> Type::string()
			]
		]);
	}
}