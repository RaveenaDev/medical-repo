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

const AddRoomDialog = ({
  open,
  onClose,
  onSave,
  formData,
  setFormData,
  errors,
  doctors,
  wingTypes,
  roomTypes,
  roomTypesInState,
  handleChange,
  handleBedChange,
  handleAddBed,
  handleRemoveBed,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "90%",
        },
      }}
    >
      <DialogTitle>Add Room</DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={1}>
            {/* Room ID */}
            <Grid item xs={2}>
              <TextField
                autoFocus
                margin="dense"
                label="Room ID"
                name="roomID"
                value={formData.roomID}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                error={!!errors.roomID}
                helperText={errors.roomID}
                required
              />
            </Grid>

            {/* Room Name */}
            <Grid item xs={2}>
              <TextField
                margin="dense"
                label="Room Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>

            {/* Floor */}
            <Grid item xs={2}>
              <TextField
                margin="dense"
                label="Floor"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                type="number"
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
                  value={formData.wing || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, wing: e.target.value })
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

            {/* Doctor */}
            <Grid item xs={2}>
              <FormControl fullWidth margin="dense" error={!!errors.doctorId}>
                <InputLabel id="doctor-select-label">
                  Doctor Assigned
                </InputLabel>
                <Select
                  labelId="doctor-select-label"
                  id="doctor-select"
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  label="Doctor Assigned"
                  variant="outlined"
                  required
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 200,
                        overflowY: "auto",
                        "&::-webkit-scrollbar": { display: "none" },
                        "-ms-overflow-style": "none",
                        "scrollbar-width": "none",
                      },
                    },
                  }}
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

            {/* Room Type */}
            <Grid container spacing={2} item xs={2} alignItems="center">
              <Grid item xs={formData.roomType === "custom" ? 6 : 12}>
                <FormControl
                  fullWidth
                  sx={{ minWidth: 150 }}
                  margin="dense"
                  error={!!errors.roomTypeName}
                >
                  <InputLabel id="roomType-select-label">Room Type</InputLabel>
                  <Select
                    fullWidth
                    labelId="roomType-select-label"
                    id="roomType-select"
                    name="roomType"
                    value={formData.roomTypeName || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({
                        ...formData,
                        roomTypeName: value,
                        customRoomType: value === "custom" ? "" : "",
                      });
                    }}
                    label="Room Type"
                    variant="outlined"
                    required
                  >
                    {roomTypesInState && roomTypesInState.length > 0
                      ? roomTypesInState.map((item) => (
                          <MenuItem
                            key={item.subCategoryName}
                            value={item.subCategoryName}
                          >
                            {item.subCategoryName}
                          </MenuItem>
                        ))
                      : roomTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                  </Select>
                  {errors.roomTypeName && (
                    <Typography variant="caption" color="error">
                      {errors.roomTypeName}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            {/* Beds */}
            {formData.beds.map((bed, index) => (
              <Grid container sx={{ width: "100vw" }} spacing={2} key={index}>
                <Grid item xs={3}>
                  <TextField
                    label="Bed ID"
                    name={`bedId-${index}`}
                    value={bed.bedNumber}
                    onChange={(e) =>
                      handleBedChange(index, "bedNumber", e.target.value)
                    }
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    required
                    error={!!errors[`bedNumber-${index}`]}
                    helperText={errors[`bedNumber-${index}`]}
                  />
                </Grid>

                <Grid item xs={3}>
                  <FormControl
                    fullWidth
                    margin="dense"
                    error={!!errors[`status-${index}`]}
                  >
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={bed.status}
                      onChange={(e) =>
                        handleBedChange(index, "status", e.target.value)
                      }
                      label="Status"
                    >
                      <MenuItem value="Available">Available</MenuItem>
                      <MenuItem value="Occupied">Occupied</MenuItem>
                      <MenuItem value="Under Maintenance">
                        Under Maintenance
                      </MenuItem>
                    </Select>
                    {errors[`status-${index}`] && (
                      <Typography variant="caption" color="error">
                        {errors[`status-${index}`]}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xs={3}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {formData.beds.length > 1 && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveBed(index)}
                    >
                      Remove
                    </Button>
                  )}
                </Grid>
              </Grid>
            ))}

            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#25307F",
                color: "white",
              }}
              onClick={handleAddBed}
            >
              + Add Bed
            </Button>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={onSave}
          variant="contained"
          sx={{
            width: "200px",
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

export default AddRoomDialog;
