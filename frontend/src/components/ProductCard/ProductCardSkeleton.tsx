import { Component } from "react"

export class ProductCardSkeleton extends Component {
	render() {
		return (
			<div className="p-4 flex flex-col w-full sm:w-96 h-[440px]">
				<div className="h-4/5 relative">
					{/* Skeleton image */}
					<div className="h-full w-full bg-gray-300 animate-pulse" />

					{/* Skeleton Text or Out of Stock */}
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="bg-gray-300 h-10 w-32 animate-pulse rounded-md" />
					</div>

					{/* Skeleton Button */}
					<div className="absolute bottom-0 translate-y-1/2 right-[10%] h-[52px] w-[52px] rounded-full bg-gray-300 animate-pulse" />
				</div>

				{/* Skeleton Texts */}
				<div className="flex flex-col justify-end w-full h-1/5 gap-0">
					<div className="bg-gray-300 w-full h-5 animate-pulse rounded-md mb-2" />
					<div className="bg-gray-300 w-32 h-6 animate-pulse rounded-md" />
				</div>
			</div>
		)
	}
}
