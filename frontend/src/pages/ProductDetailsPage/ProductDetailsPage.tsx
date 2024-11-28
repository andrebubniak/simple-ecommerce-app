import { Component, createRef, ReactNode } from "react"
import { ProductDetailsPageSkeleton } from "./ProductDetailsPageSkeleton"
import { graphql } from "../../utils/graphql"
import { convertDecimal } from "../../utils/convertDecimal"
import NoImage from "../../assets/no-image.jpg"
import { ProductAttributes } from "./ProductAttributes"
import { CartContext } from "../../contexts/CartContext"
import { parseHTMLStringToReactNode } from "../../utils/parseHtmlStringToReactNode"

type ProductDetailsPageState = {
	currentCarouselImageIndex: number
	product?: GraphQL.ProductType | null
	loading: boolean
	errorMessage?: string | null
	productNotFound: boolean
	allAttributesSelected: boolean
}

export class ProductDetailsPage extends Component<
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	{},
	ProductDetailsPageState
> {
	productAttributesRef: React.RefObject<ProductAttributes>

	// gets the cart context for adding product to cart
	static contextType = CartContext
	declare context: React.ContextType<typeof CartContext>

	constructor(props = {}) {
		super(props)

		this.state = {
			currentCarouselImageIndex: 0,
			loading: true,
			product: null,
			errorMessage: null,
			productNotFound: false,
			allAttributesSelected: false,
		}

		this.productAttributesRef = createRef<ProductAttributes>()
	}

	goNextImage() {
		if (this.state.product && !this.state.product.images?.length) {
			return
		}
		this.setState((prevState) => {
			const nextIndex =
				(prevState.currentCarouselImageIndex + 1) %
				prevState.product!.images!.length
			return { currentCarouselImageIndex: nextIndex }
		})
	}

	goPreviousImage() {
		if (this.state.product && !this.state.product.images?.length) {
			return
		}
		this.setState((prevState) => {
			const nextIndex =
				(prevState.currentCarouselImageIndex -
					1 +
					prevState.product!.images!.length) %
				prevState.product!.images!.length
			return { currentCarouselImageIndex: nextIndex }
		})
	}

	componentDidMount(): void {
		const urlParams = new URLSearchParams(window.location.search)
		const productId = urlParams.get("id")

		if (!productId) {
			this.setState((prevState) => ({
				...prevState,
				loading: false,
				errorMessage: "Product ID must be informed",
			}))
			return
		}

		graphql(`
			query {
				products (productId: "${productId}") {
					id
					name
					in_stock
					description
					images
					attributes {
						id
						name
						type
						items {
							id
							value
							display_value
						}
					}
					prices {
						id
						amount
						currency_label
						currency_symbol
					}
				}
			}
		`)
			.then((res) => {
				// error returned from request
				if (res.errors?.length) {
					this.setState((prevState) => ({
						...prevState,
						loading: false,
						errorMessage: res.errors![0].message,
					}))
					return
				}

				res = res as GraphQL.QueryReturnType

				// product not found (invalid id)
				if (!res.data?.products.length) {
					this.setState((prevState) => ({
						...prevState,
						loading: false,
						productNotFound: true,
					}))
					return
				}

				const product = res.data!.products[0]
				if (!product.images!.length) {
					product.images!.splice(0, 0, NoImage)
				}

				this.setState((prevState) => ({
					...prevState,
					loading: false,
					product: res.data?.products[0],
				}))
			})
			.catch((err) => {
				console.error(err)
				this.setState((prevState) => ({
					...prevState,
					loading: false,
					errorMessage: "Unexpected Error",
				}))
			})
	}

	addProductToCart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		// prevents the redirect to product page
		e.preventDefault()
		if (!this.state.product) {
			return
		}

		// this.productAttributesRef.current?.state.attributeItems
		this.context?.addToCart({
			id: this.state.product.id!,
			name: this.state.product.name!,
			image: this.state.product.images![0] || undefined,
			price: this.state.product.prices![0],
			attributes: this.state.product.attributes!.map((attribute) => ({
				...attribute,
				selected:
					this.productAttributesRef.current?.state.attributeItems[
						attribute.id!
					] ?? undefined,
			})),
		})
	}

	handleAttributeChange() {
		// If it is called before the ref is populated, it means that there is no attributes
		if (!this.productAttributesRef.current) {
			this.setState((prevState) => ({
				...prevState,
				allAttributesSelected: true,
			}))
			return
		}

		const allAttributesSelected = !Object.values(
			this.productAttributesRef.current.state.attributeItems
		).some((value) => value === undefined)

		if (
			this.state.allAttributesSelected !== allAttributesSelected &&
			allAttributesSelected
		) {
			this.setState((prevState) => ({
				...prevState,
				allAttributesSelected: true,
			}))
		}
	}

	render(): ReactNode {
		const currentIndex = this.state.currentCarouselImageIndex

		// Is loading the product
		if (this.state.loading) {
			return <ProductDetailsPageSkeleton />
		}

		// Unexpected error
		if (this.state.errorMessage?.length) {
			return <h1>{this.state.errorMessage}</h1>
		}

		// product not found (invalid id)
		if (this.state.productNotFound) {
			return <h1>Product Not Found</h1>
		}

		const { images, name, description, attributes, in_stock, prices } =
			this.state.product!

		return (
			<section className="mt-20 flex flex-col lg:flex-row h-[480px] items-center">
				<div className="hidden lg:flex flex-col h-full gap-5 flex-grow-0 flex-shrink-0 basis-auto w-[10%]">
					{images!.map((img, index) => (
						<img
							key={index}
							className={`w-20 h-20 p-2 object-contain cursor-pointer ${
								index === currentIndex
									? "border border-[#0000009c] rounded-lg shadow-md scale-110"
									: ""
							}`}
							src={img}
							alt="image"
							onClick={() => {
								this.setState({
									currentCarouselImageIndex: index,
								})
							}}
						/>
					))}
				</div>

				{/* Gallery */}
				<div className="flex flex-row justify-center h-full flex-grow-0 flex-shrink-0 basis-auto w-full lg:w-[60%] lg:px-10 sm:mb-10 lg:mb-0">
					<div
						className="overflow-hidden relative w-full"
						data-testid="product-gallery"
					>
						<div
							className="flex flex-row absolute h-full w-full left-0 top-auto right-auto m-0 transition-transform duration-300 ease-in-out"
							style={{
								transform: `translateX(-${currentIndex * 100}%)`,
							}}
						>
							<div className="flex flex-row w-full no-wrap">
								{images!.map((image, index) => (
									<img
										key={index}
										src={image}
										alt="Product Image"
										className="w-full min-w-full h-full object-contain"
									/>
								))}
							</div>
						</div>
						{/* Left Button */}
						{images!.length > 1 && (
							<button
								className="flex justify-center items-center absolute h-8 w-8 left-4 bg-[#000000BA] top-1/2 -translate-y-1/2 hover:bg-[#0000007a]"
								onClick={() => this.goPreviousImage()}
							>
								<svg
									width="24"
									height="25"
									viewBox="0 0 24 25"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M14.9687 5.16618L7.53955 12.5875L14.9687 20.0088"
										stroke="white"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						)}
						{/* Left Button */}
						{images!.length > 1 && (
							<button
								className="flex justify-center items-center absolute h-8 w-8 right-4 bg-[#000000BA] top-1/2 -translate-y-1/2 hover:bg-[#0000007a]"
								onClick={() => this.goNextImage()}
							>
								<svg
									width="24"
									height="25"
									viewBox="0 0 24 25"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M9 5.09158L16.5 12.5836L9 20.0757"
										stroke="white"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						)}
					</div>
				</div>

				<div className="h-full flex flex-col flex-grow-0 flex-shrink-0 basis-auto w-full lg:w-[30%] gap-8">
					<h2 className="font-semibold text-3xl">{name}</h2>

					{attributes && (
						<ProductAttributes
							ref={this.productAttributesRef}
							attributes={attributes}
							onAttributeChange={() => this.handleAttributeChange()}
						></ProductAttributes>
					)}

					<div className="flex flex-col">
						<span className="font-bold text-lg">PRICE:</span>
						<strong className="font-bold text-2xl">
							{convertDecimal(prices![0])}
						</strong>
					</div>
					{in_stock && (
						<button
							data-testid="add-to-cart"
							className={`flex-shrink-0 text-white font-semibold text-base h-[52px] text-center w-full ${
								this.state.allAttributesSelected
									? "bg-[#5ECE7B] hover:bg-[#3f9456]"
									: "bg-[#39374879]"
							}`}
							disabled={!this.state.allAttributesSelected}
							onClick={(e) => this.addProductToCart(e)}
						>
							ADD TO CART
						</button>
					)}

					<div
						data-testid="product-description"
						className="product-description"
					>
						{parseHTMLStringToReactNode(description || "")}
					</div>
				</div>
			</section>
		)
	}
}
