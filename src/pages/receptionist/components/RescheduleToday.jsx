import React, { useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Box, Button
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const RescheduleToday = ({ open, onClose, onConfirm }) => {
    const [afterToken, setAfterToken] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleConfirm = async () => {
        const n = Number(afterToken);
        if (!Number.isInteger(n) || n < 0) {
            alert("Please enter a valid token number (0 or greater).");
            return;
        }
        try {
            setSubmitting(true);
            // onConfirm returns a Promise (from dispatch in parent)
            await onConfirm?.({ afterTokenNumber: n });
            // parent closes the modal in the .then() — but it’s fine if you prefer closing here:
            // onClose?.();
        } catch (e) {
            console.error(e);
            alert(e?.message || "Failed to reschedule. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={submitting ? undefined : onClose} maxWidth="xs" fullWidth>
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
                        disabled={submitting}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={submitting}>Cancel</Button>
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

export default RescheduleToday;
