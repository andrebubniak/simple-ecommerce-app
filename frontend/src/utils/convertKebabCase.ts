export function convertKebabCase(
	input: string,
	toLowerCase: boolean = true
): string {
	if (toLowerCase) {
		return input
			.trim() // Remove leading/trailing spaces
			.replace(/[\s_]+/g, "-") // Replace spaces and underscores with hyphens
			.toLowerCase()
	}

	return input
		.trim() // Remove leading/trailing spaces
		.replace(/[\s_]+/g, "-") // Replace spaces and underscores with hyphens
}
