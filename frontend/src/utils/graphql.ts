export const graphql = async (
	query: string,
	variables = {}
): Promise<GraphQL.QueryReturnType | GraphQL.OrderMutationReturnType> => {
	return new Promise((resolve, reject) => {
		// api url
		const url = import.meta.env.PROD ? "" : "http://localhost:8000/graphql"

		fetch(url, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ query, variables }),
		})
			.then(async (response) => {
				const data: GraphQL.QueryReturnType | GraphQL.OrderMutationReturnType =
					await response.json()
				resolve(data)
			})
			.catch((error) => {
				reject(error)
			})
	})
}
