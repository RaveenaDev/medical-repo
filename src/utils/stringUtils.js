/**
 * Capitalize first letter of string
 */
export const capitalize = (str = "") => {
  if (!str || typeof str !== "string") return "";

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalize every word
 * "yash bhatt" → "Yash Bhatt"
 */
export const capitalizeWords = (str = "") => {
  if (!str || typeof str !== "string") return "";

  return str
    .split(" ")
    .filter(Boolean)
    .map((word) => capitalize(word))
    .join(" ");
};
