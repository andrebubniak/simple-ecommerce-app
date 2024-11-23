import { Component, ReactNode } from "react"
import { ProductCardSkeleton } from "../../components/ProductCard/ProductCardSkeleton"

export class ProductPageSkeleton extends Component {
	render(): ReactNode {
		return (
			<>
				<h1 className="mb-5 mt-5 lg:mb-20 lg:mt-20 capitalize font-normal text-5xl bg-gray-300 animate-pulse">
					&nbsp;
				</h1>
				<section className="w-full h-full flex flex-col lg:flex-row flex-wrap gap-10 mb-10 justify-center items-center">
					{Array.from({ length: 3 }).map((_, index) => (
						<ProductCardSkeleton key={index} />
					))}
				</section>
			</>
		)
	}
}
