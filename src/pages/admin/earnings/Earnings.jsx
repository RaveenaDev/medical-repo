import React, {useEffect, useState} from 'react'
import CommonPanel from "../Components/CommonPanel.jsx";
import {Box, Grid} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Select from "../../../components/Select/index.jsx";

const Earnings = (props) => {
    useEffect(() => {
        props?.setIsSignUpOrLogin(false);
    }, []);

    const [branches, setBranches] = useState([
        "2025",
        "2024",
        "2023",
    ]);

    // Initial state where all bars are visible
    const [visibleGraph, setVisibleGraph] = useState({
        outpatient: true,
        inpatient: true,
        surgery: true,
        diagnostics: true,
    });

    const areaData = [
        {
            name: 'Jan',
            uv: 4000,
            pv: 2400,
            amt: 2400,
            ayu: 2200
        },
        {
            name: 'Feb',
            uv: 3000,
            pv: 1398,
            amt: 2210,
            ayu: 2100
        },
        {
            name: 'March',
            uv: 2000,
            pv: 9800,
            amt: 2290,
            ayu: 2400
        },
        {
            name: 'April',
            uv: 2780,
            pv: 3908,
            amt: 2000,
            ayu: 1200
        },
        {
            name: 'May',
            uv: 1890,
            pv: 4800,
            amt: 2181,
            ayu: 3200
        },
        {
            name: 'June',
            uv: 2390,
            pv: 3800,
            amt: 2500,
            ayu: 2600
        },
        {
            name: 'July',
            uv: 3490,
            pv: 4300,
            amt: 2100,
            ayu: 2500
        },
        {
            name: 'August',
            uv: 3490,
            pv: 4300,
            amt: 2100,
            ayu: 2300
        },
        {
            name: 'September',
            uv: 3490,
            pv: 4300,
            amt: 2100,
            ayu: 2100
        },
        {
            name: 'October',
            uv: 3490,
            pv: 4300,
            amt: 2100,
            ayu: 1800
        },
        {
            name: 'November',
            uv: 3490,
            pv: 4300,
            amt: 2100,
            ayu: 1200
        },
        {
            name: 'December',
            uv: 3490,
            pv: 4300,
            amt: 2100,
            ayu: 3200
        },
    ];

    const handleGraphToggle = (bar) => {
        // Set only the clicked bar to true, and the others to false
        setVisibleGraph({
            outpatient: bar === 'outpatient',
            inpatient: bar === 'inpatient',
            surgery: bar === 'surgery',
            diagnostics: bar === 'diagnostics',
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
        <>
            <CommonPanel/>

            <Box sx={{width: '100%', backgroundColor: "white", py: 2, borderRadius: "0.4rem"}}>

                <Box display="flex" justifyContent="space-between">
                    <div onClick={handleResetGraph} style={{
                        cursor:'pointer',
                        display: 'flex',
                        marginLeft: '1.4rem',
                        padding: '0.4rem',
                        borderRadius: '8px',
                        marginBottom: "3rem",
                        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
                        width: 'fit-content'  // Ensures the div width fits the content
                    }}>
                        <p style={{color: 'gray', margin: '0 10px 0 0'}}>Total Revenue (₹):</p>
                        <p style={{color: '#444FA2',fontWeight:"500", margin: '0 10px 0 0'}}>₹ 40000</p>
                        <ArrowUpwardIcon style={{color: 'green', marginTop: 'auto', marginBottom: 'auto'}}/>
                    </div>

                    <div>
                        {branches.length && (
                            <Grid
                                container
                                spacing={2}
                                justifyContent="flex-end"
                                alignItems="center"
                                flexDirection={{md: "row"}}
                                size={12}
                                pr={4}
                                pt={1.6}
                            >
                                <Grid size={3} sx={{backgroundColor: "white", borderRadius: "0.2rem"}}>
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

                <Box sx={{ display: "flex", gap: 5,marginBottom:"3rem",marginRight:"2rem" }} justifyContent='flex-end'> {/* Adjust gap for spacing */}
                    <Box onClick={() => handleGraphToggle('outpatient')} display="flex" alignItems="center" gap={1} sx={{ color: 'black',cursor:'pointer'}}>
                        <Box
                            sx={{
                                width: 15,
                                height: 15,
                                backgroundColor: "#444FA2",
                            }}
                        />
                        Outpatient Revenue
                    </Box>
                    <Box onClick={() => handleGraphToggle('inpatient')} display="flex" alignItems="center" gap={1} sx={{ color: 'black',cursor:'pointer' }}>
                        <Box
                            sx={{
                                width: 15,
                                height: 15,
                                backgroundColor: "#5765CA",
                            }}
                        />
                        Inpatient Revenue
                    </Box>
                    <Box onClick={() => handleGraphToggle('surgery')} display="flex" alignItems="center" gap={1} sx={{ color: 'black',cursor:'pointer' }}>
                        <Box
                            sx={{
                                width: 15,
                                height: 15,
                                backgroundColor: "#7A8AFF",
                            }}
                        />
                        Surgeries
                    </Box>
                    <Box onClick={() => handleGraphToggle('diagnostics')} display="flex" alignItems="center" gap={1} sx={{ color: 'black',cursor:'pointer' }}>
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
                <Box sx={{marginLeft: '1.8rem'}}>
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
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            {
                                visibleGraph.inpatient && (
                                    <Area type="monotone" dataKey="uv" stroke="#444FA2" fill="#444FA2"/>
                                )
                            }
                            {
                                visibleGraph.outpatient && (
                                    <Area type="monotone" dataKey="pv" stroke="#5765CA" fill="#5765CA"/>
                                )
                            }
                            {
                                visibleGraph.surgery && (
                                    <Area type="monotone" dataKey="amt" stroke="#7A8AFF" fill="#7A8AFF"/>
                                )
                            }
                            {
                                visibleGraph.diagnostics && (
                                    <Area type="monotone" dataKey="ayu" stroke="#D7DCFF" fill="#D7DCFF"/>
                                )
                            }
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </>
    )
}
export default Earnings
