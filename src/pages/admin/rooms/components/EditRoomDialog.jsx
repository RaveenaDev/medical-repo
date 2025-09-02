import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const EditRoomDialog = ({
  open,
  onClose,
  onSave,
  editedRoom,
  setEditedRoom,
  errors,
  doctors,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Room</DialogTitle>

      <DialogContent>
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                autoFocus
                margin="dense"
                label="Room ID"
                name="roomID"
                value={editedRoom.roomID}
                onChange={(e) =>
                  setEditedRoom({ ...editedRoom, roomID: e.target.value })
                }
                fullWidth
                variant="outlined"
                error={!!errors.roomID}
                helperText={errors.roomID}
                required
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                margin="dense"
                label="Room Name"
                name="name"
                value={editedRoom.name}
                onChange={(e) =>
                  setEditedRoom({ ...editedRoom, name: e.target.value })
                }
                fullWidth
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth margin="dense" error={!!errors.status}>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  value={editedRoom.status}
                  onChange={(e) =>
                    setEditedRoom({ ...editedRoom, status: e.target.value })
                  }
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Occupied">Occupied</MenuItem>
                  <MenuItem value="Under Maintenance">
                    Under Maintenance
                  </MenuItem>
                </Select>
                {errors.status && (
                  <Typography variant="caption" color="error">
                    {errors.status}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth margin="dense" error={!!errors.doctorId}>
                <InputLabel id="doctor-select-label">
                  Doctor Assigned
                </InputLabel>
                <Select
                  labelId="doctor-select-label"
                  value={editedRoom.assignedDoctor}
                  onChange={(e) =>
                    setEditedRoom({
                      ...editedRoom,
                      assignedDoctor: e.target.value,
                    })
                  }
                  required
                >
                  {doctors?.map((doctor) => (
                    <MenuItem key={doctor._id} value={doctor._id}>
                      {doctor.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.doctorId && (
                  <Typography variant="caption" color="error">
                    {errors.doctorId}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRoomDialog;
