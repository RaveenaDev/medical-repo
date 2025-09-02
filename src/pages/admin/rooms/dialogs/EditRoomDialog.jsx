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
  wingTypes,
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
              <TextField
                margin="dense"
                label="Floor"
                name="floor"
                value={editedRoom.floor}
                onChange={(e) =>
                  setEditedRoom({ ...editedRoom, floor: e.target.value })
                }
                fullWidth
                variant="outlined"
                error={!!errors.floor}
                helperText={errors.floor}
                required
              />
            </Grid>

            {/* Wing */}
            <Grid item xs={2}>
              <FormControl
                fullWidth
                sx={{ minWidth: 150 }}
                margin="dense"
                error={!!errors.wing}
              >
                <InputLabel id="wing-select-label">Wing</InputLabel>
                <Select
                  labelId="wing-select-label"
                  id="wing-select"
                  name="wing"
                  value={editedRoom.wing || ""}
                  onChange={(e) =>
                    setEditedRoom({ ...editedRoom, wing: e.target.value })
                  }
                  label="Wing"
                  variant="outlined"
                  required
                >
                  {wingTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {errors.wing && (
                  <Typography variant="caption" color="error">
                    {errors.wing}
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
