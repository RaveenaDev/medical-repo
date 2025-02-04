import React, { useEffect, useState } from 'react';
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
    Legend, Pie, PieChart,
    Rectangle,
    ResponsiveContainer, Sector,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import Select from "../../components/Select/index.jsx";
import DonutChart from "./Components/DonutChart.jsx"; // Use Grid from MUI instead

function Admin(props) {

    const [branches, setBranches] = useState([
        "Monthly",
        "Yearly",
    ]);

    useEffect(() => {
        props?.setIsSignUpOrLogin(false);
    }, []);

    const data = [
        {
            name: 'January',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'February',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'March',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'April',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'May',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'June',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'July',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'August',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'September',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'October',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'November',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'December',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
    ];

    const areaData = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];


    return (
        <>
            <div className={ayu.patients} style={{ position: 'relative' }}>
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
                        position: 'absolute',
                        left: "16%",
                        top: "11.28rem",
                    }}
                >
          <span
              style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#3DB461',
                  marginRight: '4px'
              }}
          ></span>
                    15 new Patients
                    <span style={{ transform: 'translateY(4px)' }}>
            <KeyboardArrowRightIcon />
          </span>
                </Button>
            </div>

            {/* Main Grid container */}
            <Grid container spacing={2}>
                {/* Top grid (one large block) */}
                <Grid item xs={12}>

                    <Box sx={{width: '100%',backgroundColor:"#25307F",px:3,py:2,borderRadius:"0.4rem"}}>

                        <Box display="flex">
                            <div style={{paddingTop: "1rem", marginLeft: "1.8rem", marginBottom: "1.5rem"}}>
                                <h3>Appointment Statistics</h3>
                            </div>

                            <Box sx={{display: "flex", gap: 3}}> {/* Adjust gap for spacing */}
                                <Box display="flex" alignItems="center" gap={1} sx={{ml: 20, color: 'white'}}>
                                    <Box
                                        sx={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: "50%",
                                            backgroundColor: "green",
                                        }}
                                    />
                                    Available
                                </Box>
                                <Box display="flex" alignItems="center" gap={1} sx={{color: 'white'}}>
                                    <Box
                                        sx={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: "50%",
                                            backgroundColor: "orange",
                                        }}
                                    />
                                    Occupied
                                </Box>
                                <Box display="flex" alignItems="center" gap={1} sx={{color: 'white'}}>
                                    <Box
                                        sx={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: "50%",
                                            backgroundColor: "skyblue",
                                        }}
                                    />
                                    Under Maintenance
                                </Box>
                            </Box>

                            <div>
                                {branches.length && (
                                    <Grid
                                        container
                                        spacing={2}
                                        justifyContent="flex-end"
                                        alignItems="center"
                                        flexDirection={{md: "row"}}
                                        size={12}
                                        sx={{margin: "10px 15rem 10px 0"}}
                                    >
                                        <Grid size={3} sx={{backgroundColor: "white",borderRadius:"0.2rem"}}>
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
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                barGap={5}  // Adjust space between bars
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
                                <XAxis dataKey="name"/>
                                <YAxis />
                                <Tooltip/>
                                {/* Remove the Legend for clarity */}
                                <Bar dataKey="pv" fill="#8884d8" radius={[10, 10, 0, 0]} barSize={15} />
                                <Bar dataKey="uv" fill="#82ca9d" radius={[10, 10, 0, 0]} barSize={15} />
                                <Bar dataKey="amt" fill="#EAA000" radius={[10, 10, 0, 0]} barSize={15} />
                            </BarChart>
                        </ResponsiveContainer>

                    </Box>
                </Grid>

                {/* Bottom grid (divided into 2 horizontal blocks) */}
                <Grid container item xs={12} spacing={2}>
                    {/* Left half of the bottom grid */}
                    <Grid item xs={8}>
                        <Box sx={{width: '100%', backgroundColor: "white", py: 2, borderRadius: "0.4rem"}}>

                            <div style={{color:"#25307F",paddingTop: "0.4rem", marginLeft: "1.8rem", marginBottom: "1.5rem"}}>
                                <h3>Revenue
                                    <span style={{ display: 'inline-block', transform: 'translateY(0.37rem)'}}>
                                        <KeyboardArrowRightIcon/>
                                    </span>
                                </h3>
                            </div>

                            {/* Add spacing before the graph */}
                            <Box sx={{ marginLeft: '1.8rem' }}>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart
                                        width={500}
                                        height={400}
                                        data={areaData}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        {/*<CartesianGrid strokeDasharray="3 3" />*/}
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                                        <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" />
                                        <Area type="monotone" dataKey="amt" stroke="#8884d8" fill="#8884d8" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Right half of the bottom grid */}
                    <Grid item xs={4}>
                        <Box sx={{width: '100%', backgroundColor: "white", py: 2, borderRadius: "0.4rem"}}>

                            <div style={{
                                color: "#25307F",
                                paddingTop: "0.4rem",
                                marginLeft: "1.8rem",
                                marginBottom:"1rem"
                            }}>
                                <h3>Department
                                    <span style={{display: 'inline-block', transform: 'translateY(0.37rem)'}}>
                                        <KeyboardArrowRightIcon/>
                                    </span>
                                </h3>
                            </div>

                            {/* Content for the right grid */}

                            <DonutChart/>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Admin;
