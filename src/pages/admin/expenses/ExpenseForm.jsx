import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import addAppointments from "../../../assets/plus.svg";
import { useDispatch } from "react-redux";
import { addExpense } from "../../../components/State/Admin/Action.js";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const [expenseData, setExpenseData] = useState({
    expenseType: "",
    amount: "",
    paidTo: "",
    details: "",
    date: dayjs().format("YYYY-MM-DD"),
  });
  const [errors, setErrors] = useState({});

  const validateExpenseData = (data) => {
    let newErrors = {};
    if (!data.expenseType) newErrors.expenseType = "Expense Type required";
    if (!data.amount || isNaN(data.amount))
      newErrors.amount = "Valid amount required";
    if (!data.paidTo) newErrors.paidTo = "Paid To required";
    if (!data.details) newErrors.details = "Details required";
    if (!data.date) newErrors.date = "Date required";
    return newErrors;
  };

  const handleChange = (e) =>
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });

  const handleDateChange = (newDate) =>
    setExpenseData({
      ...expenseData,
      date: dayjs(newDate).format("YYYY-MM-DD"),
    });

  const handleSubmit = () => {
    const newErrors = validateExpenseData(expenseData);
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      toast.error("Please fill all fields");
      return;
    }
    dispatch(addExpense(expenseData));
    setExpenseData({
      expenseType: "",
      amount: "",
      paidTo: "",
      details: "",
      date: dayjs().format("YYYY-MM-DD"),
    });
    setErrors({});
  };

  return (
    <Box
      sx={{ display: "flex", gap: 1, mt: 2, justifyContent: "space-between" }}
    >
      {["expenseType", "amount", "paidTo", "details"].map((field) => (
        <TextField
          key={field}
          label={field.replace(/([A-Z])/g, " $1")}
          name={field}
          value={expenseData[field]}
          onChange={handleChange}
          error={!!errors[field]}
          helperText={errors[field]}
          required
          sx={{ width: "15%", "& .MuiOutlinedInput-root": { height: "50px" } }}
        />
      ))}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          value={dayjs(expenseData.date)}
          onChange={handleDateChange}
          slotProps={{
            textField: { error: !!errors.date, helperText: errors.date },
          }}
        />
      </LocalizationProvider>

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          color: "#fff",
          backgroundColor: "#25307F",
          height: "50px",
          width: "11rem",
          mt: "auto",
          "&:hover": { background: "#AEC3FF" },
        }}
      >
        <img src={addAppointments} alt="add" />
        <h5 style={{ marginLeft: "1rem" }}>Add Expense</h5>
      </Button>
    </Box>
  );
};

export default ExpenseForm;
