// AdminDoctors.jsx
import React, { useEffect, useState } from "react";
import CommonPanel from "../Components/CommonPanel.jsx";
import {
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  Select,
  MenuItem,
} from "@mui/material";
import ayu from "../../receptionist/doctors/doctors.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import addIcon from "../../../assets/plus.svg";
import styles from "../../receptionist/styles.module.scss";
import { useNavigate } from "react-router-dom";
import {
  addDoctor,
  deleteDoctor,
  fetchDoctorsByDepartment,
  getDoctors,
  updateDoctor,
} from "../../../components/State/Admin/Action.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddDoctorDialog from "./components/AddDoctorDialog.jsx";
import EditDoctorDialog from "./components/EditDoctorDialog.jsx";
import DoctorsTable from "./components/DoctorsTable.jsx";
import ActionsMenu from "./components/ActionsMenu.jsx";
import { validateDoctor, truncateText } from "./utils/doctorHelpers.js";
import useMediaQuery from "@mui/material/useMediaQuery";

const AdminDoctors = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const doctors = useSelector((state) => state.admin.doctors) || [];
  const departments = useSelector((state) => state.admin.departments) || [];
  const noOfDoctors = useSelector((state) => state.admin.doctorCount);
  const hospitalName = localStorage.getItem("hospitalName");

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    profile: "s",
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "doctor",
    specialization: "",
    status: "Idle",
    department: "",
    hospitalName,
  });

  const [errors, setErrors] = useState({});

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState({
    profile: "s",
    name: "",
    email: "",
    password: "",
    phone: "",
    specialization: "",
    status: "",
    department: "",
  });

  useEffect(() => {
    props?.setIsSignUpOrLogin?.(false);
    dispatch(getDoctors(page, rowsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedDepartment === "all") {
      dispatch(getDoctors(page, rowsPerPage));
    } else {
      dispatch(fetchDoctorsByDepartment(selectedDepartment, page, rowsPerPage));
    }
  }, [page, rowsPerPage, selectedDepartment, dispatch]);

  const handleChangePage = (_e, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleDepartmentChange = (event) =>
    setSelectedDepartment(event.target.value);

  const departmentOptions = [
    { label: "All Branches", value: "all" },
    ...departments.map((dept) => ({
      label: dept.departmentName,
      value: dept.departmentId,
    })),
  ];

  const handleSubmit = () => {
    const newErrors = validateDoctor(newDoctor);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please correct the errors.", { position: "bottom-right" });
      return;
    }
    dispatch(addDoctor(newDoctor));
    setErrors({});
    setAddDialogOpen(false);
  };

  const handleMenuOpen = (event, doctor) => {
    setAnchorEl(event.currentTarget);
    setSelectedDoctor(doctor);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDoctor(null);
  };

  const handleEdit = () => {
    if (selectedDoctor) {
      setEditedDoctor({
        profile: selectedDoctor.profile,
        name: selectedDoctor.name,
        email: selectedDoctor.email,
        password: selectedDoctor.password,
        phone: selectedDoctor.phone,
        specialization: selectedDoctor.specialization,
        status: selectedDoctor.status,
        department: selectedDoctor.department,
        _id: selectedDoctor._id,
      });
      setEditDialogOpen(true);
    }
    handleMenuClose();
  };

  const handleSaveEditedDoctor = () => {
    const newErrors = validateDoctor(editedDoctor, true);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please correct the errors.", { position: "bottom-right" });
      return;
    }
    dispatch(updateDoctor(editedDoctor._id, editedDoctor));
    setErrors({});
    setEditDialogOpen(false);
  };

  const handleDelete = () => {
    if (selectedDoctor?._id) dispatch(deleteDoctor(selectedDoctor._id));
    handleMenuClose();
  };

  const loading =
    noOfDoctors === null || noOfDoctors === undefined || doctors === undefined;

  const isNarrow = useMediaQuery("(max-width:1024px)");

  return (
    <div style={{ height: "99dvh", overflow: "hidden", background: "#F1F1F1" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          padding: isNarrow ? 8 : 10,
          width: "77%",
          background: "#F1F1F1",
          zIndex: 100,
        }}
      >
        <CommonPanel />
      </div>

      <div style={{ marginTop: isNarrow ? 130 : 145 }}>
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isNarrow ? 10 : 16,
                  flexWrap: "wrap",
                }}
              >
                <span
                  onClick={() => navigate(-1)}
                  style={{
                    transform: "translateY(4px)",
                    color: "black",
                    cursor: "pointer",
                  }}
                >
                  <ArrowBackIosIcon />
                </span>

                <h2 className={ayu.departmentTitle} style={{ margin: 0 }}>
                  Total Doctors:
                </h2>
                <h2
                  className={ayu.departmentTitleDetails}
                  style={{ margin: 0 }}
                >
                  {noOfDoctors}
                </h2>

                <div
                  style={{
                    marginLeft: isNarrow ? 0 : 25,
                    flex: isNarrow ? "1 1 240px" : "0 0 auto",
                  }}
                >
                  <Grid>
                    <Box
                      sx={{
                        width: "100%",
                        background: "#ffffff",
                        outline: "none",
                      }}
                    >
                      <Select
                        value={selectedDepartment}
                        onChange={handleDepartmentChange}
                        displayEmpty
                        size="small"
                        fullWidth
                        sx={{
                          background: "#ffffff",
                          outline: "none",
                          border: "1px solid #9797978F",
                          minWidth: isNarrow ? "auto" : 250,
                        }}
                        MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
                      >
                        {departmentOptions.map((opt) => (
                          <MenuItem
                            key={opt.value}
                            value={opt.value}
                            sx={{
                              height: 40,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {opt.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Grid>
                </div>

                <div style={{ marginLeft: "auto" }}>
                  <Button
                    variant="contained"
                    onClick={() => setAddDialogOpen(true)}
                    sx={{
                      fontSize: isNarrow ? 14 : 17,
                      color: "#ffffff",
                      textTransform: "capitalize",
                      px: isNarrow ? 1.5 : 2.5,
                      py: isNarrow ? 0.45 : 0.6,
                      backgroundColor: "#25307F",
                      boxShadow: "0px 4px 4px 0px #C2C2C240",
                      "&:hover": { background: "#AEC3FF" },
                    }}
                  >
                    <img
                      src={addIcon}
                      className={styles.appointmentBlock__plusIcon}
                      alt="add"
                      style={{
                        width: isNarrow ? 16 : 18,
                        height: isNarrow ? 16 : 18,
                        marginRight: 8,
                      }}
                    />
                    {isNarrow ? "Add" : "Add"}
                  </Button>
                </div>
              </div>
            </Box>

            <AddDoctorDialog
              open={addDialogOpen}
              onClose={() => setAddDialogOpen(false)}
              newDoctor={newDoctor}
              setNewDoctor={setNewDoctor}
              onSubmit={handleSubmit}
              errors={errors}
              departments={departments}
            />

            <DoctorsTable
              doctors={doctors}
              noOfDoctors={noOfDoctors}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              truncateText={truncateText}
              onRowMenuOpen={handleMenuOpen}
            />

            <ActionsMenu
              anchorEl={anchorEl}
              onClose={handleMenuClose}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <EditDoctorDialog
              open={editDialogOpen}
              onClose={() => setEditDialogOpen(false)}
              editedDoctor={editedDoctor}
              setEditedDoctor={setEditedDoctor}
              onSave={handleSaveEditedDoctor}
              errors={errors}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDoctors;
