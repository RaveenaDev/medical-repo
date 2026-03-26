import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  getExpenses,
  deleteExpense,
  updateExpense,
} from "../../../components/State/Admin/Action.js";
import CommonPanel from "../Components/CommonPanel.jsx";
import { toast } from "react-toastify";
import ExpenseForm from "./ExpenseForm.jsx";
import ExpenseTable from "./ExpenseTable.jsx";
import EditExpenseDialog from "./EditExpenseDialog.jsx";
import dayjs from "dayjs";

const Expenses = ({ setIsSignUpOrLogin }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedExpense, setEditedExpense] = useState({
    expenseId: "",
    expenseType: "",
    amount: "",
    paidTo: "",
    details: "",
    date: dayjs().format("YYYY-MM-DD"),
  });

  const expenses = useSelector((store) => store.admin.expenses);
  const totalExpenses = useSelector((store) => store.admin.totalExpenses);
  const loader = useSelector((store) => store.admin.isLoading);

  useEffect(() => {
    setIsSignUpOrLogin(false);
  }, []);

  useEffect(() => {
    dispatch(getExpenses(page, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  const handleMenuOpen = (event, expense) => {
    setAnchorEl(event.currentTarget);
    setSelectedExpense(expense);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditedExpense({
      expenseId: selectedExpense._id,
      expenseType: selectedExpense.expenseType,
      amount: selectedExpense.amount,
      paidTo: selectedExpense.paidTo,
      details: selectedExpense.details,
      date: selectedExpense.date,
    });
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    dispatch(deleteExpense(selectedExpense._id));
    toast.info("Expense deleted");
    handleMenuClose();
  };

  const handleSaveEditedExpense = (updatedData) => {
    dispatch(updateExpense(updatedData.expenseId, updatedData));
    setEditDialogOpen(false);
  };

  return (
    <div style={{ height: "99dvh", overflow: "hidden", background: "#F1F1F1" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "76%",
          padding: "10px",
          background: "#F1F1F1",
          zIndex: 100,
        }}
      >
        <CommonPanel />
      </div>

      <div style={{ marginTop: "20vh" }}>
        {loader ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress sx={{ color: "#00a378" }} size={58} />
          </Box>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 style={{ color: "black", fontWeight: 500 }}>Expenses</h2>
              <ExpenseForm />
            </div>

            <ExpenseTable
              expenses={expenses}
              totalExpenses={totalExpenses}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={setPage}
              onRowsPerPageChange={setRowsPerPage}
              onMenuOpen={handleMenuOpen}
            />

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleEdit}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText sx={{ color: "error.main" }}>Delete</ListItemText>
              </MenuItem>
            </Menu>

            <EditExpenseDialog
              open={editDialogOpen}
              expense={editedExpense}
              onClose={() => setEditDialogOpen(false)}
              onSave={handleSaveEditedExpense}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Expenses;
