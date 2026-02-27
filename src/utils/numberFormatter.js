/**
 * Safely convert to number
 */
const safeNum = (value) => {
  const n = Number(value);
  return isNaN(n) ? 0 : n;
};

/**
 * Convert number to words in Indian Rupee format
 * Example: 1250000 → "Twelve Lakh Fifty Thousand rupees only"
 *
 * @param {number|string} value
 * @returns {string}
 */
export const amountInWordsINR = (value) => {
  let num = Math.round(safeNum(value));

  if (num === 0) return "Zero rupees only";
  if (num < 0) return "Minus " + amountInWordsINR(Math.abs(num));

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const twoDigit = (n) =>
    n < 20
      ? ones[n]
      : tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");

  const threeDigit = (n) => {
    const h = Math.floor(n / 100);
    const r = n % 100;

    return (
      (h ? ones[h] + " Hundred" + (r ? " " : "") : "") + (r ? twoDigit(r) : "")
    );
  };

  let output = "";

  const crore = Math.floor(num / 10000000);
  num %= 10000000;

  const lakh = Math.floor(num / 100000);
  num %= 100000;

  const thousand = Math.floor(num / 1000);
  num %= 1000;

  const hundred = num;

  if (crore) output += threeDigit(crore) + " Crore ";
  if (lakh) output += threeDigit(lakh) + " Lakh ";
  if (thousand) output += threeDigit(thousand) + " Thousand ";
  if (hundred) output += threeDigit(hundred);

  return (output.trim() + " rupees only").replace(/\s+/g, " ");
};

/**
 * Format number with Indian grouping
 * Example: 123456789 → 12,34,56,789
 *
 * @param {number|string} value
 * @returns {string}
 */
export const formatWithCommasIndian = (value) => {
  const num = safeNum(value);

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(num);
};

/**
 * Format currency in INR with ₹ and Indian grouping
 * Example: 123456 → ₹1,23,456.00
 *
 * @param {number|string} value
 * @param {boolean} showDecimals (default true)
 * @returns {string}
 */
export const formatCurrencyINR = (value, showDecimals = true) => {
  const num = safeNum(value);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(num);
};

/**
 * Format number in compact Indian style
 * 1200 → ₹1.2K
 * 120000 → ₹1.2L
 * 15000000 → ₹1.5Cr
 */
export const formatCompactINR = (value) => {
  const num = safeNum(value);
  const abs = Math.abs(num);

  let formatted = "";

  if (abs >= 10000000) {
    formatted = (abs / 10000000).toFixed(1) + "Cr";
  } else if (abs >= 100000) {
    formatted = (abs / 100000).toFixed(1) + "L";
  } else if (abs >= 1000) {
    formatted = (abs / 1000).toFixed(1) + "K";
  } else {
    formatted = abs.toString();
  }

  formatted = formatted.replace(".0", "");

  return `${num < 0 ? "-" : ""}₹${formatted}`;
};
// EXAMPLE USAGE:

// formatWithCommasIndian(123456789);
// // "12,34,56,789"

// formatCurrencyINR(250000);
// // "₹2,50,000.00"

// formatCurrencyINR(250000, false);
// // "₹2,50,000"

// formatCompactINR(120000);
// // ₹1.2L

// formatCompactINR(25000000);
// // ₹2.5Cr

// formatCompactINR(800);
// ₹800
