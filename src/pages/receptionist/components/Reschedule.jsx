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
import { LoadingButton } from "@mui/lab"; // ⬅️ add this
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const Reschedule = ({ open, onClose, onConfirm }) => {
    const [date, setDate] = useState(null); // dayjs
    const [time, setTime] = useState(null); // dayjs
    const [submitting, setSubmitting] = useState(false);
    const tomorrow = useMemo(() => dayjs().add(1, "day").startOf("day"), []);

    const handleConfirm = async () => {
        if (!date || !time) return;

        const combined = date
            .hour(time.hour())
            .minute(time.minute())
            .second(0)
            .millisecond(0);

        if (combined.isBefore(tomorrow)) {
            alert("Please pick a date after today.");
            return;
        }

        try {
            setSubmitting(true);
            // Expect onConfirm to return a Promise
            await onConfirm?.({
                combinedISO: combined.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                combined,
            });
            // Optional: close here if parent doesn't close on success
            // onClose?.();
        } catch (e) {
            console.error(e);
            alert(e?.message || "Failed to reschedule. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={submitting ? undefined : onClose}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogContent dividers>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
                        <DatePicker
                            label="New Date"
                            value={date}
                            onChange={(v) => setDate(v)}
                            slotProps={{ textField: { size: "small", fullWidth: true } }}
                            minDate={tomorrow}
                            disabled={submitting}
                        />
                        <TimePicker
                            label="New Time"
                            value={time}
                            onChange={(v) => setTime(v)}
                            slotProps={{ textField: { size: "small", fullWidth: true } }}
                            disabled={submitting}
                        />
                        <Typography variant="caption" color="text.secondary">
                            Note: You can only pick a date after today.
                        </Typography>
                    </Box>
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={submitting}>
                    Cancel
                </Button>
                <LoadingButton
                    variant="contained"
                    onClick={handleConfirm}
                    loading={submitting}
                >
                    Confirm
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default Reschedule;
