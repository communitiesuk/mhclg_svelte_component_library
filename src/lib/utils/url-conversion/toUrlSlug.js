export function toUrlSlug(text) {
	return text
		.toLowerCase() // Convert to lowercase
		.trim() // Trim any surrounding whitespace
		.replace(/[^\w\s-]/g, '') // Remove special characters except hyphens and whitespace
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-'); // Replace multiple hyphens with a single one
}
