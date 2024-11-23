<?php

namespace App\GraphQL;

use App\Models\AttributeModel;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeType extends ObjectType {

	public function __construct()
	{
		$attributeItemType = new AttributeItemType;

		parent::__construct([
			'name'			=> "Attribute",
			'description'	=> "An attribute for a product",
			'fields'		=> [
				'id'		=> Type::nonNull(Type::int()),
				'name' 		=> Type::string(),
				'type'		=> Type::string(),
				'items'		=> [
					'type'		=> Type::listOf($attributeItemType),
					'resolve'	=> function (array $attribute) {
						return (new AttributeModel)->getAttributeItems($attribute['id']);
					}
				]
			]
		]);
	}
}