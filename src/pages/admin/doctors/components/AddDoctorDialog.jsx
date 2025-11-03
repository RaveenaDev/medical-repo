// components/AddDoctorDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Avatar,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const AddDoctorDialog = ({
  open,
  onClose,
  newDoctor,
  setNewDoctor,
  onSubmit,
  errors,
  departments,
}) => {
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewDoctor({ ...newDoctor, profile: imageUrl });
    } else {
      setNewDoctor({ ...newDoctor, profile: "" });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Doctor</DialogTitle>
      <DialogContent>
        <input
          type="file"
          accept="image/*"
          id="add-file-input"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label htmlFor="add-file-input">
          <Avatar
            src={newDoctor.profile}
            alt="Profile"
            sx={{ width: 60, height: 60, cursor: "pointer", mb: 2 }}
          />
        </label>

        <TextField
          error={!!errors.email}
          helperText={errors.email}
          required
          margin="dense"
          label="Email"
          type="text"
          fullWidth
          variant="outlined"
          value={newDoctor.email}
          onChange={(e) =>
            setNewDoctor({ ...newDoctor, email: e.target.value })
          }
        />

        <TextField
          error={!!errors.password}
          helperText={errors.password}
          required
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={newDoctor.password}
          onChange={(e) =>
            setNewDoctor({ ...newDoctor, password: e.target.value })
          }
        />

        <TextField
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={newDoctor.name}
          error={!!errors.name}
          helperText={errors.name}
          required
          onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
        />

        <TextField
          margin="dense"
          label="Phone"
          error={!!errors.phone}
          helperText={errors.phone}
          required
          type="text"
          fullWidth
          variant="outlined"
          value={newDoctor.phone}
          onChange={(e) =>
            setNewDoctor({ ...newDoctor, phone: e.target.value })
          }
        />

        <TextField
          margin="dense"
          label="Specialization"
          name="specialization"
          value={newDoctor.specialization}
          onChange={(e) =>
            setNewDoctor({ ...newDoctor, specialization: e.target.value })
          }
          fullWidth
          type="text"
          variant="outlined"
          error={!!errors.specialization}
          helperText={errors.specialization}
          required
        />

        <FormControl fullWidth margin="dense">
          <InputLabel id="doctor-select-label">Department</InputLabel>
          <Select
            labelId="doctor-select-label"
            id="doctor-select"
            value={newDoctor.department}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, department: e.target.value })
            }
            label="Department"
            variant="outlined"
          >
            {departments?.map((department) => (
              <MenuItem
                key={department.departmentId}
                value={department.departmentName}
              >
                {department.departmentName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={onSubmit}
          variant="contained"
          sx={{
            width: 200,
            backgroundColor: "#25307F",
            "&:hover": { backgroundColor: "green" },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDoctorDialog;
