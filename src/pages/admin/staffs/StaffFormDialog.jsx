import React, { useRef } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

const StaffFormDialog = ({
  title,
  open,
  onClose,
  form,
  setForm,
  errors,
  departments,
  onSubmit,
  onImage, // (file, setForm) => void
  submitLabel = "Save",
}) => {
  const fileRef = useRef(null);

  const pickImage = () => fileRef.current?.click();
  const onFile = (e) => onImage?.(e.target.files?.[0], setForm);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onFile}
        />
        <Avatar
          src={form.profile}
          alt="Profile"
          sx={{ width: 60, height: 60, cursor: "pointer", mb: 2 }}
          onClick={pickImage}
        />

        <TextField
          margin="dense"
          label="Staff Id"
          type="text"
          fullWidth
          variant="outlined"
          value={form.staff_id}
          onChange={(e) => setForm((f) => ({ ...f, staff_id: e.target.value }))}
          error={!!errors.staff_id}
          helperText={errors.staff_id}
          required
        />

        <TextField
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          error={!!errors.name}
          helperText={errors.name}
          required
        />

        <TextField
          margin="dense"
          label="Phone"
          type="text"
          fullWidth
          variant="outlined"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          error={!!errors.phone}
          helperText={errors.phone}
          required
        />

        <TextField
          select
          label="Department"
          name="department"
          value={form.department}
          onChange={(e) =>
            setForm((f) => ({ ...f, department: e.target.value }))
          }
          fullWidth
          margin="dense"
          error={!!errors.department}
          helperText={errors.department}
          required
        >
          {Array.isArray(departments) &&
            departments.map((d) => (
              <MenuItem
                key={d.departmentId || d._id}
                value={d.departmentId || d._id}
              >
                {d.departmentName || d.name}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          label="Designation"
          name="designation"
          value={form.designation}
          onChange={(e) =>
            setForm((f) => ({ ...f, designation: e.target.value }))
          }
          fullWidth
          margin="dense"
          error={!!errors.designation}
          helperText={errors.designation}
          required
        />

        <TextField
          select
          label="Status"
          name="status"
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
          fullWidth
          margin="dense"
          error={!!errors.status}
          helperText={errors.status}
          required
        >
          <MenuItem value="Available">Available</MenuItem>
          <MenuItem value="On Leave">On Leave</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          sx={{
            width: 200,
            backgroundColor: "#25307F",
            "&:hover": { background: "#AEC3FF" },
          }}
        >
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StaffFormDialog;
