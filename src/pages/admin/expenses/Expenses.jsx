import React, { useEffect } from "react";
import CommonPanel from "../Components/CommonPanel.jsx";
import {
  Box,
  Button,
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
              {rows.map((row,index) => (
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
                    XXXXXXXX
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ color: "#25307f", border: "none" }}
                  >
                    {truncateText(row.name, 13)}
                  </TableCell>
                  <TableCell align="center" sx={{ border: "none" }}>
                    {truncateText(row.appointmentWith, 14)}
                  </TableCell>
                  <TableCell align="center" sx={{ border: "none" }}>
                    {row.typeVisit}
                  </TableCell>
                  <TableCell align="center" sx={{ border: "none" }}>
                    {row.branch}
                  </TableCell>
                  <TableCell align="center" sx={{ border: "none" }}>
                    XXXXXX
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
export default Expenses;
