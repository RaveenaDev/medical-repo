import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Trash2 } from "lucide-react";

const RoomBedsDialog = ({
  open,
  onClose,
  currentRoom,
  newBeds,
  handleAddRow,
  handleChangeRow,
  handleSaveBed,
  handleCancelRow,
  handleUpdateBed, // <-- send update to backend
}) => {
  const [editingBedId, setEditingBedId] = useState(null);
  const [editedBed, setEditedBed] = useState({});

  const startEditing = (bed) => {
    setEditingBedId(bed._id); // assuming each bed has an _id
    setEditedBed({ ...bed });
  };

  const cancelEditing = () => {
    setEditingBedId(null);
    setEditedBed({});
  };

  const saveEditing = () => {
    handleUpdateBed(editedBed); // call parent to update backend
    setEditingBedId(null);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": { maxWidth: "65%" },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "600",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Room ({currentRoom?.roomID})
        <Button
          variant="contained"
          sx={{ backgroundColor: "#25307F", color: "white" }}
          size="small"
          onClick={handleAddRow}
        >
          + Add Bed
        </Button>
      </DialogTitle>

      <DialogContent
        sx={{
          maxHeight: "500px",
          overflowY: "auto",
          paddingRight: "8px",
          "&::-webkit-scrollbar": { width: 0, display: "none" },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <Table
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0 10px",
            width: "100%",
            marginBottom: "30px",
          }}
        >
          <TableHead
            sx={{
              position: "sticky",
              backgroundColor: "#f1f1f1",
              top: 0,
              zIndex: 10,
            }}
          >
            <TableRow>
              <TableCell sx={{ fontWeight: "600", width: "30%" }}>
                Bed ID
              </TableCell>
              <TableCell sx={{ fontWeight: "600", width: "30%" }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: "600", width: "30%", pl: 5 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Existing beds */}
            {currentRoom?.beds?.length > 0 &&
              currentRoom.beds.map((bed) => (
                <TableRow key={bed._id}>
                  <TableCell>
                    {editingBedId === bed._id ? (
                      <TextField
                        size="small"
                        value={editedBed.bedNumber}
                        onChange={(e) =>
                          setEditedBed({
                            ...editedBed,
                            bedNumber: e.target.value,
                          })
                        }
                      />
                    ) : (
                      bed?.bedNumber || "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {editingBedId === bed._id ? (
                      <Select
                        size="small"
                        value={editedBed.status}
                        onChange={(e) =>
                          setEditedBed({ ...editedBed, status: e.target.value })
                        }
                      >
                        <MenuItem value="Available">Available</MenuItem>
                        <MenuItem value="Occupied">Occupied</MenuItem>
                        <MenuItem value="Under Maintenance">
                          Under Maintenance
                        </MenuItem>
                      </Select>
                    ) : (
                      bed?.status || "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {editingBedId === bed._id ? (
                      <>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "rgb(46, 130, 59)",
                            color: "white",
                          }}
                          size="small"
                          onClick={saveEditing}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={cancelEditing}
                          sx={{ ml: 1 }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#25307F", color: "white" }}
                        size="small"
                        onClick={() => startEditing(bed)}
                      >
                        Edit Bed
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}

            {/* New inline rows (unchanged) */}
            {newBeds.map((bed, index) => (
              <TableRow key={`new-${index}`}>
                <TableCell>
                  <TextField
                    size="small"
                    value={bed.bedNumber}
                    onChange={(e) =>
                      handleChangeRow(index, "bedNumber", e.target.value)
                    }
                    placeholder="Enter Bed ID"
                  />
                </TableCell>
                <TableCell>
                  <Select
                    size="small"
                    value={bed.status}
                    onChange={(e) =>
                      handleChangeRow(index, "status", e.target.value)
                    }
                  >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Occupied">Occupied</MenuItem>
                    <MenuItem value="Under Maintenance">
                      Under Maintenance
                    </MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "rgb(46, 130, 59)",
                      color: "white",
                    }}
                    size="small"
                    onClick={() => handleSaveBed(index)}
                  >
                    Save
                  </Button>

                  <IconButton
                    color="error"
                    onClick={() => handleCancelRow(index)}
                  >
                    <Trash2 />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {/* No data message */}
            {(!currentRoom?.beds || currentRoom?.beds.length === 0) &&
              newBeds.length === 0 && (
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={3}
                    sx={{
                      background: "#fff",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                      borderRadius: "8px",
                      "&:hover": { backgroundColor: "#f9f9f9" },
                      "& > *": { borderBottom: "unset" },
                    }}
                  >
                    No data found!
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default RoomBedsDialog;
