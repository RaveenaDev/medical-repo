export const formatToDDMMYYYY = (input) => {
  if (!input) return "—";

  let date;

  // Already a Date object
  if (input instanceof Date) {
    date = input;
  }

  // String handling
  if (!date && typeof input === "string") {
    const isoTry = new Date(input);

    if (!isNaN(isoTry.getTime())) {
      date = isoTry;
    } else {
      // DD-MM-YYYY or DD/MM/YYYY
      const dmY = input.match(/^(\d{2})[-/](\d{2})[-/](\d{4})$/);
      if (dmY) {
        const [, d, m, y] = dmY;
        date = new Date(y, m - 1, d);
      }

      // YYYY-MM-DD or YYYY/MM/DD
      const yMd = input.match(/^(\d{4})[-/](\d{2})[-/](\d{2})$/);
      if (!date && yMd) {
        const [, y, m, d] = yMd;
        date = new Date(y, m - 1, d);
      }
    }
  }

  if (!date || isNaN(date.getTime())) return "—";

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};
