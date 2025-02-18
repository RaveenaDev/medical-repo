import React, {useEffect, useState} from "react";
import CommonPanel from "../Components/CommonPanel.jsx";
import {
    Box,
    Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, ListItemIcon, ListItemText, Menu,
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
import {useDispatch, useSelector} from "react-redux";
import {addExpense, getExpenses, updateExpense} from "../../../components/State/Admin/Action.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import dayjs from "dayjs";

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
        date: dayjs().format("YYYY-MM-DD")
    })

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

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
        console.log("Selected Expense:",expense)
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
                date: selectedExpense.date
            });

            setEditDialogOpen(true);
            console.log("Edit Expense", editedExpense);
        }
        handleMenuClose();
    };

    // Handle Delete Action
    const handleDelete = () => {
        console.log("Staff Deleted");
        handleMenuClose();
    };

    // Handle Edit Dialog Close
    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    // Handle Save Edited Room
    const handleSaveEditedExpense = () => {
        dispatch(updateExpense(editedExpense.expenseId,editedExpense));
        setEditDialogOpen(false);
        // console.log("Expense Edited Successfully",editedExpense);
    };

  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExpenses())
    }, [dispatch]);

    const expenses = useSelector((store) => store.admin.expenses)

    // console.log("EXP ",expenses)

    const handleClick = () => {
        console.log("Expense data: ",expenseData)
        dispatch(addExpense(expenseData))
    }

    const handleChange = (e) => {
        setExpenseData({ ...expenseData,
            [e.target.name]: e.target.value
        });
    };

    const handleDateChange = (newDate) => {
        setExpenseData({
            ...expenseData,
            date: dayjs(newDate).format("YYYY-MM-DD")
        })
    }

  return (
    <>
      <CommonPanel />

      <h2 style={{ color: "black", fontWeight: 500 }}>Expenses</h2>

      <Box
        sx={{ display: "flex", gap: 1, mt: 2, justifyContent: "space-between" }}
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
              name="expenseType"
              value={expenseData.expenseType}
              label="Expense Type"
              onChange={handleChange}
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
          <TextField id="outlined-basic" label="Paid To" variant="outlined"
                     name="paidTo"
                     value={expenseData.paidTo} onChange={handleChange}/>
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
          <TextField id="outlined-basic" label="Details" variant="outlined"
                     name="details"
                     value={expenseData.details} onChange={handleChange}/>
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
              <DatePicker name="date" value={date} onChange={handleDateChange}/>
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
                  align="left"
                  sx={{
                    fontSize: "15px",
                    color: "#959595",
                    padding: "0.5rem 1.5rem",
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
              {expenses.map((row,index) => (
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
                    component="th"
                    scope="row"
                    sx={{ color: "#25307f", border: "none" }}
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
                      {truncateText(row.date, 14)}
                  </TableCell>
                    <TableCell>
                        <IconButton onClick={(event) => handleMenuOpen(event, row)}>
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
                          setEditedExpense({ ...editedExpense, expenseType: e.target.value })
                      }
                      fullWidth
                      margin="dense"
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
                  />
                  <TextField
                      margin="dense"
                      label="Details"
                      type="text"
                      fullWidth
                      variant="outlined"
                      value={editedExpense.details}
                      onChange={(e) =>
                          setEditedExpense({ ...editedExpense, details: e.target.value })
                      }
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]} sx={{ padding: 0 }}>
                          <DatePicker name="date" value={dayjs(editedExpense.date)}
                                      onChange={(newDate) =>
                                          setEditedExpense({ ...editedExpense, date: dayjs(newDate).format("YYYY-MM-DD") })
                                      }
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
    </>
  );
};
export default Expenses;
