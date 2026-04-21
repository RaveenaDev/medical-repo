import React, { useEffect, useState } from "react";
import CommonPanel from "../components/CommonPanel.jsx";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ayu from "../doctors/doctors.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "../styles.module.scss";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredRooms } from "../../../components/State/Receptionist/Action.js";
import CircularProgress from "@mui/material/CircularProgress";

const Rooms = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addDialogOpen1, setAddDialogOpen1] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const isTablet = useMediaQuery("(max-width:1080px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rooms = useSelector((state) => state.receptionist.filteredRooms);
  const totalRooms = useSelector(
    (state) => state.receptionist.totalFilteredRooms
  );
  const loading = useSelector(
    (state) => state.receptionist.isLoadingFilteredRooms
  );

  useEffect(() => {
    dispatch(getFilteredRooms(page, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDetails = (room) => {
    setCurrentRoom(room);
    setAddDialogOpen1(true);
  };

  return (
    <div
      style={{
        background: "#f1f1f1",
        height: "99dvh",
        overflow: "hidden",
      }}
    >
      <div>
        <div
          style={{
            position: "fixed",
            top: "0px",
            padding: "10px",
            width: "77%",
            background: " #F1F1F1",
            zIndex: 100,
            width: isTablet ? "90%" : "77%",
              marginLeft : isTablet ? "2rem" : 0,
          }}
        >
          <CommonPanel />
        </div>

        <div style={{ marginTop: "160px" }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <CircularProgress sx={{ color: "#25307F" }} size={58} />
            </Box>
          ) : (
            <>
              <Box>
                <div
                  className={ayu.headerContainer}
                  style={{ justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      className={ayu.backButton}
                      onClick={() => navigate(`/receptionist`)}
                    >
                      <ArrowBackIosIcon />
                    </div>
                    <h2 className={ayu.departmentTitle}>Total Rooms:</h2>
                    <h2 className={ayu.departmentTitleDetails}>{totalRooms}</h2>
                  </div>

                  <Box sx={{ display: "flex", gap: 3 }}>
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
                </div>

                {/* Room Details Dialog */}
                <Dialog
                  open={addDialogOpen1}
                  onClose={() => setAddDialogOpen1(false)}
                  maxWidth="md"
                  fullWidth
                  sx={{
                    "& .MuiDialog-paper": {
                      maxWidth: "65%",
                    },
                  }}
                >
                  <DialogTitle sx={{ fontWeight: "600" }}>
                    Room ({currentRoom?.roomID})
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
                          {/* <TableCell sx={{ fontWeight: "600", width: "30%" }}>
                            Cost
                          </TableCell> */}
                          <TableCell sx={{ fontWeight: "600", width: "30%" }}>
                            Status
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {currentRoom?.beds?.length > 0 ? (
                          currentRoom.beds.map((bed, index) => (
                            <TableRow key={index}>
                              <TableCell>{bed?.bedNumber || "N/A"}</TableCell>
                              {/* <TableCell>{bed?.cost || "N/A"}</TableCell> */}
                              <TableCell>{bed?.status || "N/A"}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              align="center"
                              colSpan={3}
                              sx={{
                                background: "#fff",
                                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                                borderRadius: "8px",
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
              </Box>

              {/* Rooms Table */}
              <TableContainer
                sx={{
                  maxHeight: "70vh",
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
                  <TableHead
                    sx={{
                      position: "sticky",
                      backgroundColor: "#f1f1f1",
                      top: 0,
                      zIndex: 10,
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
                            "&:hover": { backgroundColor: "#f9f9f9" },
                          }}
                          onClick={() => handleOpenDetails(room)}
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
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {room.name}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ width: "25%" }}>
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
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          align="center"
                          sx={{
                            background: "#fff",
                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                          }}
                        >
                          No Rooms found!
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                <TablePagination
                  component="div"
                  count={totalRooms}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 20, 50, 100]}
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderTop: "2px solid #ddd",
                    zIndex: 11,
                  }}
                />
              </TableContainer>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
