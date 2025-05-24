import React, {useState} from 'react'
import styles from './Index.module.scss'
import CommonPanel from "./components/CommonPanel.jsx";
import Grid from "@mui/material/Grid2";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {
    Box,
    Button, Chip,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import DoughnutChart from "./components/DoughnutChart.jsx";
import ayu from "../admin/departments/departments.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const DoctorOverview = () => {
    // Default to today's date if props are not provided
    const [internalSelectedDate, setInternalSelectedDate] = useState(dayjs());
    const navigate = useNavigate();

    const dummyDiagnosisData = [
        { name: 'Respiratory Infections', value: 1800, color: '#D8E4FD' },
        { name: 'Hypertension',          value: 2400, color: '#5E73D4' },
        { name: 'Hyperlipidemia',        value: 3800, color: '#2D3179' },
        { name: 'Osteoarthritis',        value: 2200, color: '#A3A3A3' },
        { name: 'GERD',                  value:  840, color: '#F1F1F1' },
    ];

    const criticalPatients = [
        {
            name: "John Doe",
            disease: "Respiratory Failure",
            status: "Critical"
        },
        {
            name: "Jane Smith",
            disease: "Hypertension",
            status: "Ongoing"
        },
        {
            name: "Alice Johnson",
            disease: "Diabetes",
            status: "Moderate"
        },
        {
            name: "Bob Lee",
            disease: "Heart Disease",
            status: "High"
        },
    ];

    const totalAppointments = [
        {
            caseId: "CASE1234567890",
            patient: { name: "John Doe" },
            doctor: { name: "Dr. Smith" },
            typeVisit: "Follow-up",
            department: { name: "Cardiology" },
            tokenNumber: "TKN001",
            status: "Ongoing"
        },
        {
            caseId: "CASE2345678901",
            patient: { name: "Jane Roe" },
            doctor: { name: "Dr. Adams" },
            typeVisit: "Consultation",
            department: { name: "Neurology" },
            tokenNumber: "TKN002",
            status: "Scheduled"
        },
        {
            caseId: "CASE3456789012",
            patient: { name: "Michael Lee" },
            doctor: { name: "Dr. Watson" },
            typeVisit: "First Visit",
            department: { name: "Orthopedics" },
            tokenNumber: "TKN003",
            status: "Waiting"
        },
        {
            caseId: "CASE4567890123",
            patient: { name: "Emily Clark" },
            doctor: { name: "Dr. Patel" },
            typeVisit: "Follow-up",
            department: { name: "Pediatrics" },
            tokenNumber: "TKN004",
            status: "Completed"
        }
    ];

    const phases = [
        { name: 'Early stage', count: 26, color: '#25307F' },
        { name: 'Ongoing',    count: 13, color: '#5752CB' },
        { name: 'Maintenance',count:  5, color: '#D6DAFD' },
    ]

    const truncateText = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };


    const handleDateChange = (newValue) => {
        setInternalSelectedDate(newValue);
    };

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

    const getStatusStyle = (status) => {
        const baseStyle = {
            padding: "4px 1px",
            width:'4.4rem',
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: 500,
            textTransform: "capitalize",
            border: "1px solid",
            display: "inline-block",
            marginTop: "4px",
            textAlign:'center'
        };

        switch (status.toLowerCase()) {
            case "critical":
                return { ...baseStyle, backgroundColor: "#f14400", color: "#ffffff", borderColor: "#f14400" };
            case "ongoing":
                return { ...baseStyle, backgroundColor: "#ffffff", color: "#2e823b", borderColor: "#2e823b" };
            case "moderate":
                return { ...baseStyle, backgroundColor: "#ffffff", color: "#eaa000", borderColor: "#eaa000" };
            case "high":
                return { ...baseStyle, backgroundColor: "#ffffff", color: "#f14400", borderColor: "#f14400" };
            default:
                return baseStyle;
        }
    };

    const totalPatients = phases.reduce((sum, p) => sum + p.count, 0)

    return (
        <>
            <div>
                <CommonPanel/>

                <div>
                    <Grid
                        container
                        // sx={{ margin: "0 0 20px 0" }}
                    >
                        <Grid size={4} sx={{display: "flex", alignItems: "center"}}>
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
                                        value={internalSelectedDate}
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
                        <Grid size={8} sx={{display: "flex", justifyContent: "flex-end"}}>
                            <Button
                                variant="contained"
                                onClick={() => navigate(`/admin/requests`)}
                                sx={{
                                    fontSize: "14px",
                                    color: "#878787",
                                    textTransform: "capitalize",
                                    padding: "2px 6px",
                                    backgroundColor: "#fff",
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
                                  Appointment Requests
                                </span>
                            </Button>
                        </Grid>
                    </Grid>


                    <div className={styles.parent1}>
                        <div>
                            <div className={styles.child1}>
                                <div className={styles.card}>
                                    <div className={styles.cardChild}>
                                        <h4>Most Common Diagnosis</h4>
                                        <div style={{display: 'flex', gap: '4px'}}>
                                            <p>This Month</p>
                                            <svg
                                                width="14"
                                                height="18"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <mask
                                                    id="mask0_3306_7145"
                                                    style={{maskType: 'alpha'}}
                                                    maskUnits="userSpaceOnUse"
                                                    x="0"
                                                    y="0"
                                                    width="16"
                                                    height="16"
                                                >
                                                    <rect
                                                        y="16"
                                                        width="16"
                                                        height="16"
                                                        transform="rotate(-90 0 16)"
                                                        fill="#D9D9D9"
                                                    />
                                                </mask>
                                                <g mask="url(#mask0_3306_7145)">
                                                    <path
                                                        d="M14.6663 5.33333L7.99967 12L1.33301 5.33333L2.51634 4.15L7.99967 9.63333L13.483 4.15L14.6663 5.33333Z"
                                                        fill="#25307F"
                                                    />
                                                </g>
                                            </svg>
                                        </div>
                                    </div>

                                    <DoughnutChart data={dummyDiagnosisData}/>
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.cardChild} style={{marginBottom:'10px'}}>
                                        <h4>Critical Alerts</h4>
                                        <svg
                                            width="20"
                                            height="25"
                                            viewBox="0 0 20 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10 1.5L19 18.5H1L10 1.5Z"
                                                stroke="#25307F"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M10 8.5V12.5"
                                                stroke="#25307F"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M10 15.5V15.51"
                                                stroke="#25307F"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>

                                    <div>
                                        {criticalPatients.map((patient, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    borderBottom: "1px solid #eee",
                                                    padding: "8px 0",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <div>
                                                    <div style={{
                                                        fontWeight: "bold",
                                                        fontSize: "14px",
                                                        color: "#2d3179"
                                                    }}>
                                                        {patient.name}
                                                    </div>
                                                    <div style={{
                                                        fontSize: "12px",
                                                        color: "#878787"
                                                    }}>{patient.disease}</div>
                                                </div>
                                                <div style={getStatusStyle(patient.status)}>
                                                    {patient.status}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.child2}>
                                <div className={styles.heading}>
                                    <h3>Appointments</h3>
                                    <span>
                                        <ArrowForwardIosIcon sx={{ fontSize: 18 }}/>
                                    </span>
                                </div>

                                <div style={{marginTop:'1rem'}}>
                                    <TableContainer>
                                        <Table
                                            sx={{
                                                borderCollapse: "separate", // Ensure border-spacing works
                                                borderSpacing: "0 8px", // Adds vertical spacing between rows
                                            }}
                                        >
                                            <TableHead>
                                                <TableRow
                                                    sx={{
                                                        "&:last-child td, &:last-child th": {border: 0},
                                                        "& td, & th": {py: 0}, // Removes padding from all cells
                                                    }}
                                                >
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "14px",
                                                            color: "#000000",
                                                            fontWeight: 500,
                                                            border: "none",
                                                            px: 2.6,
                                                        }}
                                                    >
                                                        Case Id
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        sx={{
                                                            fontSize: "14px",
                                                            color: "#000000",
                                                            fontWeight: 500,
                                                            padding: "0.5 1",
                                                            border: "none",
                                                            px: 0.6,
                                                        }}
                                                    >
                                                        Name
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        sx={{
                                                            fontSize: "14px",
                                                            color: "#000000",
                                                            fontWeight: 500,
                                                            padding: "0.5 1",
                                                            border: "none",
                                                            px: 0.6,
                                                        }}
                                                    >
                                                        Appointment With
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        sx={{
                                                            fontSize: "14px",
                                                            color: "#000000",
                                                            fontWeight: 500,
                                                            padding: "0.5 1",
                                                            border: "none",
                                                            px: 0.6,
                                                        }}
                                                    >
                                                        Type Visit
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        sx={{
                                                            fontSize: "14px",
                                                            color: "#000000",
                                                            fontWeight: 500,
                                                            padding: "0.5 1",
                                                            border: "none",
                                                            px: 0.6,
                                                        }}
                                                    >
                                                        Branch
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        sx={{
                                                            fontSize: "14px",
                                                            color: "#000000",
                                                            fontWeight: 500,
                                                            padding: "0.5 1",
                                                            border: "none",
                                                            px: 0.6,
                                                        }}
                                                    >
                                                        Token&nbsp;No.
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        sx={{
                                                            fontSize: "14px",
                                                            color: "#000000",
                                                            fontWeight: 500,
                                                            padding: "0.5 1",
                                                            border: "none",
                                                            px: 0.6,
                                                        }}
                                                    >
                                                        Status
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {totalAppointments.length > 0 ? (
                                                    totalAppointments.slice(0, 5).map((row, index) => (
                                                        <TableRow
                                                            key={index}
                                                            sx={{
                                                                "&:last-child td, &:last-child th": {border: 0},
                                                                backgroundColor: row.status === 'Ongoing' ?
                                                                    "#EEF8F1" : "#ffffff",
                                                                "& td, & th": {py: 1.5}, // Removes padding from all cells
                                                            }}
                                                        >
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                                sx={{
                                                                    color: "#25307f",
                                                                    border: "none",
                                                                    px: 0.6,
                                                                    pl: 2,
                                                                    fontSize: "12px",
                                                                    fontWeight: 600
                                                                }}
                                                            >
                                                                {truncateText(row.caseId, 8)}
                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                                sx={{color: "#25307f",fontSize: "12px",
                                                                    fontWeight: 600, border: "none", px: 0.6}}
                                                            >
                                                                {truncateText(row.patient?.name, 13)}
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                sx={{border: "none",fontSize: "12px", px: 0.6, color: "#747474"}}
                                                            >
                                                                {truncateText(row.doctor?.name, 14)}
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                sx={{border: "none",fontSize: "12px", px: 0.6, color: "#747474"}}
                                                            >
                                                                {row.typeVisit}
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                sx={{border: "none",fontSize: "12px", px: 0.6, color: "#747474"}}
                                                            >
                                                                {row.department.name}
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                sx={{border: "none",fontSize: "12px", px: 0.6, color: "#747474"}}
                                                            >
                                                                {truncateText(row?.tokenNumber || "N/A", 13)}
                                                            </TableCell>
                                                            <TableCell
                                                                align="center"
                                                                sx={{
                                                                    border: "none",
                                                                    px: 0.6,
                                                                    pr: 2,
                                                                    color: "#747474",fontSize: "12px",
                                                                }}
                                                            >
                                                                <Chip
                                                                    label={row.status}
                                                                    size="small"
                                                                    sx={{
                                                                        bgcolor:
                                                                            row.status === "Ongoing"
                                                                                ? "#3DB461"
                                                                                : row.status === "Scheduled"
                                                                                    ? "#25307F"
                                                                                    : row.status === "Waiting"
                                                                                        ? "#ffffff"
                                                                                        : "white",
                                                                        color:
                                                                            row.status === "Ongoing"
                                                                                ? "#FFFFFF"
                                                                                : row.status === "Completed"
                                                                                    ? "orange"
                                                                                    : row.status === "Scheduled"
                                                                                        ? "white"
                                                                                        : row.status === "Waiting"
                                                                                            ? "#878787"
                                                                                            : "#757575",
                                                                        fontWeight: 500,
                                                                        px: 0.7,
                                                                    }}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell
                                                            align="center"
                                                            colSpan={7}
                                                            sx={{backgroundColor: "#EEF8F1"}}
                                                        >
                                                            No appointments found.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                            <div className={styles.child3}>
                                <div className={styles.card}>
                                    <div style={{display:'flex',justifyContent:'space-between'}}>
                                        <div>
                                            <h3 className={styles.title}>Patients’ treatment phases</h3>
                                            <p className={styles.subtitle}>
                                                You are coach to {totalPatients} active patients
                                            </p>
                                        </div>

                                        <div className={styles.legend}>
                                            {phases.map(p => (
                                                <div key={p.name} className={styles.legendItem}>
                                                  <span
                                                      className={styles.legendSwatch}
                                                      style={{backgroundColor: p.color}}
                                                  />
                                                    <span>{p.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.bars}>
                                        {phases.map(p => (
                                            <div key={p.name} style={{ flexGrow: p.count, display: 'flex', flexDirection: 'column' }}>
                                                  <span className={styles.phaseLabel}>
                                                    {p.count} Patients
                                                  </span>
                                                <div className={styles.barTrack}>
                                                    <div
                                                        className={styles.barFill}
                                                        style={{
                                                            width: '100%',
                                                            backgroundColor: p.color,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="div2">2</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DoctorOverview
