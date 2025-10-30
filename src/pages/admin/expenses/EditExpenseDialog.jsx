import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";

const expenseTypes = [
  { value: "salary", label: "Salary" },
  { value: "rent", label: "Rent" },
  { value: "utilities", label: "Utilities" },
  { value: "maintenance", label: "Maintenance" },
  { value: "supplies", label: "Supplies" },
];

const EditExpenseDialog = ({ open, expense, onClose, onSave }) => {
  const [data, setData] = React.useState(expense || {});

  React.useEffect(() => {
    setData(expense || {});
  }, [expense]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleDateChange = (newDate) =>
    setData({ ...data, date: dayjs(newDate).format("YYYY-MM-DD") });

  const handleSave = () => {
    if (!data.expenseType || !data.amount || !data.paidTo) return;
    onSave(data);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          width: "100%",
          maxWidth: 500,
          p: 1,
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Edit Expense
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent
        dividers
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          name="expenseType"
          label="Expense Type"
          fullWidth
          value={data.expenseType || ""}
          onChange={handleChange}
        />

        <TextField
          name="amount"
          label="Amount (₹)"
          type="number"
          fullWidth
          value={data.amount || ""}
          onChange={handleChange}
        />

        <TextField
          name="paidTo"
          label="Paid To"
          fullWidth
          value={data.paidTo || ""}
          onChange={handleChange}
        />

        <TextField
          name="details"
          label="Details"
          fullWidth
          multiline
          minRows={2}
          value={data.details || ""}
          onChange={handleChange}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={dayjs(data.date)}
            onChange={handleDateChange}
            slotProps={{
              textField: { fullWidth: true },
            }}
          />
        </LocalizationProvider>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#25307F",
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "#25307F",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            "&:hover": {
              backgroundColor: "#AEC3FF",
              color: "#000",
            },
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExpenseDialog;
