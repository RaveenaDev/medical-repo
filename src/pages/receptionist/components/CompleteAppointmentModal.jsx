// CompleteAppointmentModal.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
} from "@mui/material";

/**
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - onComplete: ({ file, note, appointment }) => Promise<void> | void
 * - appointment: the selected appointment object
 */
const CompleteAppointmentModal = ({ open, onClose, onComplete, appointment }) => {
    const [file, setFile] = useState(null);
    const [note, setNote] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // reset when modal changes
        if (!open) {
            setFile(null);
            setNote("");
            setSubmitting(false);
        }
    }, [open]);

    const isReady = useMemo(() => !!file, [file]);

    const handleSubmit = async () => {
        if (!isReady || submitting) return;
        try {
            setSubmitting(true);
            await onComplete?.({ file, note, appointment });
            onClose?.();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={submitting ? undefined : onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Mark Appointment as Completed</DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    <Box>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                            Upload Image / File <span style={{ color: "#d32f2f" }}>*</span>
                        </Typography>
                        <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                        />
                        {file && (
                            <Typography variant="caption" sx={{ display: "block", mt: 0.5 }}>
                                Selected: {file.name}
                            </Typography>
                        )}
                    </Box>

                    <TextField
                        label="Add a note (optional)"
                        placeholder="Any remarks to store with this completion…"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        multiline
                        minRows={3}
                        fullWidth
                    />

                    {appointment && (
                        <Box sx={{ p: 1.5, border: "1px dashed #ddd", borderRadius: 1, bgcolor: "#fafafa" }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {appointment?.patient?.name} · {appointment?.caseId}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Doctor: {appointment?.doctor?.name || "—"} · Dept: {appointment?.department?.name || "—"}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} disabled={submitting} color="inherit">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={!isReady || submitting}
                    sx={{ bgcolor: "#25307F" }}
                >
                    {submitting ? "Completing…" : "Complete"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CompleteAppointmentModal;
