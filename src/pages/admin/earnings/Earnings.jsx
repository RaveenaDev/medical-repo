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

    const areaData = [
        {
            name: 'Jan',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Feb',
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
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'September',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'October',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'November',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'December',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    return (
        <>
            <CommonPanel/>

            <Box sx={{width: '100%', backgroundColor: "white", py: 2, borderRadius: "0.4rem"}}>

                <Box display="flex" justifyContent="space-between">
                    <div style={{
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

                <Box sx={{ display: "flex", gap: 5,marginBottom:"3rem" }}> {/* Adjust gap for spacing */}
                    <Box display="flex" alignItems="center" gap={1} sx={{ ml: 60, color: 'black' }}>
                        <Box
                            sx={{
                                width: 15,
                                height: 15,
                                backgroundColor: "#444FA2",
                            }}
                        />
                        Outpatient Revenue
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} sx={{ color: 'black' }}>
                        <Box
                            sx={{
                                width: 15,
                                height: 15,
                                backgroundColor: "#5765CA",
                            }}
                        />
                        Inpatient Revenue
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} sx={{ color: 'black' }}>
                        <Box
                            sx={{
                                width: 15,
                                height: 15,
                                backgroundColor: "#7A8AFF",
                            }}
                        />
                        Surgeries
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} sx={{ color: 'black' }}>
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
                            <Area type="monotone" dataKey="uv" stroke="#444FA2" fill="#444FA2"/>
                            <Area type="monotone" dataKey="pv" stroke="#5765CA" fill="#5765CA"/>
                            <Area type="monotone" dataKey="amt" stroke="#7A8AFF" fill="#7A8AFF"/>
                            <Area type="monotone" dataKey="ayu" stroke="#D7DCFF" fill="#D7DCFF"/>
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </>
    )
}
export default Earnings
