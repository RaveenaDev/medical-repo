import React, { useEffect, useState } from "react";
import ayu from "../receptionist/patients/patients.module.scss";
import CommonPanel from "./Components/CommonPanel.jsx";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, capitalize, Grid, MenuItem, Select } from "@mui/material";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DonutChart from "./Components/DonutChart.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdmissionRequestsToApprove,
  getAppointmentData,
} from "../../components/State/Admin/Action.js";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AdmissionRequests from "./Components/admissionRequests/AdmissionRequests.jsx";
import CircularProgress from "@mui/material/CircularProgress";

function Admin(props) {
  const [selectedFilter, setSelectedFilter] = useState("weekly"); // Keep track of selected option
  const filterOptions = ["monthly", "yearly", "weekly"]; // Static options
  // Initial state where all bars are visible
  const [visibleBars, setVisibleBars] = useState({
    appointments: true,
    completed: true,
    canceled: true,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
    // dispatch(getAppointmentCounts());
    dispatch(getAdmissionRequestsToApprove());
    dispatch(getAppointmentData(selectedFilter));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAppointmentData(selectedFilter));
  }, [dispatch, selectedFilter]);
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const appointmentData =
    useSelector((state) => state.admin.appointmentCount) || {}; // Default to empty object
  // const yearlyData = appointmentData?.yearlyData || {}; // Ensure it's an object
  // const data = yearlyData?.[2025]?.months || []; // Ensure it's an array
  // const weeklyData = appointmentData?.Weekly?.daily || {}; // Ensure it's an object
  // console.log("DATA:", appointmentData);
  const isLoadingAppointmentCount = useSelector(
    (state) => state.admin.isLoadingAppointmentCount
  );

  const data = appointmentData.data;

  const newData = data;

  // console.log(newData);
  // useEffect(() => {
  //   if (selectedFilter === "Monthly") {
  //     setNewData(
  //       data.map((dat) => ({
  //         ...dat, // Spread existing properties
  //         name: dat.name.slice(0, 3), // Modify name field
  //       }))
  //     );
  //   }
  //   if (selectedFilter === "Weekly") {
  //     // console.log("Selected Filter:", selectedFilter);
  //     setNewData(
  //       weeklyData.map((dat) => ({
  //         ...dat, // Spread existing properties
  //         name: dat.name.slice(0, 3), // Modify name field
  //       }))
  //     );
  //   }
  //   if (selectedFilter === "Yearly") {
  //     // Transform yearlyData into an array for the graph
  //     const yearlyGraphData = Object.entries(yearlyData).map(
  //       ([year, stats]) => ({
  //         name: year, // Using the year as the name, can modify if needed
  //         ...stats, // Spread in the metrics (cancelled, completed, total)
  //       })
  //     );

  //     // Optional: sort the data if necessary
  //     yearlyGraphData.sort((a, b) => +a.name - +b.name);

  //     setNewData(yearlyGraphData);
  //   }
  // }, [appointmentData, selectedFilter, selectedDepartment, dispatch]);

  // useEffect(() => {
  //   if (selectedDepartment === "all") {
  //     // If "All Branches" is selected, show all doctors
  //     dispatch(getAppointmentCounts()); // Fetch all doctors
  //   } else {
  //     // console.log("Selected Department:", selectedDepartment);
  //     dispatch(getAppointmentCounts(selectedDepartment)); // Fetch all doctors
  //   }
  // }, [selectedDepartment, dispatch]);

  // console.log(newData);

  const areaData = [
    {
      name: "Jan",
      uv: 8000,
      pv: 7400,
      amt: 2800,
      ayu: 2200,
    },
    {
      name: "Feb",
      uv: 8000,
      pv: 6398,
      amt: 5810,
      ayu: 2100,
    },
    {
      name: "Mar",
      uv: 9000,
      pv: 7800,
      amt: 4290,
      ayu: 2400,
    },
    {
      name: "Apr",
      uv: 8780,
      pv: 7908,
      amt: 4000,
      ayu: 1200,
    },
    {
      name: "May",
      uv: 7890,
      pv: 6800,
      amt: 4181,
      ayu: 3200,
    },
    {
      name: "Jun",
      uv: 8390,
      pv: 6800,
      amt: 5000,
      ayu: 2600,
    },
    {
      name: "Jul",
      uv: 8490,
      pv: 7300,
      amt: 4000,
      ayu: 2500,
    },
    {
      name: "Aug",
      uv: 9490,
      pv: 6300,
      amt: 4100,
      ayu: 2300,
    },
    {
      name: "Sep",
      uv: 8490,
      pv: 6300,
      amt: 3700,
      ayu: 2100,
    },
    {
      name: "Oct",
      uv: 7490,
      pv: 6300,
      amt: 3100,
      ayu: 1800,
    },
    {
      name: "Nov",
      uv: 8490,
      pv: 5300,
      amt: 2100,
      ayu: 1200,
    },
    {
      name: "Dec",
      uv: 8490,
      pv: 5300,
      amt: 4100,
      ayu: 3200,
    },
  ];

  const navigate = useNavigate();

  const handleBarToggle = (bar) => {
    // Set only the clicked bar to true, and the others to false
    setVisibleBars({
      appointments: bar === "appointments",
      completed: bar === "completed",
      canceled: bar === "canceled",
    });
  };

  // Reset all bars to visible when "Appointment Statistics" is clicked
  const handleResetBars = () => {
    setVisibleBars({
      appointments: true,
      completed: true,
      canceled: true,
    });
  };
  const [activeModal, setActiveModal] = useState(null);
  const openAdmitNewPatient = () => setActiveModal("admitNewPatient");
  const closeModal = () => setActiveModal(null);

  const requestsToApprove = useSelector(
    (state) => state.admin.requestsToApprove
  );
  // console.log("Requests to Approve:", requestsToApprove);
  const filteredRequests = requestsToApprove.filter(
    (req) =>
      (req.sendTo === "Both" || req.sendTo === "Admin") &&
      req.approval?.admin?.approved === false
  );
  console.log("Filtered Requests:", filteredRequests);

  return (
    <div
      style={{
        background: "#F1F1F1",
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
        <div className={ayu.patients} style={{ position: "relative" }}>
          <CommonPanel
            setSelectedDepartment={setSelectedDepartment}
            selectedDepartment={selectedDepartment}
          />

          <Button
            variant="contained"
            sx={{
              fontSize: "max(1vw, 10px)",
              width: "15vw",
              color: "#25307F",
              fontWeight: 500,
              textTransform: "capitalize",
              padding: "7px 8px",
              backgroundColor: "#fff",
              marginLeft: "16px",
              position: "absolute",
              left: "11.8rem", // % mai isliye nhi di because ye alag file mai hai toh iski position fixed honi jaruri hai during responsiveness
              top: "7.1rem",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
              boxShadow: "0px 4px 4px 0px #C2C2C240",
            }}
            onClick={openAdmitNewPatient}
          >
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#3DB461",
                marginRight: "4px",
              }}
            ></span>
            {filteredRequests.length} Addmission Requests
            <span style={{ transform: "translateY(4px)" }}>
              <KeyboardArrowRightIcon />
            </span>
          </Button>
          <>
            {/* Backdrop Overlay */}
            <div
              style={{
                display: activeModal === "admitNewPatient" ? "block" : "none",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.02)",
                zIndex: 50,
              }}
              onClick={closeModal}
            />

            {/* Modal Panel */}
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                height: "100vh",
                width: "38vw",
                background: "#fff",
                zIndex: 60,
                boxShadow: "-4px 0 24px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease-in-out",
                transform:
                  activeModal === "admitNewPatient"
                    ? "translateX(0)"
                    : "translateX(100%)",
              }}
              onClick={(e) => e.stopPropagation()} // ✅ Prevent click from closing modal
            >
              <AdmissionRequests
                onClose={closeModal}
                requests={filteredRequests}
              />
            </div>
          </>
        </div>
      </div>
      <div
        style={{
          marginTop: "200px",
          background: "#F1F1F1",
          maxHeight: "70vh", // Adjust this to fit your layout needs
          overflowY: "auto",
        }}
      >
        {/* Main Grid container */}
        <Grid container spacing={2}>
          {/* Top grid (one large block) */}
          <Grid item xs={12}>
            <Box
              sx={{
                width: "95%",
                backgroundColor: "#469983",
                // px: 3,
                paddingLeft: 1,
                marginLeft: 1,
                paddingRight: 4.5,
                py: 2,
                borderRadius: "0.4rem",
              }}
            >
              <Box display="flex" style={{ justifyContent: "space-between" }}>
                <div
                  style={{
                    paddingTop: "0.4rem",
                    marginLeft: "1.8rem",
                    marginBottom: "1.5rem",
                    cursor: "pointer",
                  }}
                  onClick={handleResetBars} // Clicking on Appointment Statistics resets the bars
                >
                  <h4 style={{ fontWeight: 400, color: "#fff" }}>
                    Appointment Statistics
                  </h4>
                </div>
                <Box sx={{ display: "flex", gap: 3, marginTop: "-20px" }}>
                  {" "}
                  {/* Adjust gap for spacing */}
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleBarToggle("appointments")}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: "#ACDDE7",
                      }}
                    />
                    <p style={{ color: "#fff" }}>Appointments</p>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleBarToggle("completed")}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: "#cbefd6",
                      }}
                    />
                    <p style={{ color: "#fff" }}>Completed</p>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleBarToggle("canceled")}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: "#EAA000",
                      }}
                    />
                    <p style={{ color: "#fff" }}>Canceled</p>
                  </Box>
                </Box>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginBottom: "4px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "0.2rem",
                      width: "130px", // Fixed width to prevent size changes
                    }}
                  >
                    <Select
                      size="small"
                      value={selectedFilter} // Use selected value
                      onChange={(e) => setSelectedFilter(e.target.value)} // Update selected value
                      style={{ width: "100%" }} // Ensure dropdown fills the container
                      IconComponent={KeyboardArrowDownIcon}
                      sx={{
                        paddingX: 1,
                        height: "35px",
                        "& .MuiSelect-icon": {
                          color: "#25307F", // Change the color of the arrow icon
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none", // Remove the border
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "none", // Remove border on hover
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "none", // Remove border when focused
                        },
                        "& .MuiSelect-select": {
                          textTransform: "capitalize",
                        },
                      }}
                    >
                      {filterOptions.map((option) => (
                        <MenuItem
                          key={option}
                          value={option}
                          sx={{
                            textTransform: "capitalize",
                          }}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </Box>

              {isLoadingAppointmentCount ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "44vh", // or full height you need
                    marginTop: "-3vh",
                  }}
                >
                  <CircularProgress sx={{ color: "#ffff" }} size={50} />
                </Box>
              ) : (
                <Box>
                  {/* Content for the top grid */}
                  <ResponsiveContainer width="100%" height={290}>
                    <BarChart
                      barGap={4} // Adjust space between bars
                      width={500}
                      height={300}
                      data={newData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey={
                          selectedFilter === "yearly"
                            ? "name"
                            : selectedFilter === "weekly"
                            ? "dayName"
                            : "day"
                        }
                        tick={{ fill: "#fff", fontSize: 12 }}
                        tickLine={false} // Removes the dash/tick marks from Y-axis
                        tickMargin={10}
                        axisLine={{ stroke: "#fff" }}
                      />
                      <YAxis
                        tick={{ fill: "#fff", fontSize: 12 }}
                        axisLine={false} // Removes the Y-axis line
                        tickMargin={10} // Adds spacing between the Y-axis ticks and bars
                        dx={-5} // Moves the Y-axis labels slightly to the left for more spacing
                        tickLine={false} // Removes the dash/tick marks from Y-axis
                      />
                      {/* Customize the Tooltip */}
                      <Tooltip
                        cursor={{ fill: "transparent" }}
                        contentStyle={{
                          color: "#000",
                          borderRadius: "5px", // Optional: for rounded corners
                          padding: "10px", // Optional: for more spacing inside the tooltip
                        }}
                      />
                      {/* Remove the Legend for clarity */}
                      {/* Conditionally render bars based on state */}
                      {visibleBars.appointments && (
                        <Bar
                          dataKey="total"
                          fill="#ACDDE7"
                          radius={[10, 10, 0, 0]}
                          barSize={10}
                        />
                      )}
                      {visibleBars.completed && (
                        <Bar
                          dataKey="completed"
                          fill="#cbefd6"
                          radius={[10, 10, 0, 0]}
                          barSize={10}
                        />
                      )}
                      {visibleBars.canceled && (
                        <Bar
                          dataKey="cancelled"
                          fill="#EAA000"
                          radius={[10, 10, 0, 0]}
                          barSize={10}
                        />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Bottom grid (divided into 2 horizontal blocks) */}
          <Grid container item xs={12} spacing={1}>
            {/* Left half of the bottom grid */}
            <Grid item xs={7}>
              <Box
                onClick={() => navigate(`/admin/earnings`)}
                sx={{
                  width: "100%",
                  backgroundColor: "#fff",
                  py: 2,
                  borderRadius: "0.4rem",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    color: "#25307F",
                    paddingTop: "0.1rem",
                    marginLeft: "1.8rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <h3 style={{ fontSize: "20px", fontWeight: 500 }}>
                    Revenue
                    <span
                      style={{
                        display: "inline-block",
                        transform: "translateY(0.49rem)",
                      }}
                    >
                      <KeyboardArrowRightIcon sx={{ fontSize: "28px" }} />
                    </span>
                  </h3>
                </div>

                {/* Add spacing before the graph */}
                <Box sx={{ marginLeft: "1rem" }}>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart
                      data={areaData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      {/* X & Y Axes */}
                      <XAxis dataKey="name" hide />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#000000" }}
                        tickCount={6}
                      />

                      {/* Tooltip */}
                      <Tooltip />

                      {/* Area Graphs */}
                      <Area
                        type="monotone"
                        dataKey="uv"
                        stroke="none"
                        fill="#81c9b6"
                      />
                      <Area
                        type="monotone"
                        dataKey="pv"
                        stroke="none"
                        fill="#2dcba1"
                      />
                      <Area
                        type="monotone"
                        dataKey="amt"
                        stroke="none"
                        fill="#00a378"
                      />
                      <Area
                        type="monotone"
                        dataKey="ayu"
                        stroke="none"
                        fill="#004a36"
                      />

                      {/* Move Grid Here to Appear Above */}
                      <CartesianGrid
                        horizontal
                        vertical={false}
                        stroke="#D7DCFF"
                        strokeWidth={0.5}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </Grid>

            {/* Right half of the bottom grid */}
            <Grid item xs={5}>
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#fff",
                  py: 1,
                  borderRadius: "0.4rem",
                }}
              >
                <div
                  onClick={() => navigate(`/admin/departments`)}
                  style={{
                    cursor: "pointer",
                    color: "#25307F",
                    paddingTop: "0.1rem",
                    marginLeft: "1.8rem",
                    marginBottom: "1rem",
                  }}
                >
                  <h3 style={{ fontSize: "20px", fontWeight: 500 }}>
                    Department
                    <span
                      style={{
                        display: "inline-block",
                        transform: "translateY(0.49rem)",
                      }}
                    >
                      <KeyboardArrowRightIcon sx={{ fontSize: "28px" }} />
                    </span>
                  </h3>
                </div>

                {/* Content for the right grid */}

                <DonutChart />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Admin;
