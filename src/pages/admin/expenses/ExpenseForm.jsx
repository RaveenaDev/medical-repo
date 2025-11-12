import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Modal,
  Typography,
  IconButton,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import addAppointments from "../../../assets/plus.svg";
import { useDispatch } from "react-redux";
import { addExpense } from "../../../components/State/Admin/Action.js";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Plus } from "lucide-react";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

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
    setOpen(false);
  };

  return (
    <>
      {/* Button to open modal */}
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{
          color: "#fff",
          backgroundColor: "#25307F",

          "&:hover": { background: "#AEC3FF" },
        }}
      >
        <Plus />
        <Typography sx={{ ml: 1, fontWeight: 600 }}>Add Expense</Typography>
      </Button>

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="add-expense-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight="bold">
              Add New Expense
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 2,
            }}
          >
            {["ExpenseType", "Amount", "PaidTo", "Details"].map((field) => (
              <TextField
                key={field}
                label={field.replace(/([A-Z])/g, " $1")}
                name={field}
                value={expenseData[field]}
                onChange={handleChange}
                error={!!errors[field]}
                helperText={errors[field]}
                required
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
                height: "45px",
                mt: 2,
                "&:hover": { background: "#AEC3FF" },
              }}
            >
              Submit Expense
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ExpenseForm;
