import React, { useEffect, useState } from "react";
import ayu from "../../receptionist/patients/patients.module.scss";
import Searchbar from "../../../components/Searchbar/index.jsx";
import Grid from "@mui/material/Grid2";
import Card from "../../../components/Card/index.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Notifications from "../../../components/NotificationFunc/Notification.jsx";
import { Box, Button, MenuItem, Select } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDepartments,
  getBillingRecords,
  getDoctors,
  getPatients,
  getRooms,
  getStaffs,
} from "../../../components/State/Admin/Action.js";

import { Dropdown } from "primereact/dropdown";

const CommonPanel = ({
  setSelectedDate,
  selectedDate,
  setSelectedDepartment,
  selectedDepartment,
}) => {
  const navigate = useNavigate();

  const location = useLocation(); // Get the current route
  const dispatch = useDispatch();

  // Default to today's date if props are not provided
  const [internalSelectedDate, setInternalSelectedDate] = useState(dayjs());

  const handleDateChange = (newValue) => {
    if (setSelectedDate) {
      setSelectedDate(newValue);
    } else {
      setInternalSelectedDate(newValue);
    }
  };

  useEffect(() => {
    dispatch(getPatients());
    dispatch(getDoctors());
    dispatch(getStaffs());
    dispatch(getRooms());
    dispatch(getAllDepartments());
    dispatch(getBillingRecords());
  }, [dispatch]);

  const admin = useSelector((store) => store.admin);

  const noOfDoctors = admin.totalDoctors;
  const doctors = admin.doctors;

  const noOfStaffs = admin.totalStaffs;
  const staffs = admin.staffs;

  const noOfRooms = admin.totalRooms;
  const rooms = admin.rooms;

  const departments = useSelector((state) => state.admin.departments);

  const handleRoomClick = (rooms) => {
    navigate(`/admin/rooms`, { state: { rooms } });
  };
  const handleDocClick = (doctors) => {
    navigate(`/admin/doctors`, { state: { doctors } });
  };
  const handleStaffClick = (staffs) => {
    navigate(`/admin/staffs`, { state: { staffs } });
  };

  // Define the routes where you want to hide the div
  const excludedRoutes = [
    "/admin/doctors",
    "/admin/staffs",
    "/admin/rooms",
    "/admin/requests",
    "/admin/billings",
    "/admin/reception/patients",
  ];

  // Check if the current route is in the excluded routes list
  const shouldHideDiv = excludedRoutes.includes(location.pathname);

  // const [selectedDate, setSelectedDate] = useState(dayjs());

  const shapeStyles = { bgcolor: "#25307f", width: 30, height: 26 };
  const shapeCircleStyles = { borderRadius: "50%" };

  const circle = (
    <Box
      component="span"
      sx={{
        ...shapeStyles,
        ...shapeCircleStyles,
        color: "#ffffff",
        marginTop: "2px",
        paddingTop: "2px",
        paddingBottom: "2px",
        fontSize: "15px",
        paddingLeft: "1px",
      }}
    >
      20
    </Box>
  );
  const handleDepartmentChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDepartment(selectedValue);
  };

  const departmentOptions = [
    { label: "All Branches", value: "all" }, // default option
    ...departments.map((dept) => ({
      label: dept.departmentName,
      value: dept.departmentId,
    })),
  ];
  return (
    <>
      <div className={ayu.patients}>
        <div className={ayu.patientHeader}>
          <Searchbar />
          <Notifications />
        </div>

        <div className={ayu.cardhandling}>
          <h3 className={ayu.heading}>Dashboard Overview</h3>
        </div>

        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
          alignItems="center"
          flexDirection={{ md: "row" }}
          size={12}
          sx={{ margin: "0 0 10px 0" }}
        >
          <Grid size={3}>
            <Card
              title="Total Earnings"
              subtitle="80000"
              handleClickCb={() => navigate(`/admin/earnings`)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#EAA000",
              }}
              title="Total Doctors"
              subtitle={noOfDoctors}
              handleClickCb={() => handleDocClick(doctors)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#2E823B",
              }}
              title="Total Staffs"
              subtitle={noOfStaffs}
              handleClickCb={() => handleStaffClick(staffs)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#66A7B4",
              }}
              title="Total Rooms"
              subtitle={noOfRooms}
              handleClickCb={() => handleRoomClick(rooms)}
            />
          </Grid>
        </Grid>
      </div>

      {!shouldHideDiv && (
        <div>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ md: "row" }}
            size={12}
            // sx={{ margin: "0 0 20px 0" }}
          >
            <Grid size={4} sx={{ display: "flex", alignItems: "center" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                  sx={{
                    backgroundColor: "#FFFFFF",

                    borderRadius: 1,
                    width: 180, // Adjust width here
                    textAlign: "center",
                    boxShadow: "0px 4px 4px 0px #C2C2C240",
                    // padding: "4px", // Reduce padding to make the container smaller
                  }}
                >
                  <DatePicker
                    value={selectedDate || internalSelectedDate}
                    onChange={handleDateChange}
                    format="DD/MM/YYYY" // Set the date format
                    slotProps={{
                      textField: {
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent !important",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent !important",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent !important",
                              boxShadow: "none !important",
                            },
                          },
                          "& .MuiInputBase-input": {
                            fontSize: "14px",
                            padding: "10px",
                            "&:focus": {
                              outline: "none !important",
                            },
                          },
                          "& .MuiIconButton-root": {
                            color: "#666", // Adjust icon color if needed
                            "&:hover": {
                              backgroundColor: "transparent !important",
                            },
                            "&:focus": {
                              outline: "none !important",
                              boxShadow: "none !important",
                            },
                          },
                        },
                      },
                    }}
                  />
                </Box>
              </LocalizationProvider>
            </Grid>
            <Grid size={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={() => navigate(`/admin/billings`)}
                sx={{
                  fontSize: "16px",
                  color: "#878787",
                  textTransform: "capitalize",
                  padding: "0px 8px",
                  backgroundColor: "#fff",
                  marginRight: "22px",
                  boxShadow: "0px 4px 4px 0px #C2C2C240",
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 12C12.1667 12 11.4583 11.6389 10.875 10.9167C10.2917 10.1945 10 9.3175 10 8.28575C10 7.254 10.2917 6.37702 10.875 5.6548C11.4583 4.93257 12.1667 4.57146 13 4.57146C13.8333 4.57146 14.5417 4.93257 15.125 5.6548C15.7083 6.37702 16 7.254 16 8.28575C16 9.3175 15.7083 10.1945 15.125 10.9167C14.5417 11.6389 13.8333 12 13 12ZM6 15.7143C5.45 15.7143 4.97917 15.4719 4.5875 14.9869C4.19583 14.502 4 13.9191 4 13.2381V3.33337C4 2.65242 4.19583 2.06948 4.5875 1.58456C4.97917 1.09964 5.45 0.857178 6 0.857178H20C20.55 0.857178 21.0208 1.09964 21.4125 1.58456C21.8042 2.06948 22 2.65242 22 3.33337V13.2381C22 13.9191 21.8042 14.502 21.4125 14.9869C21.0208 15.4719 20.55 15.7143 20 15.7143H6ZM8 13.2381H18C18 12.5572 18.1958 11.9742 18.5875 11.4893C18.9792 11.0044 19.45 10.7619 20 10.7619V5.80956C19.45 5.80956 18.9792 5.5671 18.5875 5.08218C18.1958 4.59726 18 4.01432 18 3.33337H8C8 4.01432 7.80417 4.59726 7.4125 5.08218C7.02083 5.5671 6.55 5.80956 6 5.80956V10.7619C6.55 10.7619 7.02083 11.0044 7.4125 11.4893C7.80417 11.9742 8 12.5572 8 13.2381ZM19 20.6667H2C1.45 20.6667 0.979167 20.4242 0.5875 19.9393C0.195833 19.4544 0 18.8715 0 18.1905V4.57146H2V18.1905H19V20.6667Z"
                    fill="#25307F"
                  />
                </svg>
                <span
                  style={{
                    marginLeft: "14px",
                    marginRight: "8px",
                    marginTop: "2px",
                  }}
                >
                  Billing
                </span>
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate(`/admin/requests`)}
                sx={{
                  fontSize: "16px",
                  color: "#878787",
                  textTransform: "capitalize",
                  padding: "0px 8px",
                  backgroundColor: "#fff",
                  marginRight: "22px",
                  boxShadow: "0px 4px 4px 0px #C2C2C240",
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                }}
              >
                <div
                  style={{
                    height: "8px",
                    width: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#F14400",
                    position: "absolute",
                    left: "31px",
                    top: "6px",
                  }}
                ></div>
                {circle}
                <span
                  style={{
                    marginLeft: "16px",
                    marginRight: "8px",
                    marginTop: "2px",
                  }}
                >
                  Request
                </span>
              </Button>

              <div
                style={{
                  backgroundColor: "#25307F",
                  color: "#FFFFFF",
                  borderRadius: "5px",
                  boxShadow: "0px 4px 4px 0px #C2C2C240",
                  padding: "4px 8px",
                  width: "fit-content",
                }}
              >
                <Select
                  value={selectedDepartment || "all"}
                  onChange={handleDepartmentChange}
                  displayEmpty
                  size="small"
                  sx={{
                    background: "transparent", // keep outer div background
                    color: "#FFFFFF",
                    width: "9.5rem",
                    height: "2.4rem",
                    ".MuiSelect-select": {
                      padding: "6px 14px",
                      display: "flex",

                      gap: "8px",
                    },
                    ".MuiOutlinedInput-notchedOutline": {
                      border: "none", // remove border
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    svg: { color: "#FFFFFF" }, // arrow icon color
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#FFFFFF",
                        color: "#000000",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      },
                    },
                  }}
                >
                  {departmentOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{
                        padding: "8px 8px",
                        borderBottom: "1px solid #ccc",
                        "&:hover": {
                          backgroundColor: "#25307F",
                          color: "#FFFFFF",
                        },
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};
export default CommonPanel;
