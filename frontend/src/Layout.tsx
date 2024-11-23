// src/components/Layout.js
import { Component, ReactNode } from "react"
import Header from "./components/Header/Header"

type LayoutProps = {
	children: ReactNode
}

type LayoutState = {
	data?: GraphQL.QueryReturnType | null
	loading: boolean
	errorMessage?: string | null
}

/**
 * Layout of the website
 */
class Layout extends Component<LayoutProps, LayoutState> {
	constructor(props: LayoutProps = { children: null }) {
		super(props)
	}

	render() {
		return (
			<>
				<Header />
				<main>{this.props.children}</main>
			</>
		)
	}
}

export default Layout
