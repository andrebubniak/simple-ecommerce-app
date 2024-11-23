/**
 * Defines the graphql return types
 */
declare namespace GraphQL {
	type CategoryType = {
		id?: number
		name?: string
	}

	type AttributeItemType = {
		id?: number
		value?: string
		display_value?: string
	}

	type AttributeType = {
		id?: number
		name?: string
		type?: string
		items?: AttributeItemType[]
	}

	/**
	 * When there is already a selected attribute item
	 *
	 */
	type AttributeWithSelectedItemType = AttributeType & {
		/**
		 * The selected item id
		 */
		selected?: number
	}

	type PriceType = {
		id?: number
		amount?: number
		currency_label?: string
		currency_symbol?: string
	}

	type ProductType = {
		id?: string
		name?: string
		in_stock?: boolean
		description?: string
		brand?: string
		category?: CategoryType
		attributes?: AttributeType[]
		prices?: PriceType[]
		images?: string[]
	}

	/**
	 * Returned from a successful query
	 */
	type QueryReturnType = {
		data?: {
			products: ProductType[]
			categories: CategoryType[]
		}
		errors?: ErrorReturnType[]
	}

	/**
	 * Returned from a successful order mutation (creation)
	 */
	type OrderMutationReturnType = {
		data?: {
			id: number
		}
		errors?: ErrorReturnType[]
	}

	/**
	 * Error returned either from a failed query or a failed mutation
	 */
	type ErrorReturnType = {
		message: string
		locations: {
			line: number
			column: number
		}[]
	}
}
