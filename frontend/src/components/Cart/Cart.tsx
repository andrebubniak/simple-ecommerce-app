import { Component, createRef, ReactNode } from "react"
import { CartContext, CartProduct } from "../../contexts/CartContext"
import NoImage from "../../assets/no-image.jpg"
import { convertDecimal } from "../../utils/convertDecimal"
import { ProductAttributes } from "../../pages/ProductDetailsPage/ProductAttributes"
import { graphql } from "../../utils/graphql"

type CartState = {
	isPlacingOrder: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export class Cart extends Component<{}, CartState> {
	private cartRef: React.RefObject<HTMLDivElement>

	constructor(props = {}) {
		super(props)

		this.state = {
			isPlacingOrder: false,
		}

		this.cartRef = createRef<HTMLDivElement>()
	}

	/**
	 * Place an order
	 * @param products Products to order
	 * @param clearCart function to clear the cart after the order
	 */
	placeOrder(products: CartProduct[], clearCart: () => void) {
		this.setState({
			isPlacingOrder: true,
		})

		graphql(
			`
				mutation CreateOrder($products: [ProductInput!]!) {
					createOrder(products: $products)
				}
			`,
			{
				products: products.map((p) => ({
					productId: p.id,
					priceId: p.price!.id,
					amount: p.amount,
					attributeItemsIds: p.attributes
						? p.attributes.map((attr) => attr.selected!)
						: [],
				})),
			}
		)
			.then((res) => {
				// error returned from request
				if (res.errors?.length) {
					console.error(res.errors![0].message)
					return
				}
				clearCart()
			})
			.catch((err) => {
				console.error(err)
			})
			.finally(() => {
				this.setState({
					isPlacingOrder: false,
				})
			})
	}

	render(): ReactNode {
		return (
			<CartContext.Consumer>
				{(cartData) => {
					if (!cartData?.cart) {
						return <></>
					}

					const { products, productQuantity, productTotalValue, isCartOpen } =
						cartData.cart

					return (
						<div>
							{/* Button to open/close cart */}
							<button
								data-testid="cart-btn"
								className="relative"
								onClick={() => {
									// togle cart open on button press
									cartData.toggleCartOpenClose(!isCartOpen)
								}}
							>
								<svg
									width="20"
									height="19"
									viewBox="0 0 20 19"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M19.5613 3.87359C19.1822 3.41031 18.5924 3.12873 17.9821 3.12873H5.15889L4.75914 1.63901C4.52718 0.773016 3.72769 0.168945 2.80069 0.168945H0.653099C0.295301 0.168945 0 0.450523 0 0.793474C0 1.13562 0.294459 1.418 0.653099 1.418H2.80069C3.11654 1.418 3.39045 1.61936 3.47434 1.92139L6.04306 11.7077C6.27502 12.5737 7.07451 13.1778 8.00152 13.1778H16.4028C17.3289 13.1778 18.1507 12.5737 18.3612 11.7077L19.9405 5.50575C20.0877 4.941 19.9619 4.33693 19.5613 3.87365L19.5613 3.87359ZM18.6566 5.22252L17.0773 11.4245C16.9934 11.7265 16.7195 11.9279 16.4036 11.9279H8.00154C7.68569 11.9279 7.41178 11.7265 7.32789 11.4245L5.49611 4.39756H17.983C18.1936 4.39756 18.4042 4.49824 18.5308 4.65948C18.6567 4.81994 18.7192 5.0213 18.6567 5.22266L18.6566 5.22252Z"
										fill="#43464E"
									/>
									<path
										d="M8.44437 13.9814C7.2443 13.9814 6.25488 14.9276 6.25488 16.0751C6.25488 17.2226 7.24439 18.1688 8.44437 18.1688C9.64445 18.1696 10.6339 17.2234 10.6339 16.0757C10.6339 14.928 9.64436 13.9812 8.44437 13.9812V13.9814ZM8.44437 16.9011C7.9599 16.9011 7.58071 16.5385 7.58071 16.0752C7.58071 15.6119 7.9599 15.2493 8.44437 15.2493C8.92885 15.2493 9.30804 15.6119 9.30804 16.0752C9.30722 16.5188 8.90748 16.9011 8.44437 16.9011Z"
										fill="#43464E"
									/>
									<path
										d="M15.6875 13.9814C14.4875 13.9814 13.498 14.9277 13.498 16.0752C13.498 17.2226 14.4876 18.1689 15.6875 18.1689C16.8875 18.1689 17.877 17.2226 17.877 16.0752C17.8565 14.9284 16.8875 13.9814 15.6875 13.9814ZM15.6875 16.9011C15.2031 16.9011 14.8239 16.5385 14.8239 16.0752C14.8239 15.612 15.2031 15.2493 15.6875 15.2493C16.172 15.2493 16.5512 15.612 16.5512 16.0752C16.5512 16.5188 16.1506 16.9011 15.6875 16.9011Z"
										fill="#43464E"
									/>
								</svg>
								{productQuantity > 0 && (
									<span className="absolute h-6 w-6 rounded-full bg-[#1d1f22] text-white flex justify-center items-center -top-3/4 -right-3/4">
										<span className="font-semibold">{productQuantity}</span>
									</span>
								)}
							</button>
							{/* Cart overlay */}
							{isCartOpen && (
								<div
									data-testid="cart-overlay"
									className="fixed top-20 left-0 w-full h-full bg-[#39374838] z-20"
									onClick={(event) => {
										// closes the cart overlay when clicking outside the cart itself
										if (
											this.cartRef.current &&
											!this.cartRef.current.contains(event.target as Node)
										) {
											cartData.toggleCartOpenClose(false)
										}
									}}
								>
									<div
										ref={this.cartRef}
										className="z-30 absolute max-h-[640px] w-80 right-5 lg:right-[72px] bg-white flex flex-col justify-between py-8 px-4 gap-8"
									>
										<span data-testid="cart-item-amount">
											<strong>My Bag</strong>
											{(productQuantity > 0 && (
												<span>
													, {productQuantity}{" "}
													{productQuantity > 1 ? "items" : "item"}
												</span>
											)) || <span>, no items</span>}
										</span>
										{/* Products */}
										{productQuantity > 0 && (
											<div className="flex flex-col gap-10 overflow-y-scroll">
												{products.map((product, index) => (
													<div key={index} className="flex flex-row">
														{/* Basic product info */}
														<div className="flex flex-col pr-1 w-6/12">
															<h3 className="text-lg font-light">
																{product.name}
															</h3>
															<strong className="text-base font-normal">
																{convertDecimal(product.price!)}
															</strong>
															<ProductAttributes
																attributes={product.attributes!}
																cart
																canChangeAttributes={false}
															/>
														</div>
														{/* plus and minus buttons */}
														<div className="flex flex-col w-1/12 justify-between items-center">
															<button
																data-testid="cart-item-amount-increase"
																data-tooltip="Increase quantity"
																className="tooltip border border-[#1D1F22] h-6 w-6 flex justify-center items-center hover:bg-[#c6c6c7]"
																onClick={() => {
																	cartData.addToCart(product)
																}}
															>
																<svg
																	width="10"
																	height="10"
																	viewBox="0 0 10 10"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M5 1V9"
																		stroke="#1D1F22"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																	<path
																		d="M1 5H9"
																		stroke="#1D1F22"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																</svg>
															</button>
															<strong className="text-base">
																{product.amount}
															</strong>
															<button
																data-testid="cart-item-amount-decrease"
																data-tooltip="Decrease quantity"
																className="tooltip border border-[#1D1F22] h-6 w-6 flex justify-center items-center hover:bg-[#c6c6c7]"
																onClick={() => {
																	cartData.removeFromCart(product)
																}}
															>
																<svg
																	width="10"
																	height="2"
																	viewBox="0 0 10 2"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M1 1H9"
																		stroke="#1D1F22"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																</svg>
															</button>
														</div>
														{/* Product image */}
														<div className="pl-2 w-5/12">
															<img
																className="object-contain w-full h-full"
																src={product.image || NoImage}
																alt="Product Image"
															/>
														</div>
													</div>
												))}
											</div>
										)}
										{/* Total value of order */}
										{productTotalValue > 0 && (
											<div
												className="flex flex-row justify-between w-full"
												data-testid="cart-total"
											>
												<span className="text-base font-medium">Total</span>
												<strong className="text-base font-bold">
													{convertDecimal({
														amount: productTotalValue,
													})}
												</strong>
											</div>
										)}
										{/* Place order button */}
										{productQuantity > 0 && (
											<button
												className="bg-[#5ECE7B] flex-shrink-0 text-white font-semibold text-sm h-11 text-center w-full hover:bg-[#3f9456]"
												disabled={this.state.isPlacingOrder}
												onClick={() =>
													this.placeOrder(products, cartData.clearCart)
												}
											>
												{this.state.isPlacingOrder
													? "PLACING ORDER..."
													: "PLACE ORDER"}
											</button>
										)}
									</div>
								</div>
							)}
						</div>
					)
				}}
			</CartContext.Consumer>
		)
	}
}
