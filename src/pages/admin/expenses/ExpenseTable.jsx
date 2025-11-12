import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpenseTable = ({
  expenses,
  totalExpenses,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onMenuOpen,
}) => {
  const truncate = (text, len) =>
    text.length > len ? `${text.slice(0, len)}...` : text;

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: "72vh",
        overflowY: "auto",
        mt: 2,
        position: "relative",
      }}
    >
      <Table stickyHeader>
        <TableHead
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 2,
          }}
        >
          <TableRow>
            {[
              "Expense Type",
              "Amount",
              "Paid To",
              "Details",
              "Date",
              "Action",
            ].map((h) => (
              <TableCell key={h} align="center" sx={{ fontWeight: "bold" }}>
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {expenses.length ? (
            expenses.map((exp) => (
              <TableRow key={exp._id} sx={{ backgroundColor: "#F1F5FF" }}>
                <TableCell>{exp.expenseType}</TableCell>
                <TableCell align="center">
                  {exp.amount
                    ? Number(exp.amount).toLocaleString("en-IN")
                    : "—"}
                </TableCell>

                <TableCell align="center">{truncate(exp.paidTo, 14)}</TableCell>
                <TableCell align="center">{exp.details}</TableCell>
                <TableCell align="center">
                  {new Date(exp.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={(e) => onMenuOpen(e, exp)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={6}>
                No data found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Sticky Pagination */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "white",
          borderTop: "1px solid #e0e0e0",
          zIndex: 3,
        }}
      >
        <TablePagination
          component="div"
          count={totalExpenses || 0}
          page={page}
          onPageChange={(e, newPage) => onPageChange(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) =>
            onRowsPerPageChange(parseInt(e.target.value))
          }
          rowsPerPageOptions={[5, 10, 20, 50]}
        />
      </Box>
    </TableContainer>
  );
};

export default ExpenseTable;
