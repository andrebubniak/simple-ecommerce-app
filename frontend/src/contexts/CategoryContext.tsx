import { createContext, Component, ReactNode } from "react"
import { graphql } from "../utils/graphql"

type CategoryContextState = {
	categories?: GraphQL.CategoryType[] | null
	loading: boolean
	errorMessage?: string | null
}

// Create CategoryContext
const CategoryContext = createContext<CategoryContextState>({
	loading: true,
	errorMessage: null,
	categories: null,
})

// CategoryProvider class component
export class CategoryProvider extends Component<
	{ children: ReactNode },
	CategoryContextState
> {
	constructor(props: { children: ReactNode }) {
		super(props)
		this.state = {
			loading: true,
			errorMessage: null,
			categories: null,
		}
	}

	componentDidMount(): void {
		graphql(`
			query {
				categories {
					id
					name
				}
			}
		`)
			.then((res) => {
				if (res.errors?.length) {
					this.setState({
						categories: null,
						loading: false,
						errorMessage: res.errors[0].message,
					})
					return
				}
				this.setState({
					categories: (res as GraphQL.QueryReturnType).data?.categories,
					loading: false,
					errorMessage: null,
				})
			})
			.catch((err) => {
				console.error(err)
				this.setState({
					categories: null,
					loading: false,
					errorMessage: "Unexpected Error",
				})
			})
	}

	render() {
		return (
			<CategoryContext.Provider value={this.state}>
				{this.props.children}
			</CategoryContext.Provider>
		)
	}
}

export const CategoryConsumer = CategoryContext.Consumer
