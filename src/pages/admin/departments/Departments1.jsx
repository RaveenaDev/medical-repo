import React, { useEffect, useState } from "react";
import ayu from "./departments.module.scss";
import DepartCard from "./DepartCard.jsx";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addDepartment,
  getAllDepartments,
  getDoctors,
  getStaffs,
} from "../../../components/State/Admin/Action.js";
import CommonPanel from "../Components/CommonPanel.jsx";
import addAppointments from "../../../assets/plus.svg";
import styles from "../../receptionist/styles.module.scss";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { TablePagination } from "@mui/material";
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const Departments1 = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isNewHead, setIsNewHead] = useState(false);
  const [newHead, setNewHead] = useState({
    name: "",
    email: "",
    phone: "",
    password: "changeme",
  });
  const handleNewHeadChange = (e) => {
    const { name, value } = e.target;
    setNewHead((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const handleBack = () => {
    navigate("/admin");
  };

  const [department, setDepartment] = useState({
    name: "",
    head: "",
    doctors: [],
    nurses: [],
    // services: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "head") {
      // prevent parsing the special "new" value
      if (value === "new") {
        setIsNewHead(true);
        return;
      }

      setDepartment((prev) => ({
        ...prev,
        head: value ? JSON.parse(value) : "",
      }));
    } else {
      setDepartment((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleMultipleChange = (event) => {
    const {
      target: { name, value },
    } = event;

    setDepartment((prevDepartment) => ({
      ...prevDepartment,
      [name]: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDepartments());
    dispatch(getDoctors());
    dispatch(getStaffs());
  }, [dispatch]);

  const admin = useSelector((store) => store.admin);

  const allDepartments = admin.departments;
  const doctors = admin.doctors;

  const staffs = admin.staffs;

  // console.log(allDepartments)

  const handleAdd = () => {
    const payload = {
      ...department,
      head: department.head, // will either be selected doctor or newHead object
    };

    dispatch(addDepartment(payload));
    setDepartment({ name: "", head: "", doctors: [], nurses: [] });
    handleClose();
  };

  const loading = useSelector((state) => state.admin.isLoading);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6); // Show 6 cards per page (adjust as you want)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const paginatedDepartments = allDepartments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div
      style={{
        background: "#f1f1f1",
        height: "110vh", // Make the entire div take up the full viewport height
        overflow: "auto", // Prevent scrolling on the rest of the page
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "0px",
          padding: "10px ",
          width: "77%",
          background: " #F1F1F1",
          zIndex: 100,
        }}
      >
        <CommonPanel />
      </div>
      <div style={{ marginTop: "20vh" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh", // or full height you need
            }}
          >
            <CircularProgress sx={{ color: "#25307F" }} size={58} />
          </Box>
        ) : (
          <>
            <div
              className={ayu.headerContainer}
              style={{ justifyContent: "space-between", marginBottom: "0" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <button className={ayu.backButton} onClick={handleBack}>
                  <ArrowBackIosIcon />
                </button>
                <h2 className={ayu.departmentTitle}>Department</h2>
              </div>
              <div>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  sx={{
                    fontSize: "16px",
                    color: "#ffffff",
                    textTransform: "capitalize",
                    padding: {
                      xs: "0px 8px",
                      sm: "0px 10px",
                      md: "4px 10px",
                    }, // Adjust padding
                    backgroundColor: "#25307F",
                    boxShadow: "0px 4px 4px 0px #C2C2C240",
                    "&:hover": {
                      background: "#AEC3FF",
                    },
                    "&:active": {
                      backgroundColor: "#181F52",
                      outline: "none",
                      boxShadow: "none",
                    },
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                  }}
                >
                  <img
                    src={addAppointments}
                    className={styles.appointmentBlock__plusIcon}
                  />
                  New Department
                </Button>

                {/* Department Modal */}
                <Modal open={open} onClose={handleClose}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "47%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      width: 510,
                      p: 2,
                      // borderRadius: 2,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #25307F",
                        padding: "5px 8px 1rem 8px",
                      }}
                    >
                      <h4 style={{ color: "#000000", fontWeight: 500 }}>
                        Add New Department
                      </h4>
                      <IconButton
                        sx={{
                          padding: 0,
                          "&:focus": {
                            outline: "none",
                            boxShadow: "none",
                          },
                          color: "black",
                        }}
                        onClick={handleClose}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>

                    <div style={{ display: "inline-block" }}>
                      <TextField
                        label="Department Name"
                        name="name"
                        value={department.name}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        sx={{
                          m: 1,
                          minWidth: 200,
                          marginTop: 3,
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#25307F" },
                            "&:hover fieldset": { borderColor: "#25307F" },
                            "&.Mui-focused fieldset": {
                              borderColor: "#25307F",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "#25307F",
                            "&.Mui-focused": {
                              color: "#25307F",
                            },
                          },
                          "& .MuiInputBase-input": {
                            color: "#25307F",
                          },
                        }}
                      />

                      <FormControl
                        size="small"
                        sx={{ width: "18rem", marginTop: 2, marginLeft: 1 }}
                      >
                        <InputLabel
                          id="department-head-label"
                          sx={{
                            "&.Mui-focused": {
                              color: "#747474", // Keep the color same when focused
                            },
                          }}
                        >
                          Select Department Head
                        </InputLabel>
                        <Select
                          labelId="department-head-label"
                          name="head"
                          value={
                            typeof department.head === "string"
                              ? department.head
                              : department.head?.id
                              ? JSON.stringify(department.head)
                              : "new-head" // fallback for newly added head
                          }
                          label="Select Department Head"
                          onChange={handleChange}
                          style={{ width: "100%" }}
                          IconComponent={KeyboardArrowDownIcon}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 200, // Fixed height
                                overflowY: "auto",
                              },
                              sx: {
                                "&::-webkit-scrollbar": {
                                  width: "4px",
                                },
                                "&::-webkit-scrollbar-track": {
                                  backgroundColor: "#f1f1f1",
                                },
                                "&::-webkit-scrollbar-thumb": {
                                  backgroundColor: "#25307F",
                                  borderRadius: "4px",
                                },
                              },
                            },
                          }}
                          sx={{
                            backgroundColor: "#F7F7F7",
                            borderRadius: 0,
                            "& .MuiSelect-icon": {
                              color: "#25307F",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                            },
                          }}
                        >
                          {doctors.map((doctor, index) => (
                            <MenuItem
                              key={index}
                              value={JSON.stringify({
                                id: doctor._id,
                                name: doctor.name,
                                email: doctor?.email,
                              })}
                            >
                              {doctor.name}
                            </MenuItem>
                          ))}
                          {department.head && !department.head.id && (
                            <MenuItem
                              key="new-head"
                              value="new-head"
                              sx={{ fontWeight: 500, color: "#25307F" }}
                            >
                              {department.head.name || "New Department Head"}
                            </MenuItem>
                          )}
                          <MenuItem
                            onClick={() => setIsNewHead(true)}
                            sx={{ color: "#25307F", fontWeight: 500 }}
                          >
                            + Add New Head
                          </MenuItem>
                        </Select>
                        <Modal
                          open={isNewHead}
                          onClose={() => setIsNewHead(false)}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              bgcolor: "background.paper",
                              boxShadow: 24,
                              p: 3,
                              width: 400,
                            }}
                          >
                            <h4 style={{ marginBottom: "1rem" }}>
                              Add New Department Head
                            </h4>

                            <TextField
                              fullWidth
                              label="Name"
                              name="name"
                              value={newHead.name}
                              onChange={handleNewHeadChange}
                              size="small"
                              sx={{ mb: 2 }}
                            />

                            <TextField
                              fullWidth
                              label="Email"
                              name="email"
                              value={newHead.email}
                              onChange={handleNewHeadChange}
                              size="small"
                              sx={{ mb: 2 }}
                            />

                            <TextField
                              fullWidth
                              label="Phone"
                              name="phone"
                              value={newHead.phone}
                              onChange={handleNewHeadChange}
                              size="small"
                              sx={{ mb: 2 }}
                            />

                            <TextField
                              fullWidth
                              label="Password"
                              name="password"
                              value={newHead.password}
                              onChange={handleNewHeadChange}
                              size="small"
                              sx={{ mb: 3 }}
                            />

                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "#25307F",
                                textTransform: "none",
                                width: "100%",
                              }}
                              onClick={() => {
                                setDepartment((prev) => ({
                                  ...prev,
                                  head: newHead,
                                }));
                                setIsNewHead(false);
                              }}
                            >
                              Save Head
                            </Button>
                          </Box>
                        </Modal>
                      </FormControl>

                      <FormControl
                        size="small"
                        sx={{ m: 1, width: "30rem", marginTop: 2.4 }}
                      >
                        <InputLabel
                          id="demo-multiple-name-label"
                          sx={{
                            "&.Mui-focused": {
                              color: "#747474", // Keep the color same when focused
                            },
                          }}
                        >
                          Select Doctors
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          name="doctors"
                          multiple
                          value={department.doctors}
                          onChange={handleMultipleChange}
                          input={<OutlinedInput label="Select Doctors" />}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 200, // Fixed height
                                overflowY: "auto",
                              },
                              sx: {
                                "&::-webkit-scrollbar": {
                                  width: "4px",
                                },
                                "&::-webkit-scrollbar-track": {
                                  backgroundColor: "#f1f1f1",
                                },
                                "&::-webkit-scrollbar-thumb": {
                                  backgroundColor: "#25307F",
                                  borderRadius: "4px",
                                },
                              },
                            },
                          }}
                          IconComponent={KeyboardArrowDownIcon}
                          sx={{
                            backgroundColor: "#F7F7F7",
                            borderRadius: 0,
                            "& .MuiSelect-icon": {
                              color: "#25307F", // Change the color of the arrow icon
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none", // Remove border
                            },
                          }}
                        >
                          {doctors
                            .filter((doctor) => {
                              // Only filter out the department head if it's set as an object
                              if (department.head && department.head.id) {
                                return doctor._id !== department.head.id; // Filter out the department head from the doctor list
                              }
                              return true; // If no valid head, don't filter out any doctors
                            })
                            .map((doctor, index) => (
                              <MenuItem
                                key={index}
                                value={doctor._id}
                                style={getStyles(
                                  doctor.name,
                                  department.doctors,
                                  theme
                                )}
                              >
                                {doctor.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>

                      <FormControl
                        size="small"
                        sx={{ m: 1, width: "30rem", marginTop: 2 }}
                      >
                        <InputLabel
                          id="demo-multiple-name-label"
                          sx={{
                            "&.Mui-focused": {
                              color: "#747474", // Keep the color same when focused
                            },
                          }}
                        >
                          List of Nurses/ Support Staff
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          name="nurses"
                          multiple
                          value={department.nurses}
                          onChange={handleMultipleChange}
                          input={
                            <OutlinedInput label="List of Nurses/ Support Staff" />
                          }
                          // MenuProps={MenuProps}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 200, // Fixed height
                                overflowY: "auto",
                              },
                              sx: {
                                "&::-webkit-scrollbar": {
                                  width: "4px",
                                },
                                "&::-webkit-scrollbar-track": {
                                  backgroundColor: "#f1f1f1",
                                },
                                "&::-webkit-scrollbar-thumb": {
                                  backgroundColor: "#25307F",
                                  borderRadius: "4px",
                                },
                              },
                            },
                          }}
                          IconComponent={KeyboardArrowDownIcon}
                          sx={{
                            backgroundColor: "#F7F7F7",
                            borderRadius: 0,
                            "& .MuiSelect-icon": {
                              color: "#25307F", // Change the color of the arrow icon
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none", // Remove border
                            },
                          }}
                        >
                          {staffs.map((name) => (
                            <MenuItem
                              key={name._id}
                              value={name.name}
                              style={getStyles(
                                name.name,
                                department.doctors,
                                theme
                              )}
                            >
                              {name.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "10%",
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={handleAdd}
                          sx={{
                            backgroundColor: "#25307F",
                            textTransform: "none", // Prevents uppercase transformation
                            borderRadius: "2px",
                            padding: "6px 4rem",
                            marginLeft: "4px",
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>

            {/* Horizontal line */}
            <hr style={{ border: "1px solid #d3d3d3", margin: "20px 0" }} />

            {/* Cards */}

            <div className={ayu.superCardContainer}>
              {paginatedDepartments.map((department, index) => (
                <DepartCard key={index} department={department} index={index} />
              ))}
            </div>
            <TablePagination
              component="div"
              count={allDepartments.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[6, 12, 24, 60, 120]}
              sx={{
                width: "100%",
                backgroundColor: "#fff",
                borderTop: "2px solid #ddd",
                zIndex: 11,
                marginTop: 2,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default Departments1;
