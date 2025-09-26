import React, { useMemo, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const RescheduleToday = ({ open, onClose, onConfirm }) => {
    const [afterToken, setAfterToken] = useState("");

    const handleConfirm = () => {
        const n = Number(afterToken);
        if (!Number.isInteger(n) || n < 0) {
            alert("Please enter a valid token number (0 or greater).");
            return;
        }
        onConfirm?.({ afterTokenNumber: n });
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Reschedule Today</DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
                    <TextField
                        label="After which token number?"
                        value={afterToken}
                        onChange={(e) => setAfterToken(e.target.value)}
                        size="small"
                        fullWidth
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        helperText="Example: 5 → moves this appointment after token #5 for today."
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleConfirm}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default RescheduleToday
