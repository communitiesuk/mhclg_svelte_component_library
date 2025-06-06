export function textStringConversion(text, caseType) {
  const words = text
    .toLowerCase() // Convert to lowercase
    .trim() // Trim surrounding whitespace
    .replace(/[^\w\s-]/g, "") // Remove special characters except hyphens and whitespace
    .replace(/[_-]/g, " ")
    .split(/\s+/); // Split text into words based on spaces

  switch (caseType) {
    case "pascal":
      return words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
    case "camel":
      return words
        .map((word, index) =>
          index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
        )
        .join("");
    case "snake":
      return words.join("_");
    case "kebab": // (or skewer-case)
      return words.join("-");
    case "upper-snake":
      return words.map((word) => word.toUpperCase()).join("_");
    case "title":
      return words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    case "title-first-word":
      return words
        .map((word, index) =>
          index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word,
        )
        .join(" ");

    default:
      throw new Error(
        'Invalid caseType provided. Choose from "pascal", "camel", "snake", "kebab", "upper-snake", "title", or "title-first-word".',
      );
  }
}

export function pascalToKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Insert hyphen between lowercase & uppercase
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2") // Handle consecutive uppercase letters
    .toLowerCase();
}

export function kebabToPascalCase(str) {
  return str
    .split("-") // Split by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
    .join(""); // Join without spaces
}

/**
 * Forces a line break before the third capital letter in a string
 * @param {string} text - The text to process
 * @returns {string} - The text with <br> inserted before the third capital letter
 */
export function forceWrapAtThirdCapital(text) {
  if (!text || typeof text !== "string") return text;

  let capitalCount = 0;
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    // Check if current character is uppercase
    if (char >= "A" && char <= "Z") {
      capitalCount++;

      // Insert forced line break before the third capital letter
      if (capitalCount === 3) {
        result += "<br>";
      }
    }

    result += char;
  }

  return result;
}
