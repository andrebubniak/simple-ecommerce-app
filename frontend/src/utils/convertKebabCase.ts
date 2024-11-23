export function convertKebabCase(input: string): string {
	return input
		.trim() // Remove leading/trailing spaces
		.replace(/[\s_]+/g, "-") // Replace spaces and underscores with hyphens
		.toLowerCase()
}
