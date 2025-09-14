/**
 * Capitalizes the first letter of every word of a string.
 * @param s string to capitalize
 * @returns capitalized string
 */
export default function capitalize(s: string): string {
  return s
    .split(' ') // Split the string into an array of words
    .map(word => {
      if (word.length === 0) { // Handle empty words that might result from multiple spaces
        return '';
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalize first letter and lowercase the rest
    })
    .join(' '); // Join the words back into a string
}