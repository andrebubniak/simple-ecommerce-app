import { Component, ReactNode } from "react"
import { CategoryConsumer } from "../../contexts/CategoryContext"
import { Link } from "react-router-dom"
import Logo from "../../assets/logo.svg"
import { Cart } from "../Cart/Cart"

import tailwindConfig from "tailwindcss/defaultConfig"
import { KeyValuePair } from "tailwindcss/types/config"

type HeaderState = {
	/**
	 * Is mobile hamburger menu open?
	 */
	isMenuOpen: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
class Header extends Component<{}, HeaderState> {
	mediaQueryListener: () => void

	constructor(props = {}) {
		super(props)

		this.state = {
			isMenuOpen: false,
		}

		this.mediaQueryListener = () => {
			this.toggleMenu(false)
		}
	}

	// Closes the mobile menu when window get larger
	componentDidMount(): void {
		const screenSizes = tailwindConfig.theme?.screens as
			| KeyValuePair<string, string>
			| undefined

		const largeScreenSize =
			screenSizes && screenSizes["lg"] ? screenSizes["lg"] : "1024px"

		window
			.matchMedia(`(min-width: ${largeScreenSize})`)
			.addEventListener("change", this.mediaQueryListener)
	}

	// Removes the close menu event
	componentWillUnmount(): void {
		const screenSizes = tailwindConfig.theme?.screens as
			| KeyValuePair<string, string>
			| undefined

		const largeScreenSize =
			screenSizes && screenSizes["lg"] ? screenSizes["lg"] : "1024px"

		window
			.matchMedia(`(min-width: ${largeScreenSize})`)
			.removeEventListener("change", this.mediaQueryListener)
	}

	/**
	 * Toggles the menu open state
	 * @param state If state is given, then forces the menu state
	 */
	toggleMenu(state?: boolean) {
		this.setState((prevState) => {
			return { isMenuOpen: state ?? !prevState.isMenuOpen }
		})
	}

	render(): ReactNode {
		// tailwind
		const headerLinkDefaultClassName = `uppercase hover:font-semibold hover:text-[#5ECE7B] no-underline relative
											after:transition-all after:duration-200 after:ease-linear after:bg-[#5ECE7B] after:absolute 
											after:left-0 after:-bottom-full after:h-1 after:w-0 after:rounded-full focus:after:w-full 
											focus:after:ml-0 focus:after:block hover:after:w-full hover:after:ml-0 hover:after:block after:pointer-events-none`

		return (
			<CategoryConsumer>
				{({ categories, loading, errorMessage }) => (
					<header className="bg-white h-20 sticky top-0 z-50">
						{/* Unexpected Error */}
						{errorMessage?.length && <h1>{errorMessage}</h1>}
						<nav className="flex flex-row justify-between items-center h-full">
							{/* Hamburger menu button */}
							<button
								className="lg:hidden p-2"
								onClick={() => this.toggleMenu()}
							>
								<span className="block w-6 h-0.5 bg-[#1D1F22] mb-1"></span>
								<span className="block w-6 h-0.5 bg-[#1D1F22] mb-1"></span>
								<span className="block w-6 h-0.5 bg-[#1D1F22]"></span>
							</button>
							{(categories?.length && (
								<ul
									className={`flex flex-col lg:flex-row items-center lg:justify-start space-y-4 lg:space-y-0 fixed 
									lg:static top-20 left-0 border-t lg:border-none h-screen lg:h-full bg-white lg:bg-transparent transition-all duration-300 ease-in-out overflow-hidden
									${this.state.isMenuOpen ? "w-screen lg:w-auto" : "w-0 lg:w-auto"}`}
								>
									<li className="px-4">
										<Link
											className={`${headerLinkDefaultClassName} ${
												window.location.href.endsWith("/all")
													? "text-[#5ECE7B] font-semibold after:w-full after:block after:ml-0"
													: "text-base text-[#1D1F22] after:ml-[50%]"
											}`}
											to="/all"
											onClick={() => this.toggleMenu(false)}
										>
											All
										</Link>
									</li>

									{categories.map((category, index) => (
										<li key={index} className="px-4">
											<Link
												data-testid={`${
													window.location.href.endsWith(`/${category.name}`)
														? "active-category-link"
														: "category-link"
												}`}
												className={`${headerLinkDefaultClassName} ${
													window.location.href.endsWith(`/${category.name}`)
														? "text-[#5ECE7B] font-semibold after:w-full after:block after:ml-0"
														: "text-base text-[#1D1F22] after:ml-[50%]"
												}`}
												to={`/${category.name}`}
												onClick={() => this.toggleMenu(false)}
											>
												{category.name}
											</Link>
										</li>
									))}
								</ul>
							)) ||
								// Loading header (categories bar)
								(loading && (
									<ul
										className={`flex flex-col lg:flex-row items-center lg:justify-start space-y-4 lg:space-y-0 absolute gap-2
								lg:static top-20 left-0 border-t lg:border-none h-screen lg:h-full bg-white lg:bg-transparent transition-all duration-300 ease-in-out overflow-hidden
								${this.state.isMenuOpen ? "w-screen lg:w-auto" : "w-0 lg:w-1/3"}`}
									>
										{Array.from({ length: 2 }).map((_, index) => (
											<li
												key={index}
												className="bg-gray-300 animate-pulse w-1/2 h-4"
											></li>
										))}
									</ul>
								))}

							<img src={Logo} alt="Logo" />
							<Cart />
						</nav>
					</header>
				)}
			</CategoryConsumer>
		)
	}
}

export default Header
