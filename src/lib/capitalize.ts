/**
 * Capitalizes the first letter of a string.
 * @param s string to capitalize
 * @returns capitalized string
 */
export default function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}