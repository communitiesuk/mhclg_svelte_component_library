export function fromSnakeCase(input) {
  return input
    .split('_') // Split the string
    .map(
      (word, index) =>
        index === 0
          ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize first word
          : word.toLowerCase() // Convert other words to lowercase
    )
    .join(' '); // Join with spaces
}
