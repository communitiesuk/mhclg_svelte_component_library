export function toPascalCase(text) {
	return text
		.split('-') // Split the string by hyphens
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
		.join(''); // Join the words back together
}
