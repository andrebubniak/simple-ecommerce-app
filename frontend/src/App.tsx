import { Component } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ProductPage } from "./pages/ProductPage/ProductPage"
import Layout from "./Layout"
import NotFoundPage from "./pages/NotFoundPage"
import { CategoryConsumer, CategoryProvider } from "./contexts/CategoryContext"
import { ErrorPage } from "./pages/ErrorPage"
import { ProductPageSkeleton } from "./pages/ProductPage/ProductPageSkeleton"
import { ProductDetailsPage } from "./pages/ProductDetailsPage/ProductDetailsPage"
import { CartProvider } from "./contexts/CartContext"

class App extends Component {
	render() {
		return (
			<CartProvider>
				<CategoryProvider>
					<BrowserRouter>
						<CategoryConsumer>
							{({ categories, errorMessage }) => {
								if (categories && categories.length) {
									// picks the first category name to redirect on home page
									const firstCategoryPath = categories[0].name
									return (
										<Routes>
											<Route
												path="/"
												element={<Navigate to={`/${firstCategoryPath}`} />}
											/>
											{categories.map((category, index) => (
												<Route
													key={index}
													path={category.name}
													index={index == 0}
													element={
														<Layout>
															<ProductPage category={category} />
														</Layout>
													}
												/>
											))}
											<Route
												path="product"
												element={
													<Layout>
														<ProductDetailsPage />
													</Layout>
												}
											/>
											<Route path="*" element={<NotFoundPage />} />
										</Routes>
									)
								}

								if (errorMessage) {
									return (
										<Routes>
											<Route
												path="/"
												element={<ErrorPage errorMessage={errorMessage} />}
											/>
											<Route path="*" element={<NotFoundPage />} />
										</Routes>
									)
								}

								return (
									<Routes>
										<Route
											path="*"
											element={
												<Layout>
													<ProductPageSkeleton />
												</Layout>
											}
										/>
									</Routes>
								)
							}}
						</CategoryConsumer>
					</BrowserRouter>
				</CategoryProvider>
			</CartProvider>
		)
	}
}

export default App
