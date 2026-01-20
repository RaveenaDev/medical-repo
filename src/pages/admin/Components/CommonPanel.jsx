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
  getGraphData,
  getPatients,
  getRooms,
  getStaffs,
} from "../../../components/State/Admin/Action.js";
import shreyStyles from "./CommonPanel.module.scss";
import { Dropdown } from "primereact/dropdown";
// ADD to existing imports:
import { CalendarToday } from "@mui/icons-material";

const CommonPanel = ({
  setSelectedDate,
  selectedDate,
  setSelectedDepartment,
  selectedDepartment,
}) => {
  const navigate = useNavigate();

  const location = useLocation(); // Get the current route
  const dispatch = useDispatch();

  const [department, setDepartment] = useState("");

  // Default to today's date if props are not provided
  const [internalSelectedDate, setInternalSelectedDate] = useState(dayjs());

  const handleDateChange = (event) => {
    const newDate = dayjs(event.target.value);
    if (setSelectedDate) {
      setSelectedDate(newDate);
    } else {
      setInternalSelectedDate(newDate);
    }
  };

  // ADD after existing state declarations:
  const currentSelectedDate = selectedDate || internalSelectedDate;

  useEffect(() => {
    dispatch(getPatients());
    dispatch(getDoctors());
    dispatch(getStaffs());
    dispatch(getRooms());
    dispatch(getAllDepartments());
    dispatch(getBillingRecords());
    dispatch(getGraphData());
  }, [dispatch]);

  const admin = useSelector((store) => store.admin);

  const totalEarnings = admin.totalEarnings;

  const noOfDoctors = admin.totalDoctors;
  const doctors = admin.doctors;

  const noOfStaffs = admin.staffCount;
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
    "/admin/departments",
    "/admin/reception",
    "/admin/expenses",
    // "/admin/reception/appointments",
  ];

  // Check if the current route is in the excluded routes list
  const shouldHideDiv = excludedRoutes.includes(location.pathname);

  // const [selectedDate, setSelectedDate] = useState(dayjs());

  const shapeStyles = { bgcolor: "#25307f", width: 30, height: 26 };
  const shapeCircleStyles = { borderRadius: "50%" };
  const isActive = (path) => location.pathname.startsWith(path);

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
    setDepartment(selectedValue);
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
        {/*<div className={ayu.patientHeader}>*/}
        {/*  <Searchbar />*/}
        {/*  <Notifications />*/}
        {/*</div>*/}

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
          <Grid
            size={3}
            sx={{
              borderBottom: isActive("/admin/earnings")
                ? "3px solid #25307F"
                : "none",
            }}
          >
            <Card
              title="Total Earnings"
              subtitle={totalEarnings ?? 0}
              handleClickCb={() => navigate(`/admin/earnings`)}
            />
          </Grid>
          <Grid
            size={3}
            sx={{
              borderBottom: isActive("/admin/doctors")
                ? "3px solid #25307F"
                : "none",
            }}
          >
            <Card
              customStyle={{
                backgroundColor: "#EAA000",
              }}
              title="Total Doctors"
              subtitle={noOfDoctors ?? 0}
              handleClickCb={() => handleDocClick(doctors)}
            />
          </Grid>
          <Grid
            size={3}
            sx={{
              borderBottom: isActive("/admin/staffs")
                ? "3px solid #25307F"
                : "none",
            }}
          >
            <Card
              customStyle={{
                backgroundColor: "#2E823B",
              }}
              title="Total Staffs"
              subtitle={noOfStaffs ?? 0}
              handleClickCb={() => handleStaffClick(staffs)}
            />
          </Grid>
          <Grid
            size={3}
            sx={{
              borderBottom: isActive("/admin/rooms")
                ? "3px solid #25307F"
                : "none",
            }}
          >
            <Card
              customStyle={{
                backgroundColor: "#66A7B4",
              }}
              title="Total Rooms"
              subtitle={noOfRooms ?? 0}
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
            // sx={{ margin: "0 0 20px 0" }}
          >
            <Grid size={3}>
              <div className={shreyStyles.todayRow}>
                <div className={shreyStyles.text}>
                  <span className={shreyStyles.label}>
                    {currentSelectedDate.format("YYYY-MM-DD") ===
                    dayjs().format("YYYY-MM-DD")
                      ? "Today"
                      : "Selected Date"}
                  </span>
                  <span className={shreyStyles.date}>
                    {currentSelectedDate.format("DD-MM-YYYY")}
                  </span>
                </div>
                <div className={shreyStyles.calendarWrapperIn}>
                  <label htmlFor="commonPanelDatePicker">
                    <CalendarToday className={shreyStyles.calendarIcon} />
                  </label>
                  <input
                    type="date"
                    id="commonPanelDatePicker"
                    value={currentSelectedDate.format("YYYY-MM-DD")}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
            </Grid>

            <Grid size={9} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={() => navigate(`/admin/billings`)}
                sx={{
                  fontSize: "max(1vw, 12px)",
                  color: "#878787",
                  textTransform: "capitalize",
                  padding: "8px 16px",
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
              {/* <Button
                variant="contained"
                onClick={() => navigate(`/admin/requests`)}
                sx={{
                  fontSize: "max(1vw, 12px)",
                  color: "#878787",
                  textTransform: "capitalize",
                  padding: "8px 12px",
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
              </Button> */}

              {/* <div
                style={{
                  backgroundColor: "#25307F",
                  color: "#FFFFFF",
                  borderRadius: "5px",
                  boxShadow: "0px 4px 4px 0px #C2C2C240",
                  padding: "0 8px",
                  width: "fit-content",
                }}
              >
                <Select
                  value={department || "all"}
                  onChange={handleDepartmentChange}
                  displayEmpty
                  size="small"
                  sx={{
                    background: "transparent", // keep outer div background
                    color: "#FFFFFF",
                    fontSize: "max(1vw, 12px)",
                    width: "9.2rem",
                    height: "2.4rem",
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
                        maxHeight: "200px", // fixed height
                        overflowY: "auto", // scrollable when content overflows
                      },
                    },
                    MenuListProps: {
                      sx: {
                        paddingTop: 0,
                        paddingBottom: 0,
                        "& .MuiMenuItem-root.Mui-selected:focus, & .MuiMenuItem-root.Mui-selected:hover":
                          {
                            backgroundColor: "rgba(0, 0, 255, 0.1)", // soft blue background
                            color: "#25307F", // blue text color
                          },
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
                        margin: 0,
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
              </div> */}
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};
export default CommonPanel;
