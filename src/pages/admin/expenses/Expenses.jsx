import React, { useEffect, useState } from "react";
import CommonPanel from "../Components/CommonPanel.jsx";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import addAppointments from "../../../assets/plus.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../../../components/State/Admin/Action.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Expenses = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const [date, setDate] = useState(dayjs());

  const [expenseData, setExpenseData] = useState({
    expenseType: "",
    amount: "",
    paidTo: "",
    details: "",
    date: dayjs().format("YYYY-MM-DD"),
  });

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  const [errors, setErrors] = useState({}); // Added error state

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedExpense, setEditedExpense] = useState({
    expenseId: "",
    expenseType: "",
    amount: "",
    paidTo: "",
    details: "",
    date: "",
  });

  const handleMenuOpen = (event, expense) => {
    event.stopPropagation(); // Prevent interference with other clicks
    setAnchorEl(event.currentTarget);
    setSelectedExpense(expense);
  };

  // Handle Menu Close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedExpense(null);
  };

  const handleEdit = () => {
    if (selectedExpense) {
      setEditedExpense({
        expenseId: selectedExpense._id,
        expenseType: selectedExpense.expenseType,
        amount: selectedExpense.amount,
        paidTo: selectedExpense.paidTo,
        details: selectedExpense.details,
        date: selectedExpense.date,
      });

      setEditDialogOpen(true);
    }
    handleMenuClose();
  };

  // Handle Delete Action
  const handleDelete = () => {
    dispatch(deleteExpense(selectedExpense._id));
    handleMenuClose();
  };

  // Handle Edit Dialog Close
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  const expenses = useSelector((store) => store.admin.expenses);
  const validateExpenseData = (data) => {
    let newErrors = {};

    if (!data.expenseType) newErrors.expenseType = "Expense Type is required";
    if (!data.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(data.amount) || Number(data.amount) <= 0) {
      newErrors.amount = "Enter a valid amount";
    }
    if (!data.paidTo) newErrors.paidTo = "Paid To is required";
    if (!data.details) newErrors.details = "Details are required";
    if (!data.date) newErrors.date = "Date is required";

    return newErrors;
  };

  // Handle Add Expense
  const handleClick = () => {
    let newErrors = validateExpenseData(expenseData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields correctly!", {
        position: "bottom-right",
      });
      return;
    }

    dispatch(addExpense(expenseData));
    setErrors({});
  };

  // Handle Edit Expense
  const handleSaveEditedExpense = () => {
    let newErrors = validateExpenseData(editedExpense);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields correctly!", {
        position: "bottom-right",
      });
      return;
    }

    dispatch(updateExpense(editedExpense.expenseId, editedExpense));
    setErrors({});
    setEditDialogOpen(false);
  };

  const handleChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newDate) => {
    setExpenseData({
      ...expenseData,
      date: dayjs(newDate).format("YYYY-MM-DD"),
    });
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0px",
          padding: "10px",
          width: "76%",
          background: " #F1F1F1",
          zIndex: 100,
        }}
      >
        <CommonPanel />
      </div>

      <div style={{ marginTop: "200px" }}>
        <h2 style={{ color: "black", fontWeight: 500 }}>Expenses</h2>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 2,
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "12rem",
            }}
          >
            <div style={{ paddingLeft: "0.2rem" }}>
              <p style={{ color: "#25307F" }}>Expense Type</p>
            </div>
            <FormControl sx={{ my: 1 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Expense Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Expense Type"
                name="expenseType"
                value={expenseData.expenseType}
                onChange={handleChange}
                error={!!errors.expenseType}
              >
                <MenuItem value="salary">Salary</MenuItem>
                <MenuItem value="rent">Rent</MenuItem>
                <MenuItem value="utilities">Utilities</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "7px",
            }}
          >
            <div style={{ paddingLeft: "0.2rem" }}>
              <p style={{ color: "#25307F" }}>Amount</p>
            </div>
            <TextField
              id="outlined-basic"
              label="Enter Amount"
              variant="outlined"
              name="amount"
              value={expenseData.amount}
              onChange={handleChange}
              error={!!errors.amount}
              helperText={errors.amount}
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",

              gap: "7px",
            }}
          >
            <div style={{ paddingLeft: "0.2rem" }}>
              <p style={{ color: "#25307F" }}>Paid To</p>
            </div>
            <TextField
              id="outlined-basic"
              label="Paid To"
              variant="outlined"
              name="paidTo"
              value={expenseData.paidTo}
              onChange={handleChange}
              error={!!errors.paidTo}
              helperText={errors.paidTo}
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",

              gap: "7px",
            }}
          >
            <div style={{ paddingLeft: "0.2rem" }}>
              <p style={{ color: "#25307F" }}>Details</p>
            </div>
            <TextField
              id="outlined-basic"
              label="Details"
              variant="outlined"
              name="details"
              value={expenseData.details}
              onChange={handleChange}
              error={!!errors.details}
              helperText={errors.details}
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "7px",
            }}
          >
            <div style={{ paddingLeft: "0.2rem" }}>
              <p style={{ color: "#25307F" }}>Date</p>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ padding: 0 }}>
                <DatePicker
                  name="date"
                  value={date}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      error: !!errors.date,
                      helperText: errors.date,
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }, // Smaller font on small screens
              color: "#ffffff",
              textTransform: "capitalize",
              padding: {
                xs: "0px 8px",
                sm: "0px 10px",
                md: "0px 10px",
              }, // Adjust padding
              backgroundColor: "#25307F",
              height: "3.4rem",
              width: "12rem",
              marginTop: "1.9rem",
              outline: "none",
              boxShadow: "none",
              "&:hover": {
                background: "#AEC3FF",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
              "&:active": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            <img src={addAppointments} alt="Img" />
            <h5 style={{ marginLeft: "1rem" }}>Add Expense</h5>
          </Button>
        </Box>

        <div style={{ marginTop: "1.5rem" }}>
          <TableContainer component={Paper}>
            <Table
              sx={{
                borderCollapse: "separate", // Ensure border-spacing works
                borderSpacing: "0 8px", // Adds vertical spacing between rows
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontSize: "15px",
                      color: "#959595",
                      padding: "0.5rem 0.8rem",
                      border: "none",
                    }}
                  >
                    Expense Type
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "15px",
                      color: "#959595",
                      padding: "0.5rem 0.8rem",
                      paddingRight: "28px",
                      border: "none",
                    }}
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "15px",
                      color: "#959595",
                      padding: "0.5rem 0.8rem",
                      border: "none",
                    }}
                  >
                    Paid To
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "15px",
                      color: "#959595",
                      padding: "0.5rem 0.8rem",
                      border: "none",
                    }}
                  >
                    Details
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "15px",
                      color: "#959595",
                      padding: "0.5rem 0.8rem",
                      border: "none",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "15px",
                      color: "#959595",
                      padding: "0.5rem 0.8rem",
                      border: "none",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: "#F1F5FF",
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "#25307f", border: "none" }}
                    >
                      {row.expenseType}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#25307f",
                        border: "none",
                        paddingRight: "38px",
                      }}
                    >
                      {truncateText(row.amount, 13)}
                    </TableCell>
                    <TableCell align="center" sx={{ border: "none" }}>
                      {truncateText(row.paidTo, 14)}
                    </TableCell>
                    <TableCell align="center" sx={{ border: "none" }}>
                      {row.details}
                    </TableCell>
                    <TableCell align="center" sx={{ border: "none" }}>
                      {new Date(row.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, row)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Actions Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 2,
              sx: { padding: 1 },
            }}
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

          {/* Edit Patient Dialog */}
          <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
            <DialogTitle>Edit Expense</DialogTitle>
            <DialogContent>
              <TextField
                select
                label="Expense Type"
                name="expenseType"
                value={editedExpense.expenseType}
                onChange={(e) =>
                  setEditedExpense({
                    ...editedExpense,
                    expenseType: e.target.value,
                  })
                }
                fullWidth
                margin="dense"
                error={!!errors.expenseType}
                helperText={errors.expenseType}
              >
                <MenuItem value="salary">Salary</MenuItem>
                <MenuItem value="rent">Rent</MenuItem>
                <MenuItem value="utilities">Utilities</MenuItem>
              </TextField>

              <TextField
                autoFocus
                margin="dense"
                label="Amount"
                type="text"
                fullWidth
                variant="outlined"
                value={editedExpense.amount}
                onChange={(e) =>
                  setEditedExpense({ ...editedExpense, amount: e.target.value })
                }
                error={!!errors.amount}
                helperText={errors.amount}
              />

              <TextField
                autoFocus
                margin="dense"
                label="Paid To"
                type="text"
                fullWidth
                variant="outlined"
                value={editedExpense.paidTo}
                onChange={(e) =>
                  setEditedExpense({ ...editedExpense, paidTo: e.target.value })
                }
                error={!!errors.paidTo}
                helperText={errors.paidTo}
              />
              <TextField
                margin="dense"
                label="Details"
                type="text"
                fullWidth
                variant="outlined"
                value={editedExpense.details}
                onChange={(e) =>
                  setEditedExpense({
                    ...editedExpense,
                    details: e.target.value,
                  })
                }
                error={!!errors.details}
                helperText={errors.details}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]} sx={{ padding: 0 }}>
                  <DatePicker
                    name="date"
                    value={dayjs(editedExpense.date)}
                    onChange={(newDate) =>
                      setEditedExpense({
                        ...editedExpense,
                        date: dayjs(newDate).format("YYYY-MM-DD"),
                      })
                    }
                    slotProps={{
                      textField: {
                        error: !!errors.date,
                        helperText: errors.date,
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditDialogClose}>Cancel</Button>
              <Button onClick={handleSaveEditedExpense}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};
export default Expenses;
