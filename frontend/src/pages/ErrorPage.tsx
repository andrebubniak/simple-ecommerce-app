import { Component, ReactNode } from "react"

/**
 * Error page to display when the app can't connect to the backend
 */
export class ErrorPage extends Component<{ errorMessage: string }> {
	constructor(props: { errorMessage: string }) {
		super(props)
	}

	render(): ReactNode {
		return (
			<div className="p-4">
				<h1 className="text-3xl">{this.props.errorMessage}</h1>
				<br />
				<h2 className="text-2xl">Try again later...</h2>
			</div>
		)
	}
}
