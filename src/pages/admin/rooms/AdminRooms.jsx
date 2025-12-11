import React, { useEffect, useState } from "react";
import CommonPanel from "../Components/CommonPanel.jsx";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ayu from "../../receptionist/doctors/doctors.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import addIcon from "../../../assets/plus.svg";
import styles from "../../receptionist/styles.module.scss";
import Grid from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addBedsToRoom,
  addRoom,
  deleteRoom,
  getFilteredRooms,
  getRoomTypes,
  updateRoom,
} from "../../../components/State/Admin/Action.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

import { Check, Trash2, X } from "lucide-react";
import EditRoomDialog from "./dialogs/EditRoomDialog.jsx";
import AddRoomDialog from "./dialogs/AddRoomDialog.jsx";
import RoomBedsDialog from "./dialogs/RoomBedsDialog.jsx";

const AdminRooms = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  const [errors, setErrors] = useState({}); // Added error state

  const [anchorEl, setAnchorEl] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDialogOpen1, setAddDialogOpen1] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const roomTypes = ["Private", "Deluxe", "General Ward", "ICU"];
  const wingTypes = ["North", "South", "East", "West", "Central"];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // State for editing room
  const [editedRoom, setEditedRoom] = useState({
    roomID: "",
    name: "",
    assignedDoctor: "",
    floor: "",
    status: "",
    originalRoomID: "",
    wing: "",
  });

  // Handle Edit Action
  const handleEdit = () => {
    // console.log("Editing room:", selectedRoom);
    if (selectedRoom) {
      setEditedRoom({
        roomID: selectedRoom.roomID,
        name: selectedRoom.name,
        assignedDoctor: selectedRoom.assignedDoctor._id,
        status: selectedRoom.status,
        originalRoomID: selectedRoom._id,
        floor: selectedRoom.floor,
        wing: selectedRoom.wing,
      });
      setEditDialogOpen(true);
    }
    handleMenuClose();
  };

  const handleSaveEditedRoom = () => {
    let newErrors = {};

    Object.keys(editedRoom).forEach((key) => {
      if (!editedRoom[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields!", {
        position: "bottom-right",
      });
      return;
    }

    dispatch(updateRoom(editedRoom.originalRoomID, editedRoom));
    setErrors({});
    setEditDialogOpen(false);
  };

  // Handle Menu Open
  const handleMenuOpen = (event, room) => {
    event.stopPropagation(); // Prevent interference with other clicks
    setAnchorEl(event.currentTarget);
    setSelectedRoom(room);
  };

  // Handle Menu Close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRoom(null);
  };

  // Handle Delete Action
  const handleDelete = () => {
    dispatch(deleteRoom(selectedRoom._id));
    handleMenuClose();
  };

  // Handle Edit Dialog Close
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleAddDialogOpen = () => setAddDialogOpen(true);
  const handleAddDialogOpen1 = (room) => {
    setAddDialogOpen1(true);
    setCurrentRoom(room);
  };
  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const handleSubmit = () => {
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (key !== "beds" && !formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    // Convert customRoomType into roomType before sending
    const finalData = {
      ...formData,
      roomType:
        formData.roomType === "custom"
          ? formData.customRoomType
          : formData.roomType,
    };
    delete finalData.customRoomType;

    // console.log("To: ", finalData);
    dispatch(addRoom(finalData));
    setErrors({});
    setAddDialogOpen(false);
  };

  const [formData, setFormData] = useState({
    roomID: "",
    name: "",
    roomTypeName: "",
    doctorId: "",
    floor: "",
    wing: "",
    beds: [
      {
        bedNumber: "",
        status: "",
        features: {},
      },
    ],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBedChange = (index, key, value) => {
    const updatedBeds = [...formData.beds];
    updatedBeds[index][key] = value;
    setFormData({ ...formData, beds: updatedBeds });
  };

  const handleAddBed = () => {
    setFormData({
      ...formData,
      beds: [...formData.beds, { bedNumber: "", status: "", cost: "" }],
    });
  };

  const handleRemoveBed = (index) => {
    const updatedBeds = [...formData.beds];
    updatedBeds.splice(index, 1);
    setFormData({ ...formData, beds: updatedBeds });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilteredRooms(page, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);
  useEffect(() => {
    dispatch(getRoomTypes());
  }, [dispatch]);
  const navigate = useNavigate();

  const rooms = useSelector((state) => state.admin.filteredRooms);

  // console.log("Rooms from state: ", rooms);
  const totalRooms = useSelector((state) => state.admin.totalFilteredRooms);
  const loading = useSelector((state) => state.admin.isLoadingRooms);
  // const rooms = undefined;
  const doctors = useSelector((state) => state.admin.doctors);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };
  // console.log("Current Form Data: ", rooms);

  const roomTypesInState = useSelector((state) => state.admin.roomTypes);
  const [newBeds, setNewBeds] = useState([]);

  const handleAddRow = () => {
    setNewBeds((prev) => [...prev, { bedNumber: "", status: "Available" }]);
  };

  const handleChangeRow = (index, field, value) => {
    setNewBeds((prev) =>
      prev.map((bed, i) => (i === index ? { ...bed, [field]: value } : bed))
    );
  };

  const handleSaveBed = async (index) => {
    const bed = newBeds[index];
    const payload = {
      roomId: currentRoom?._id,
      beds: [bed],
    };

    try {
      const res = await dispatch(addBedsToRoom(payload));

      if (res) {
        setCurrentRoom((prev) => ({
          ...prev,
          beds: [...(prev?.beds || []), ...res.beds],
        }));

        setNewBeds((prev) => prev.filter((_, i) => i !== index));
      }
    } catch (err) {
      console.error("Error adding bed:", err);
    }
  };
  const handleCancelRow = (index) => {
    setNewBeds((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div
      style={{
        background: "#f1f1f1",
        height: "99dvh", // Make the entire div take up the full viewport height
        overflow: "hidden", // Prevent scrolling on the rest of the page
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "0px",
          padding: "10px",
          width: "77%",
          background: " #F1F1F1",
          zIndex: 100,
        }}
      >
        <CommonPanel />
      </div>
      <div style={{ marginTop: "160px" }}>
        <>
          <Box
            sx={{
              borderBottom: "1px solid #87878782",
              paddingBottom: 0.5,
              marginBottom: 1,
            }}
          >
            <div
              className={ayu.headerContainer}
              style={{ justifyContent: "space-between" }}
            >
              <div style={{ display: "flex" }}>
                <span
                  onClick={() => navigate(-1)}
                  style={{
                    transform: "translateY(8px)",
                    color: "black",
                    cursor: "pointer",
                  }}
                >
                  <ArrowBackIosIcon />
                </span>
                <h2 className={ayu.departmentTitle}>Total Rooms:</h2>
                <h2 className={ayu.departmentTitleDetails}>{totalRooms}</h2>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Box sx={{ display: "flex", gap: 3 }}>
                  {/* Adjust gap for spacing */}
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ color: "black" }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "#3DB461",
                      }}
                    />
                    Available
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ color: "black" }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "#FFA412",
                      }}
                    />
                    Occupied
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ color: "black" }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "#AEC3FF",
                      }}
                    />
                    Under Maintenance
                  </Box>
                </Box>

                <div style={{ marginLeft: "auto" }}>
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: "20px",
                      color: "#ffffff",
                      textTransform: "capitalize",
                      padding: "2px 18px",
                      backgroundColor: "#25307F",
                      boxShadow: "0px 4px 4px 0px #C2C2C240",
                      "&:hover": {
                        background: "#AEC3FF",
                      },
                    }}
                    onClick={handleAddDialogOpen} // Open modal on click
                  >
                    <img
                      src={addIcon}
                      className={styles.appointmentBlock__plusIcon}
                    />
                    Add
                  </Button>
                </div>
              </div>
              <AddRoomDialog
                open={addDialogOpen}
                onClose={handleAddDialogClose}
                onSave={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                doctors={doctors}
                wingTypes={wingTypes}
                roomTypes={roomTypes}
                roomTypesInState={roomTypesInState}
                handleChange={handleChange}
                handleBedChange={handleBedChange}
                handleAddBed={handleAddBed}
                handleRemoveBed={handleRemoveBed}
              />

              <RoomBedsDialog
                open={addDialogOpen1}
                onClose={() => setAddDialogOpen1(false)}
                currentRoom={currentRoom}
                newBeds={newBeds}
                handleAddRow={handleAddRow}
                handleChangeRow={handleChangeRow}
                handleSaveBed={handleSaveBed}
                handleCancelRow={handleCancelRow}
              />
            </div>
          </Box>

          {/* Table Section */}
          <TableContainer
            sx={{
              maxHeight: "63vh", // Adjust this to fit your layout needs
              overflowY: "auto",
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
              {loading && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(255, 255, 255, 0.6)",
                    backdropFilter: "blur(2px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 20,
                  }}
                >
                  <CircularProgress sx={{ color: "#25307F" }} />
                </Box>
              )}
              <TableHead
                sx={{
                  position: "sticky",
                  backgroundColor: "#f1f1f1",
                  top: 0,
                  zIndex: 10, // Keep it above other elements
                }}
              >
                <TableRow>
                  <TableCell sx={{ fontWeight: "600", width: "25%" }}>
                    Room ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600", width: "25%" }}>
                    Room Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600", width: "25%" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600", width: "25%" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: "600", minWidth: "8rem" }}>
                    Doctor Assigned
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      width: "auto",
                      textAlign: "right",
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rooms.length > 0 ? (
                  rooms.map((room) => (
                    <TableRow
                      key={room._id}
                      sx={{
                        background: "#fff",
                        cursor: "pointer",
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "#f9f9f9",
                        },
                      }}
                      onClick={() => handleAddDialogOpen1(room)}
                    >
                      <TableCell
                        sx={{
                          color: "#25307F",
                          fontWeight: "bold",
                          width: "25%",
                        }}
                      >
                        {room.roomID}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#25307F",
                          fontWeight: "bold",
                          width: "25%",
                        }}
                      >
                        {room?.roomType}
                      </TableCell>
                      <TableCell sx={{ width: "25%" }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "bold",
                            color: "#25307F",
                            cursor: "pointer",
                            whiteSpace: "nowrap", // Prevents text from wrapping
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {room.name}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ width: "25%" }}>
                        {" "}
                        {/* Increase 'pl' value for more spacing */}
                        <Box display="flex" alignItems="center" gap={1}>
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor:
                                room.status === "Under Maintenance"
                                  ? "#AEC3FF"
                                  : room.status === "Full"
                                  ? "#FFA412"
                                  : "#3DB461",
                            }}
                          />
                          {room.status === "Under Maintenance"
                            ? "Under Maintenance"
                            : room.status === "Full"
                            ? "Occupied"
                            : "Available"}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ width: "25%" }}>
                        {room.assignedDoctor?.name || "Not Assigned"}
                      </TableCell>

                      <TableCell sx={{ width: "auto", textAlign: "right" }}>
                        <IconButton
                          onClick={(event) => handleMenuOpen(event, room)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={7}
                      sx={{
                        background: "#fff",
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "#f9f9f9",
                        },
                        "& > *": {
                          borderBottom: "unset",
                        },
                      }}
                    >
                      No data found!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {/* Pagination */}
          </TableContainer>
          <Box
            sx={{
              width: "100%",
              position: "sticky",
              bottom: 0,
              backgroundColor: "#fff",
              borderTop: "2px solid #ddd",
              zIndex: 2,
            }}
          >
            <TablePagination
              component="div"
              count={totalRooms || 0}
              page={page} // current page
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage} // items per page
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20, 50, 100]} //  Custom options
              sx={{
                width: "100%",
                backgroundColor: "#fff",
                borderTop: "2px solid #ddd",
                zIndex: 11,
              }}
            />
          </Box>
          {/* Actions Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 2,
              sx: { padding: 1 },
            }}
          >
            <MenuItem onClick={handleEdit}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText sx={{ color: "error.main" }}>Delete</ListItemText>
            </MenuItem>
          </Menu>

          <EditRoomDialog
            open={editDialogOpen}
            onClose={handleEditDialogClose}
            onSave={handleSaveEditedRoom}
            editedRoom={editedRoom}
            setEditedRoom={setEditedRoom}
            errors={errors}
            doctors={doctors}
            wingTypes={wingTypes}
            loading={loading}
          />
        </>
      </div>
    </div>
  );
};
export default AdminRooms;
