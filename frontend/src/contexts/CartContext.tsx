import { createContext, Component, ReactNode } from "react"

export type CartProduct = {
	id: string
	name: string
	attributes?: GraphQL.AttributeWithSelectedItemType[]
	price?: GraphQL.PriceType
	image?: string
	amount?: number
}

type CartContextState = {
	products: CartProduct[]
	productQuantity: number
	productTotalValue: number
	isCartOpen: boolean
}

/**
 * Data that is going through CartContext Provider
 */
type CartContextData = {
	addToCart: (product: Omit<CartProduct, "amount">) => void
	removeFromCart: (product: Omit<CartProduct, "amount">) => void
	clearCart: () => void
	toggleCartOpenClose: (open: boolean) => void
	cart: CartContextState
}

// Create CartContext
const CartContext = createContext<CartContextData | undefined>(undefined)

// CartProvider class component
class CartProvider extends Component<
	{ children: ReactNode },
	CartContextState
> {
	constructor(props: { children: ReactNode }) {
		super(props)

		// Gets cart state from localStorage
		const savedCartState = localStorage.getItem("cart")

		if (savedCartState) {
			this.state = JSON.parse(savedCartState)
		} else {
			this.state = {
				products: [],
				productQuantity: 0,
				productTotalValue: 0,
				isCartOpen: false,
			}
		}
	}

	addToCart(product: Omit<CartProduct, "amount">) {
		this.setState(
			(prevState) => {
				const newState: CartContextState = {
					productQuantity: prevState.productQuantity + 1,
					productTotalValue:
						prevState.productTotalValue + (product.price?.amount || 0),
					products: [],
					isCartOpen: prevState.isCartOpen,
				}

				// Check if the product already exists in the cart
				const existingProductIndex = prevState.products.findIndex(
					(prod) =>
						prod.id === product.id &&
						JSON.stringify(prod.attributes) ===
							JSON.stringify(product.attributes) &&
						JSON.stringify(prod.price) === JSON.stringify(product.price)
				)

				// if product already exists, update the amount
				if (existingProductIndex !== -1) {
					newState.products = prevState.products.map((prod, index) => {
						if (index === existingProductIndex) {
							return { ...prod, amount: prod.amount! + 1 } // Increment the amount for the existing product
						}
						return prod // Keep the other products the same
					})
				} else {
					// Add the new product to the cart with an amount of 1
					newState.products = [...prevState.products, { ...product, amount: 1 }]
				}

				return newState
			},
			() => this.toggleCartOpenClose(true)
		)
	}

	removeFromCart(product: Omit<CartProduct, "amount">) {
		this.setState((prevState) => {
			const newState: CartContextState = {
				productQuantity: prevState.productQuantity - 1,
				productTotalValue:
					prevState.productTotalValue - (product.price?.amount || 0),
				products: [],
				isCartOpen: prevState.isCartOpen,
			}

			const existingProductIndex = prevState.products.findIndex(
				(prod) =>
					prod.id === product.id &&
					JSON.stringify(prod.attributes) ===
						JSON.stringify(product.attributes) &&
					JSON.stringify(prod.price) === JSON.stringify(product.price)
			)

			// didn' found the product
			if (existingProductIndex === -1) {
				return prevState
			}

			const updatedProducts = [...prevState.products]
			if (updatedProducts[existingProductIndex].amount === 1) {
				updatedProducts.splice(existingProductIndex, 1)
			} else {
				updatedProducts[existingProductIndex].amount! -= 1
			}
			newState.products = updatedProducts

			return newState
		})
	}

	clearCart() {
		this.setState({
			productQuantity: 0,
			products: [],
			productTotalValue: 0,
		})
	}

	toggleCartOpenClose(open: boolean) {
		this.setState((prevState) => ({
			...prevState,
			isCartOpen: open,
		}))
	}

	componentDidUpdate(): void {
		// Update local storage with cart data
		localStorage.setItem("cart", JSON.stringify(this.state))
	}

	render() {
		return (
			<CartContext.Provider
				value={{
					addToCart: (product) => this.addToCart(product),
					removeFromCart: (product) => this.removeFromCart(product),
					clearCart: () => this.clearCart(),
					cart: this.state,
					toggleCartOpenClose: (open) => this.toggleCartOpenClose(open),
				}}
			>
				{this.props.children}
			</CartContext.Provider>
		)
	}
}

export { CartContext, CartProvider }
