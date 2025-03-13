import React, { useEffect, useState } from "react";
import ayu from "../receptionist/patients/patients.module.scss";
import CommonPanel from "./Components/CommonPanel.jsx";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, Grid } from "@mui/material";
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
import Select from "../../components/Select/index.jsx";
import DonutChart from "./Components/DonutChart.jsx";
import { useNavigate } from "react-router-dom"; // Use Grid from MUI instead
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentCounts } from "../../components/State/Admin/Action.js";

function Admin(props) {
  const [branches, setBranches] = useState(["Monthly", "Yearly"]);

  // Initial state where all bars are visible
  const [visibleBars, setVisibleBars] = useState({
    appointments: true,
    completed: true,
    canceled: true,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
    dispatch(getAppointmentCounts());
  }, []);

  const appointmentData =
    useSelector((state) => state.admin.appointmentCount) || {}; // Default to empty object
  const yearlyData = appointmentData?.yearlyData || {}; // Ensure it's an object
  const data = yearlyData?.[2025]?.months || []; // Ensure it's an array

  const areaData = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
      ayu: 2200,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
      ayu: 2100,
    },
    {
      name: "Mar",
      uv: 5000,
      pv: 7800,
      amt: 2290,
      ayu: 2400,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
      ayu: 1200,
    },
    {
      name: "May",
      uv: 4890,
      pv: 4800,
      amt: 2181,
      ayu: 3200,
    },
    {
      name: "June",
      uv: 2390,
      pv: 3800,
      amt: 2500,
      ayu: 2600,
    },
    {
      name: "July",
      uv: 5490,
      pv: 4300,
      amt: 2100,
      ayu: 2500,
    },
    {
      name: "Aug",
      uv: 3490,
      pv: 4300,
      amt: 2100,
      ayu: 2300,
    },
    {
      name: "Sep",
      uv: 5490,
      pv: 4300,
      amt: 2100,
      ayu: 2100,
    },
    {
      name: "Oct",
      uv: 2490,
      pv: 4300,
      amt: 2100,
      ayu: 1800,
    },
    {
      name: "Nov",
      uv: 3490,
      pv: 4300,
      amt: 2100,
      ayu: 1200,
    },
    {
      name: "Dec",
      uv: 6490,
      pv: 4300,
      amt: 2100,
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

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0px",
          padding: "10px",
          width: "77%",
          background: " #F1F1F1",
          zIndex: 10000,
        }}
      >
        <div className={ayu.patients} style={{ position: "relative" }}>
          <CommonPanel />

          <Button
            variant="contained"
            sx={{
              fontSize: "14px",
              color: "#25307F",
              fontWeight: 500,
              textTransform: "capitalize",
              padding: "4px 8px",
              backgroundColor: "#fff",
              marginLeft: "16px",
              position: "absolute",
              left: "11.2rem", // % mai isliye nhi di because ye alag file mai hai toh iski position fixed honi jaruri hai during responsiveness
              top: "8.55rem",
            }}
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
            15 new Patients
            <span style={{ transform: "translateY(4px)" }}>
              <KeyboardArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
      <div style={{ marginTop: "200px" }}>
        {/* Main Grid container */}
        <Grid container spacing={2}>
          {/* Top grid (one large block) */}
          <Grid item xs={12}>
            <Box
              sx={{
                width: "97%",
                backgroundColor: "#25307F",
                px: 3,
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
                  <h4 style={{ fontWeight: 400 }}>Appointment Statistics</h4>
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
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "#8884d8",
                      }}
                    />
                    Appointments
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
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "#82ca9d",
                      }}
                    />
                    Completed
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
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: "#EAA000",
                      }}
                    />
                    Canceled
                  </Box>
                </Box>

                <div>
                  {branches.length && (
                    <Grid
                      container
                      justifyContent="flex-end"
                      alignItems="center"
                      flexDirection={{ md: "row" }}
                      size={12}
                      sx={{ margin: "0 0 1px 0" }}
                    >
                      <Grid
                        size={3}
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "0.2rem",
                        }}
                      >
                        <Select
                          inputId="input-department"
                          selectId="select-department"
                          label="Department"
                          list={branches}
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  )}
                </div>
              </Box>

              {/* Content for the top grid */}
              <ResponsiveContainer width="100%" height={290}>
                <BarChart
                  barGap={5} // Adjust space between bars
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#fff" }} />
                  <YAxis tick={{ fill: "#fff" }} />
                  {/* Customize the Tooltip */}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#333", // Dark background for the tooltip
                      color: "#fff", // White text color
                      borderRadius: "5px", // Optional: for rounded corners
                      padding: "10px", // Optional: for more spacing inside the tooltip
                    }}
                  />
                  {/* Remove the Legend for clarity */}
                  {/* Conditionally render bars based on state */}
                  {visibleBars.appointments && (
                    <Bar
                      dataKey="total"
                      fill="#8884d8"
                      radius={[10, 10, 0, 0]}
                      barSize={15}
                    />
                  )}
                  {visibleBars.completed && (
                    <Bar
                      dataKey="completed"
                      fill="#82ca9d"
                      radius={[10, 10, 0, 0]}
                      barSize={15}
                    />
                  )}
                  {visibleBars.canceled && (
                    <Bar
                      dataKey="cancelled"
                      fill="#EAA000"
                      radius={[10, 10, 0, 0]}
                      barSize={15}
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Bottom grid (divided into 2 horizontal blocks) */}
          <Grid container item xs={12} spacing={2}>
            {/* Left half of the bottom grid */}
            <Grid item xs={8}>
              <Box
                onClick={() => navigate(`/admin/earnings`)}
                sx={{
                  width: "100%",
                  backgroundColor: "white",
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
                      <KeyboardArrowRightIcon sx={{fontSize: "28px"}}/>
                    </span>
                  </h3>
                </div>

                {/* Add spacing before the graph */}
                <Box sx={{ marginLeft: "1.8rem" }}>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart
                      width={500}
                      height={100}
                      data={areaData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      {/*<CartesianGrid strokeDasharray="3 3" />*/}
                      <CartesianGrid horizontal={true} vertical={false} />{" "}
                      {/* Horizontal lines only */}
                      <XAxis dataKey="name" hide />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 14 }}/>
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="uv"
                        stroke="#8884d8"
                        fill="#444FA2"
                      />
                      <Area
                        type="monotone"
                        dataKey="pv"
                        stroke="#8884d8"
                        fill="#2765CA"
                      />
                      <Area
                        type="monotone"
                        dataKey="amt"
                        stroke="#8884d8"
                        fill="#7A8AFF"
                      />
                      <Area
                        type="monotone"
                        dataKey="ayu"
                        stroke="#8884d8"
                        fill="#D7DCFF"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </Grid>

            {/* Right half of the bottom grid */}
            <Grid item xs={4}>
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  py: 2,
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
                      <KeyboardArrowRightIcon sx={{fontSize: "28px"}}/>
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
    </>
  );
}

export default Admin;
