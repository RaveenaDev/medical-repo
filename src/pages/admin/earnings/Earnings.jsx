import React, { useEffect, useState } from "react";
import CommonPanel from "../Components/CommonPanel.jsx";
import { Box, Grid } from "@mui/material";
import {
  Area,
  AreaChart, CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Select from "../../../components/Select/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getEarnings} from "../../../components/State/Admin/Action.js";

const Earnings = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const [branches, setBranches] = useState(["2025", "2024", "2023"]);

  // Initial state where all bars are visible
  const [visibleGraph, setVisibleGraph] = useState({
    outpatient: true,
    inpatient: true,
    surgery: true,
    diagnostics: true,
  });

  const dispatch = useDispatch();

  const totalEarnings = useSelector((store) => store.admin.totalEarnings)
  // const areaData = useSelector((store) => store.admin.monthlyEarnings)

  useEffect(() => {
    dispatch(getEarnings(2025))
  }, [dispatch]);


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

  const handleGraphToggle = (bar) => {
    // Set only the clicked bar to true, and the others to false
    setVisibleGraph({
      outpatient: bar === "outpatient",
      inpatient: bar === "inpatient",
      surgery: bar === "surgery",
      diagnostics: bar === "diagnostics",
    });
  };

  // Reset all bars to visible when "Appointment Statistics" is clicked
  const handleResetGraph = () => {
    setVisibleGraph({
      outpatient: true,
      inpatient: true,
      surgery: true,
      diagnostics: true,
    });
  };
  return (
    <div
      style={{
        background: "#f1f1f1",
        // height: "98dvh", // Make the entire div take up the full viewport height
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
      <div style={{ marginTop: "200px" }}>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            py: 2,
            borderRadius: "0.4rem",
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <div
              onClick={handleResetGraph}
              style={{
                cursor: "pointer",
                display: "flex",
                marginLeft: "1.4rem",
                padding: "0.4rem",
                borderRadius: "8px",
                marginBottom: "3rem",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
                width: "fit-content", // Ensures the div width fits the content
              }}
            >
              <p style={{ color: "gray", margin: "0 10px 0 0" }}>
                Total Revenue (₹):
              </p>
              <p
                style={{
                  color: "#444FA2",
                  fontWeight: "500",
                  margin: "0 10px 0 0",
                }}
              >
                ₹ {totalEarnings}
              </p>
              <ArrowUpwardIcon
                style={{
                  color: "green",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              />
            </div>

            <div>
              {branches.length && (
                <Grid
                  container
                  spacing={2}
                  justifyContent="flex-end"
                  alignItems="center"
                  flexDirection={{ md: "row" }}
                  size={12}
                  pr={4}
                  pt={1.6}
                >
                  <Grid
                    size={3}
                    sx={{ backgroundColor: "white", borderRadius: "0.2rem" }}
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

          <Box
            sx={{
              display: "flex",
              gap: 5,
              marginBottom: "1rem",
              marginRight: "2rem",
            }}
            justifyContent="flex-end"
          >
            {" "}
            {/* Adjust gap for spacing */}
            <Box
              onClick={() => handleGraphToggle("outpatient")}
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ color: "black", cursor: "pointer" }}
            >
              <Box
                sx={{
                  width: 15,
                  height: 15,
                  backgroundColor: "#444FA2",
                }}
              />
              Outpatient Revenue
            </Box>
            <Box
              onClick={() => handleGraphToggle("inpatient")}
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ color: "black", cursor: "pointer" }}
            >
              <Box
                sx={{
                  width: 15,
                  height: 15,
                  backgroundColor: "#5765CA",
                }}
              />
              Inpatient Revenue
            </Box>
            <Box
              onClick={() => handleGraphToggle("surgery")}
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ color: "black", cursor: "pointer" }}
            >
              <Box
                sx={{
                  width: 15,
                  height: 15,
                  backgroundColor: "#7A8AFF",
                }}
              />
              Surgeries
            </Box>
            <Box
              onClick={() => handleGraphToggle("diagnostics")}
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ color: "black", cursor: "pointer" }}
            >
              <Box
                sx={{
                  width: 15,
                  height: 15,
                  backgroundColor: "#D7DCFF",
                }}
              />
              Diagnostics
            </Box>
          </Box>

          {/* Add spacing before the graph */}
          <Box sx={{height:'18.8rem', margin: "0 1.8rem 2rem 1.8rem",paddingTop:'3rem',backgroundColor:'#F1F1F1'}}>
            <ResponsiveContainer width="100%" height={330}>
              <AreaChart
                width={500}
                height={400}
                data={areaData}
                margin={{
                  top: 20,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name"
                       tick={{ fontSize: 14}}
                       tickLine={false}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#000000" }}
                    tickCount={6}
                    domain={['dataMin', 'auto']} // Excludes 0
                    tickFormatter={(value) => (value === 0 ? '' : value)} // Hides 0
                />
                <Tooltip />
                {visibleGraph.inpatient && (
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="none"
                    fill="#5765CB"
                  />
                )}
                {visibleGraph.outpatient && (
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stroke="none"
                    fill="#434FA3"
                  />
                )}
                {visibleGraph.surgery && (
                  <Area
                    type="monotone"
                    dataKey="amt"
                    stroke="none"
                    fill="#7A8AFF"
                  />
                )}
                {visibleGraph.diagnostics && (
                  <Area
                    type="monotone"
                    dataKey="ayu"
                    stroke="none"
                    fill="#D7DCFF"
                  />
                )}

                <CartesianGrid horizontal
                               vertical={false}
                               stroke="#BFC5F5"
                               strokeWidth={0.5} />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </div>
    </div>
  );
};
export default Earnings;
