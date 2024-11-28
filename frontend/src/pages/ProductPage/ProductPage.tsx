import { Component, ReactNode } from "react";
import { graphql } from "../../utils/graphql";
import { ProductPageSkeleton } from "./ProductPageSkeleton";
import { ProductCard } from "../../components/ProductCard/ProductCard";

type ProductPageProps = {
    category?: GraphQL.CategoryType;
};

type ProductPageState = {
    products?: GraphQL.ProductType[] | null;
    loading: boolean;
    errorMessage?: string | null;
};

export class ProductPage extends Component<ProductPageProps, ProductPageState> {
    constructor(props: ProductPageProps) {
        super(props);

        this.state = {
            loading: true,
            errorMessage: null,
            products: null,
        };
    }

    getProducts() {
        graphql(`
			query {
				products ${
                    this.props.category
                        ? `(categoryId: ${this.props.category.id})`
                        : ""
                } {
					id
					name
					in_stock
					images
					prices {
						id
						amount
						currency_label
						currency_symbol
					}
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
				}
			}
		`)
            .then((res) => {
                if (res.errors?.length) {
                    this.setState({
                        products: null,
                        loading: false,
                        errorMessage: res.errors[0].message,
                    });
                    return;
                }

                res = res as GraphQL.QueryReturnType;

                this.setState({
                    products: res.data?.products,
                    loading: false,
                    errorMessage: null,
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    products: null,
                    loading: false,
                    errorMessage: "Unexpected Error. Try again later...",
                });
            });
    }

    /**
     * Loads the products
     */
    componentDidMount(): void {
        this.getProducts();
    }

    componentDidUpdate(
        prevProps: Readonly<ProductPageProps>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _prevState: Readonly<ProductPageState>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _snapshot?: unknown
    ): void {
        // if category changes, gets the data again
        if (!prevProps.category && !this.props.category) {
            return;
        }

        if (
            !prevProps.category ||
            prevProps.category.id !== this.props.category?.id
        ) {
            this.getProducts();
        }
    }

    render(): ReactNode {
        if (this.state.loading) {
            return <ProductPageSkeleton />;
        }

        if (this.state.errorMessage) {
            return <h1>{this.state.errorMessage}</h1>;
        }

        return (
            <>
                <h1 className="mb-5 mt-5 lg:mb-20 lg:mt-20 capitalize font-normal text-5xl">
                    {this.props.category?.name ?? "All"}
                </h1>
                <section className="w-full h-full flex flex-col lg:flex-row flex-wrap gap-10 mb-10 justify-center items-center">
                    {this.state.products?.map((product, index) => (
                        <ProductCard
                            key={index}
                            productId={product.id!}
                            inStock={product.in_stock!}
                            productName={product.name!}
                            productPrice={product.prices![0]}
                            productImageUrl={product.images![0]}
                            attributes={product.attributes!}
                        />
                    ))}
                </section>
            </>
        );
    }
}
