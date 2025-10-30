import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const EditExpenseDialog = ({ open, expense, onClose, onSave }) => {
  const [data, setData] = React.useState(expense);

  React.useEffect(() => setData(expense), [expense]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const handleDateChange = (newDate) =>
    setData({ ...data, date: dayjs(newDate).format("YYYY-MM-DD") });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Expense</DialogTitle>
      <DialogContent>
        <TextField
          name="expenseType"
          label="Expense Type"
          fullWidth
          select
          margin="dense"
          value={data.expenseType}
          onChange={handleChange}
        >
          <MenuItem value="salary">Salary</MenuItem>
          <MenuItem value="rent">Rent</MenuItem>
          <MenuItem value="utilities">Utilities</MenuItem>
        </TextField>
        <TextField
          name="amount"
          label="Amount"
          fullWidth
          margin="dense"
          value={data.amount}
          onChange={handleChange}
        />
        <TextField
          name="paidTo"
          label="Paid To"
          fullWidth
          margin="dense"
          value={data.paidTo}
          onChange={handleChange}
        />
        <TextField
          name="details"
          label="Details"
          fullWidth
          margin="dense"
          value={data.details}
          onChange={handleChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={dayjs(data.date)} onChange={handleDateChange} />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(data)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExpenseDialog;
