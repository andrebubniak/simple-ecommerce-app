import { Component } from "react"

export class ProductDetailsPageSkeleton extends Component {
	render() {
		return (
			<section className="mt-20 flex flex-col lg:flex-row h-[480px] items-center">
				<div className="hidden lg:flex flex-col h-full gap-5 flex-grow-0 flex-shrink-0 basis-auto w-[10%]">
					<div className="bg-gray-300 animate-pulse w-20 h-20 rounded-md"></div>
					<div className="bg-gray-300 animate-pulse w-20 h-20 rounded-md"></div>
					<div className="bg-gray-300 animate-pulse w-20 h-20 rounded-md"></div>
				</div>

				<div className="flex flex-row justify-center h-full flex-grow-0 flex-shrink-0 basis-auto w-full lg:w-[60%] lg:px-10 sm:mb-10 lg:mb-0">
					<div className="overflow-hidden relative w-full">
						<div className="flex flex-row absolute h-full w-full left-0 top-auto right-auto m-0">
							<div className="flex flex-row w-full no-wrap bg-gray-300 animate-pulse"></div>
						</div>
					</div>
				</div>

				<div className="h-full flex flex-col flex-grow-0 flex-shrink-0 basis-auto w-full lg:w-[30%] bg-gray-300 animate-pulse"></div>
			</section>
		)
	}
}
