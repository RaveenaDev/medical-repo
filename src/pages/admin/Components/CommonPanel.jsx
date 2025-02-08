import React, { useState } from "react";
import ayu from "../../receptionist/patients/patients.module.scss";
import Searchbar from "../../../components/Searchbar/index.jsx";
import Grid from "@mui/material/Grid2";
import Card from "../../../components/Card/index.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Notifications from "../../../components/NotificationFunc/Notification.jsx";
import styles from "../../receptionist/styles.module.scss";
import { Box, Button } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const CommonPanel = () => {
  const navigate = useNavigate();

  const location = useLocation(); // Get the current route

  // Define the routes where you want to hide the div
  const excludedRoutes = [
    "/admin/doctors",
    "/admin/staffs",
    "/admin/rooms",
    "/admin/requests",
  ];

  // Check if the current route is in the excluded routes list
  const shouldHideDiv = excludedRoutes.includes(location.pathname);

  const [age, setAge] = React.useState("");

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const shapeStyles = { bgcolor: "#25307f", width: 30, height: 26 };
  const shapeCircleStyles = { borderRadius: "50%" };

  const circle = (
    <Box
      component="span"
      sx={{
        ...shapeStyles,
        ...shapeCircleStyles,
        color: "white",
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
          sx={{ margin: "0 0 20px 0" }}
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
              subtitle="8"
              handleClickCb={() => navigate(`/admin/doctors`)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#2E823B",
              }}
              title="Total Staffs"
              subtitle="250"
              handleClickCb={() => navigate(`/admin/staffs`)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#66A7B4",
              }}
              title="Total Rooms"
              subtitle="80"
              handleClickCb={() => navigate(`/admin/rooms`)}
            />
          </Grid>
        </Grid>
      </div>

      {!shouldHideDiv && (
        <div className={styles.appointmentBlock}>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ md: "row" }}
            size={12}
            sx={{ margin: "0 0 20px 0" }}
          >
            <Grid size={4} sx={{ display: "flex", alignItems: "center" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    boxShadow: 3,
                    borderRadius: 1,
                    width: 180, // Adjust width here
                    textAlign: "center",
                    // padding: "4px", // Reduce padding to make the container smaller
                  }}
                >
                  <DatePicker
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    sx={{
                      width: "100%", // Ensure the date picker takes up 100% of the container's width
                      fontSize: "24px", // Adjust font size inside the date picker
                      input: {
                        fontSize: "14px", // Adjust input field font size if needed
                        padding: "10px", // Adjust input field padding to make it smaller
                      },
                    }}
                  />
                </Box>
              </LocalizationProvider>
            </Grid>
            <Grid size={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{
                  fontSize: "16px",
                  color: "#878787",
                  textTransform: "capitalize",
                  padding: "0px 8px",
                  backgroundColor: "#fff",
                  marginRight: "22px",
                }}
              >
                <LocalAtmIcon sx={{ color: "#25307f" }} />{" "}
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
                onClick={() => navigate(`/admin/requests`)}
                variant="contained"
                sx={{
                  fontSize: "16px",
                  color: "#878787",
                  textTransform: "capitalize",
                  padding: "0px 8px",
                  backgroundColor: "#fff",
                  marginRight: "22px",
                }}
              >
                <div
                  style={{
                    height: "8px",
                    width: "8px",
                    borderRadius: "50%",
                    backgroundColor: "red",
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

              <FormControl
                sx={{ minWidth: 150, position: "relative" }}
                size="small"
              >
                <InputLabel
                  id="demo-select-small-label"
                  sx={{ color: "white", marginLeft: "22px" }} // White label text
                >
                  All Branches
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={age}
                  label="All Branches is what it wants"
                  onChange={handleChange}
                  IconComponent={null} // Disable default icon
                  sx={{
                    backgroundColor: "#25307f", // Blue background
                    color: "white", // White text
                    paddingLeft: "32px", // Add padding for custom arrow on the left
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                {/* Custom Arrow Icon */}
                <KeyboardArrowDownIcon
                  sx={{
                    position: "absolute",
                    left: 8, // Position the arrow on the left
                    top: "50%", // Center vertically
                    transform: "translateY(-50%)",
                    pointerEvents: "auto", // Ensure it's clickable
                    color: "white", // White arrow color
                    cursor: "pointer", // Show pointer cursor for interactivity
                  }}
                  onClick={(event) => {
                    // Stop propagation to ensure Select handles the click
                    event.stopPropagation();
                    // Trigger the dropdown programmatically
                    const selectElement =
                      document.getElementById("demo-select-small");
                    if (selectElement) {
                      selectElement.dispatchEvent(
                        new MouseEvent("mousedown", { bubbles: true })
                      );
                    }
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};
export default CommonPanel;
