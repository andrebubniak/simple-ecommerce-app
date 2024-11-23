export function convertDecimal(price: GraphQL.PriceType) {
	if (!price.amount) {
		return 0
	}

	const decimalPrice = (price.amount! / 100).toFixed(2)
	const currencySymbol = price.currency_symbol ?? "$"

	return `${currencySymbol}${decimalPrice}`
}
