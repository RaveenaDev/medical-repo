import { Box, Typography, useMediaQuery } from "@mui/material";

const ExpensesHeader = () => {
  const isCompact = useMediaQuery("(min-width:900px) and (max-width:1366px)");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
        flexWrap: "wrap",
        mb: 1.5,
        "& h2": {
          m: 0,
          color: "black",
          fontWeight: 500,
          fontSize: isCompact ? "1.1rem" : "1.25rem",
        },
      }}
    >
      <h2>Expenses</h2>
      <ExpenseForm compact={isCompact} />
    </Box>
  );
};

export default ExpensesHeader;
