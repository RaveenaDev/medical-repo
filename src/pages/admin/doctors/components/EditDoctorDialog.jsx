// components/EditDoctorDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Avatar,
  MenuItem,
} from "@mui/material";

const EditDoctorDialog = ({
  open,
  onClose,
  editedDoctor,
  setEditedDoctor,
  onSave,
  errors,
}) => {
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedDoctor({ ...editedDoctor, profile: imageUrl });
    } else {
      setEditedDoctor({ ...editedDoctor, profile: "" });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Doctor</DialogTitle>
      <DialogContent>
        <input
          type="file"
          accept="image/*"
          id="edit-file-input"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label htmlFor="edit-file-input">
          <Avatar
            src={editedDoctor.profile}
            alt="Profile"
            sx={{ width: 60, height: 60, cursor: "pointer", mb: 2 }}
          />
        </label>

        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="text"
          fullWidth
          variant="outlined"
          value={editedDoctor.email}
          onChange={(e) =>
            setEditedDoctor({ ...editedDoctor, email: e.target.value })
          }
          error={!!errors.email}
          helperText={errors.email}
          required
        />

        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={editedDoctor.password}
          onChange={(e) =>
            setEditedDoctor({ ...editedDoctor, password: e.target.value })
          }
          error={!!errors.password}
          helperText={errors.password}
          required
        />

        <TextField
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={editedDoctor.name}
          onChange={(e) =>
            setEditedDoctor({ ...editedDoctor, name: e.target.value })
          }
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
          value={editedDoctor.phone}
          onChange={(e) =>
            setEditedDoctor({ ...editedDoctor, phone: e.target.value })
          }
          error={!!errors.phone}
          helperText={errors.phone}
          required
        />

        <TextField
          type="text"
          variant="outlined"
          label="Specialization"
          name="specialization"
          value={editedDoctor.specialization}
          onChange={(e) =>
            setEditedDoctor({ ...editedDoctor, specialization: e.target.value })
          }
          fullWidth
          margin="dense"
          error={!!errors.specialization}
          helperText={errors.specialization}
          required
        />

        <TextField
          select
          label="Status"
          name="status"
          value={editedDoctor.status}
          onChange={(e) =>
            setEditedDoctor({ ...editedDoctor, status: e.target.value })
          }
          fullWidth
          margin="dense"
          error={!!errors.status}
          helperText={errors.status}
          required
        >
          <MenuItem value="Idle">Idle</MenuItem>
          <MenuItem value="On Leave">On Leave</MenuItem>
          <MenuItem value="Emergency Room">Emergency Room</MenuItem>
          <MenuItem value="In Meeting">In Meeting</MenuItem>
          <MenuItem value="With Patient">With Patient</MenuItem>
          <MenuItem value="Available">Available</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDoctorDialog;
