/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			boxShadow: {
				productCard: "0px 4px 35px 0px #A8ACB030",
			},
		},
	},
	plugins: [
		function ({ addComponents }) {
			// Style for the product descriptions, as they also use html elements
			addComponents({
				".product-description > p": {
					textIndent: "2rem",
					fontSize: "16px",
				},
				".product-description > h1, h3": {
					fontSize: "20px",
					fontWeight: 600,
				},
				".product-description ul": {
					listStyle: "disc",
				},
				".product-description ul > li:not(:last-child)": {
					marginBottom: ".5rem",
				},

				// Tooltip style
				".tooltip": {
					position: "relative",
				},
				".tooltip::after": {
					content: "attr(data-tooltip)",
					visibility: "hidden",
					position: "absolute",
					backgroundColor: "black",
					color: "white",
					textAlign: "center",
					padding: "0.5rem",
					borderWidth: "1px",
					borderRadius: "0.375rem",
					bottom: "125%",
					left: "50%",
					transform: "translateX(-50%)",
					opacity: 0,
					transition: "ease-in-out",
					transitionDuration: "300ms",
					transitionProperty: "opacity",
					zIndex: 10,
				},
				".tooltip:hover::after": {
					visibility: "visible",
					opacity: 1,
				},
			})
		},
	],
}
