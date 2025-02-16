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
import { getExpenses} from "../../../components/State/Admin/Action.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";

const Expenses = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const rows = [
    {
      name: "Jasmin Kaur",
      appointmentWith: "Miss Gitanjali",
      typeVisit: "Walk-in",
      branch: "Therapy",
      tokenNumber: 2,
    },
    {
      name: "Jasmin Kaur",
      appointmentWith: "Miss Gitanjali",
      typeVisit: "Walk-in",
      branch: "Therapy",
      tokenNumber: 2,
    },
    {
      name: "Jasmin Kaur",
      appointmentWith: "Miss Gitanjali",
      typeVisit: "Walk-in",
      branch: "Therapy",
      tokenNumber: 2,
    },
  ];

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedExpense, setEditedExpense] = useState({
        staff_id: "",
        staffId: "",
        profile: "",
        name: "",
        phone: "",
        department: "",
        designation: "",
        status: "",
    });

    const handleMenuOpen = (event, row) => {
        event.stopPropagation(); // Prevent interference with other clicks
        setAnchorEl(event.currentTarget);
        setSelectedExpense(row);
    };

    // Handle Menu Close
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedExpense(null);
    };

    const handleEdit = () => {
        if (selectedExpense) {
            // setEditedExpense({
            //     profile: selectedStaff.profile,
            //     name: selectedStaff.name,
            //     phone: selectedStaff.phone,
            //     department: selectedStaff.department,
            //     designation: selectedStaff.designation,
            //     staff_id: selectedStaff.staff_id,
            //     staffId: selectedStaff._id,
            //     status: selectedStaff.status,
            // });

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
        // dispatch(updateStaff(editedExpense.staffId, editedStaff));
        setEditDialogOpen(false);
        console.log("Expense Edited Successfully");
    };

  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExpenses())
    }, [dispatch]);

    const expenses = useSelector((store) => store.admin.expenses)

    console.log("EXP ",expenses)

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
              Salaries
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={age}
              label="Salaries"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
          <TextField id="outlined-basic" label="Paid To" variant="outlined" />
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
          <TextField id="outlined-basic" label="Details" variant="outlined" />
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
              <DatePicker />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <Button
          variant="contained"
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
                      autoFocus
                      margin="dense"
                      label="Staff Id"
                      type="text"
                      fullWidth
                      variant="outlined"
                      value={editedExpense.staff_id}
                      onChange={(e) =>
                          setEditedExpense({ ...editedExpense, staff_id: e.target.value })
                      }
                  />

                  <TextField
                      autoFocus
                      margin="dense"
                      label="Name"
                      type="text"
                      fullWidth
                      variant="outlined"
                      value={editedExpense.name}
                      onChange={(e) =>
                          setEditedExpense({ ...editedExpense, name: e.target.value })
                      }
                  />
                  <TextField
                      margin="dense"
                      label="Phone"
                      type="text"
                      fullWidth
                      variant="outlined"
                      value={editedExpense.phone}
                      onChange={(e) =>
                          setEditedExpense({ ...editedExpense, phone: e.target.value })
                      }
                  />

                  {/*<TextField*/}
                  {/*    select*/}
                  {/*    label="Department"*/}
                  {/*    name="department"*/}
                  {/*    value={editedStaff.department._id}*/}
                  {/*    onChange={(e) =>*/}
                  {/*        setEditedStaff({ ...editedStaff, department: e.target.value })*/}
                  {/*    }*/}
                  {/*    fullWidth*/}
                  {/*    margin="dense"*/}
                  {/*>*/}
                  {/*    {departments?.map((departments) => (*/}
                  {/*        <MenuItem*/}
                  {/*            key={departments.departmentId}*/}
                  {/*            value={departments.departmentId}*/}
                  {/*        >*/}
                  {/*            {departments.departmentName}*/}
                  {/*        </MenuItem>*/}
                  {/*    ))}*/}
                  {/*</TextField>*/}

                  {/*<TextField*/}
                  {/*    select*/}
                  {/*    label="Designation"*/}
                  {/*    name="designation"*/}
                  {/*    value={editedStaff.designation}*/}
                  {/*    onChange={(e) =>*/}
                  {/*        setEditedStaff({ ...editedStaff, designation: e.target.value })*/}
                  {/*    }*/}
                  {/*    fullWidth*/}
                  {/*    margin="dense"*/}
                  {/*>*/}
                  {/*    <MenuItem value="General Checkup">General Checkup</MenuItem>*/}
                  {/*    <MenuItem value="Follow Up">Follow Up</MenuItem>*/}
                  {/*    <MenuItem value="Consultation">Consultation</MenuItem>*/}
                  {/*</TextField>*/}

                  {/*<TextField*/}
                  {/*    select*/}
                  {/*    label="Status"*/}
                  {/*    name="status"*/}
                  {/*    value={editedStaff.status}*/}
                  {/*    onChange={(e) =>*/}
                  {/*        setEditedStaff({ ...editedStaff, status: e.target.value })*/}
                  {/*    }*/}
                  {/*    fullWidth*/}
                  {/*    margin="dense"*/}
                  {/*>*/}
                  {/*    <MenuItem value="Available">Available</MenuItem>*/}
                  {/*    <MenuItem value="On Leave">On Leave</MenuItem>*/}
                  {/*</TextField>*/}
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
