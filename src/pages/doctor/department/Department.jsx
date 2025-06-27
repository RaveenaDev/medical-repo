import React, { useEffect, useState } from "react";
import CommonPanel from "../components/CommonPanel.jsx";
import style from "./Department.module.scss";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getHospitalStatistics,
  getPatientOverview,
} from "../../../components/State/Doctor/Action.js";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
} from "date-fns";

const getDateRange = (filterType) => {
  const now = new Date();
  switch (filterType) {
    case "month":
      return { fromDate: startOfMonth(now), toDate: endOfMonth(now) };
    case "week":
      return {
        fromDate: startOfWeek(now, { weekStartsOn: 1 }),
        toDate: endOfWeek(now, { weekStartsOn: 1 }),
      };
    case "year":
      return { fromDate: startOfYear(now), toDate: endOfYear(now) };
    default:
      return { fromDate: startOfMonth(now), toDate: endOfMonth(now) };
  }
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const doctors = [
  {
    id: 1,
    name: "Deepak Singh",
    role: "Doctor",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: 2,
    name: "Raj Malhotra",
    role: "Practitioner Doctor",
    avatar: "https://randomuser.me/api/portraits/men/24.jpg",
  },
  {
    id: 3,
    name: "Chandan Shukla",
    role: "Junior Doctor",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 4,
    name: "Anmol Arora",
    role: "Junior Doctor",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const staffMembers = [
  {
    id: 1,
    name: "Ritika Bhola",
    role: "Nurse Manager",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 2,
    name: "Sonia Kapoor",
    role: "Receptionist",
    avatar: "https://randomuser.me/api/portraits/women/34.jpg",
  },
  {
    id: 3,
    name: "Vikram Joshi",
    role: "Lab Technician",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    id: 4,
    name: "Pooja Mehta",
    role: "Pharmacist",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
  },
];

const medicalData = [
  { name: "Angioplasty", value: 30, color: "#F14400" },
  { name: "Surgeries", value: 20, color: "#66A7B4" },
  { name: "Stenting", value: 15, color: "#EAA000" },
  { name: "Pacemaker", value: 28, color: "#2E823B" },
];

const inventoryData = [
  { name: "Medicines", value: 200, percentage: "15" },
  { name: "Surgical tools", value: 150, percentage: "29" },
  { name: "Devices", value: 100, percentage: "19" },
  { name: "Emergency Supplies", value: 105, percentage: "29" },
];

const doctors1 = [
  { _id: "607f1f77bcf86cd799439011", name: "Dr. Amit Sharma" },
  { _id: "607f1f77bcf86cd799439012", name: "Dr. Priya Singh" },
  { _id: "607f1f77bcf86cd799439013", name: "Dr. Rohit Patel" },
  { _id: "607f1f77bcf86cd799439014", name: "Dr. Neha Verma" },
  { _id: "607f1f77bcf86cd799439015", name: "Dr. Sunita Rao" },
];

/* A simple color palette for the Pie chart slices */
const COLORS = ["#25307F", "#5461BE", "#586EB4", "#DAE4FF"];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const Department = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  // Use two independent Sets: one for selected doctor IDs, one for selected staff IDs.
  const [selectedDoctors, setSelectedDoctors] = useState(new Set());
  const [selectedStaff, setSelectedStaff] = useState(new Set());

  // Toggle a doctor's checkbox (on row click). Adds/removes docId from selectedDoctors set.
  const toggleDoctorSelection = (docId) => {
    setSelectedDoctors((prev) => {
      const next = new Set(prev);
      if (next.has(docId)) next.delete(docId);
      else next.add(docId);
      return next;
    });
  };

  // Toggle a staff member's checkbox (on row click). Adds/removes staffId from selectedStaff set.
  const toggleStaffSelection = (staffId) => {
    setSelectedStaff((prev) => {
      const next = new Set(prev);
      if (next.has(staffId)) next.delete(staffId);
      else next.add(staffId);
      return next;
    });
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, idx) => setActiveIndex(idx);
  const onPieLeave = () => setActiveIndex(null);

  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      percent,
    } = props;

    const RADIAN = Math.PI / 180;
    // midpoint angle of this slice
    const midAngle = (startAngle + endAngle) / 2;
    // radius halfway between inner & outer
    const labelRadius = innerRadius + (outerRadius - innerRadius) / 2;
    // compute label coords
    const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        {/* Popped-out slice */}
        <Sector
          cx={cx}
          cy={cy - 3}
          innerRadius={innerRadius + 2}
          outerRadius={outerRadius + 7}
          startAngle={startAngle}
          cornerRadius={8}
          endAngle={endAngle}
          fill={fill}
        />
        {/* Percentage inside the slice */}
        <text
          x={x}
          y={y - 3}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: 9, fontWeight: "bold", fill: "#ffffff" }}
        >
          {Math.round(percent * 100)}%
        </text>
      </g>
    );
  };

  // If at least one doctor ID is in selectedDoctors, enable Doctors' Assign button.
  const anyDoctorSelected = selectedDoctors.size > 0;
  // If at least one staff ID is in selectedStaff, enable Staff's Assign button.
  const anyStaffSelected = selectedStaff.size > 0;

  // Helper to format large numbers (e.g. 40000 → “40k”)
  const formatValue = (val) => {
    if (val >= 1000) {
      // If exactly divisible by 1000, show “40k”, otherwise show one decimal “40.5k”
      const remainder = val % 1000;
      const thousands = val / 1000;
      return remainder === 0
        ? `${thousands.toFixed(0)}k`
        : `${thousands.toFixed(1)}k`;
    }
    return val.toString();
  };

  const ipdCount = 222; // e.g. get this from props or state
  const opdCount = 344; // e.g. get this from props or state

  const totalCases = ipdCount + opdCount;
  const ipdPercent = totalCases > 0 ? (ipdCount / totalCases) * 100 : 0;
  const opdPercent = totalCases > 0 ? (opdCount / totalCases) * 100 : 0;

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [department, setDepartment] = useState({
    name: "",
    head: "",
    doctors: [],
    nurses: [],
    // services: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({
      ...prev,
      [name]: name === "head" && value !== "" ? JSON.parse(value) : value,
    }));
  };

  const handleMultipleChange = (event) => {
    const {
      target: { name, value },
    } = event;

    setDepartment((prevDepartment) => ({
      ...prevDepartment,
      [name]: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleAdd = () => {
    console.log("Adding new Dep... : ", department);
  };

  // Date range for patient overview
  const [filter, setFilter] = useState("month");
  const [dateRange, setDateRange] = useState(getDateRange("month"));

  const departmentId = "683d7f91ae6534294cac2e8a"; // Example department ID, replace with actual
  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setFilter(selected);
    const range = getDateRange(selected);
    setDateRange(range);
  };
  useEffect(() => {
    // Dispatch an action to get hospital statistics
    dispatch(getHospitalStatistics(departmentId));
    dispatch(
      getPatientOverview(departmentId, dateRange.fromDate, dateRange.toDate)
    );
  }, [dispatch, dateRange]);

  const hospitalStatistics = useSelector(
    (state) => state.doctor.hospitalStatistics
  );

  const totalPatients = hospitalStatistics?.patients?.total || 0;
  const totalBeds = hospitalStatistics?.beds?.available || 0;
  const totalRooms = hospitalStatistics?.rooms?.available || 0;

  const patientOverview = useSelector((state) => state.doctor.patientOverview);

  // console.log("Hospital Statistics: ", hospitalStatistics);
  // console.log("Patient Overview: ", patientOverview);

  return (
    <>
      <div
        style={{
          position: "fixed",
          zIndex: 1000,
          top: 0,
          width: "77.6vw",
          background: "#F1F1F1",
          paddingBottom: "1rem",
        }}
      >
        <CommonPanel />
      </div>

      <div className={style.parent}>
        <div className={style.head}>
          <div className={style.headingSection}>
            <div className={style.heading}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_3883_12162)">
                  <path
                    d="M18.0054 3.23919C17.4746 2.70836 16.6188 2.70836 16.0879 3.23919L7.08543 12.2417C6.66293 12.6642 6.66293 13.3467 7.08543 13.7692L16.0879 22.7717C16.6188 23.3025 17.4746 23.3025 18.0054 22.7717C18.5363 22.2409 18.5363 21.385 18.0054 20.8542L10.1621 13L18.0163 5.14586C18.5363 4.62586 18.5363 3.75919 18.0054 3.23919Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3883_12162">
                    <rect width="26" height="26" rx="13" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <h4>Cardiology Department</h4>
            </div>
            <p>Head: Dr. Amit Patil</p>
          </div>

          <div style={{ marginTop: "1.2rem" }}>
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{
                display: "flex",
                gap: "0.8rem",
                fontSize: "16px",
                color: "#ffffff",
                textTransform: "capitalize",
                padding: {
                  xs: "0px 8px",
                  sm: "0px 10px",
                  md: "4px 10px",
                }, // Adjust padding
                backgroundColor: "#25307F",
                boxShadow: "0px 4px 4px 0px #C2C2C240",
                "&:hover": {
                  background: "#AEC3FF",
                },
                "&:active": {
                  backgroundColor: "#181F52",
                  outline: "none",
                  boxShadow: "none",
                },
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13 13V20C13 20.2652 12.8946 20.5196 12.7071 20.7071C12.5196 20.8946 12.2652 21 12 21C11.7348 21 11.4804 20.8946 11.2929 20.7071C11.1054 20.5196 11 20.2652 11 20V13H4C3.73478 13 3.48043 12.8946 3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929C3.48043 11.1054 3.73478 11 4 11H11V4C11 3.73478 11.1054 3.48043 11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289C12.8946 3.48043 13 3.73478 13 4V11H20C20.2652 11 20.5196 11.1054 20.7071 11.2929C20.8946 11.4804 21 11.7348 21 12C21 12.2652 20.8946 12.5196 20.7071 12.7071C20.5196 12.8946 20.2652 13 20 13H13Z"
                  fill="white"
                />
              </svg>
              New Department
            </Button>
          </div>
        </div>

        <div className={style.gridContainer}>
          <div className={style.left}>
            {/* ───────────── Doctors Section ───────────── */}
            <div className={style.section}>
              <h3 className={style.sectionTitle}>Doctors</h3>
              <div className={style.scrollableList}>
                {doctors.map((doc) => {
                  const isSelected = selectedDoctors.has(doc.id);
                  return (
                    <div
                      key={doc.id}
                      className={style.listItem}
                      onClick={() => toggleDoctorSelection(doc.id)}
                    >
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className={style.avatar}
                      />
                      <div className={style.info}>
                        <span className={style.name}>{doc.name}</span>
                        <span className={style.role}>{doc.role}</span>
                      </div>
                      {isSelected && (
                        <input
                          type="checkbox"
                          className={style.checkbox}
                          checked
                          readOnly
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                className={`${
                  anyDoctorSelected ? style.assignButton : style.notAssigned
                }`}
                disabled={!anyDoctorSelected}
              >
                Assign
              </button>
            </div>

            {/* ───────────── Staff Members Section ───────────── */}
            <div className={style.section}>
              <h3 className={style.sectionTitle}>Staff Members</h3>
              <div className={style.scrollableList}>
                {staffMembers.map((staff) => {
                  const isSelected = selectedStaff.has(staff.id);
                  return (
                    <div
                      key={staff.id}
                      className={style.listItem}
                      onClick={() => toggleStaffSelection(staff.id)}
                    >
                      <img
                        src={staff.avatar}
                        alt={staff.name}
                        className={style.avatar}
                      />
                      <div className={style.info}>
                        <span className={style.name}>{staff.name}</span>
                        <span className={style.role}>{staff.role}</span>
                      </div>
                      {isSelected && (
                        <input
                          type="checkbox"
                          className={style.checkbox}
                          checked
                          readOnly
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                className={`${
                  anyStaffSelected ? style.assignButton : style.notAssigned
                }`}
                disabled={!anyStaffSelected}
              >
                Assign
              </button>
            </div>
          </div>

          <div className={style.center}>
            {/*** Card 1: Number of medical procedures ***/}
            <div className={style.card} style={{ backgroundColor: "#25307F" }}>
              <div className={style.cardHeader}>
                <h3>Number of medical procedures</h3>
                <div>
                  <span className={style.subTitle}>This Month</span>
                  <svg
                    style={{ marginLeft: "4px", transform: "translateY(3px)" }}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_3883_12068"
                      maskType="alpha"
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
                    <g mask="url(#mask0_3883_12068)">
                      <path
                        d="M14.6663 5.33333L7.99967 12L1.33301 5.33333L2.51634 4.15L7.99967 9.63333L13.483 4.15L14.6663 5.33333Z"
                        fill="#DAE4FF"
                      />
                    </g>
                  </svg>
                </div>
              </div>

              <div className={style.cardContent}>
                <div className={style.headline}>
                  <h1>
                    93
                    <p
                      style={{
                        fontSize: "15px",
                        marginLeft: "6px",
                        fontWeight: "500",
                      }}
                    >
                      cases
                    </p>
                    <span className={style.percentage}>(+10% last month)</span>
                  </h1>
                </div>

                <ResponsiveContainer height={200}>
                  <BarChart
                    data={medicalData}
                    margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                  >
                    {/* ─────────── X Axis ─────────── */}
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: "#DAE4FF" }}
                      axisLine={{ stroke: "#475569", strokeWidth: 1 }}
                      tickLine={false}
                    />

                    {/* ─────────── Y Axis ─────────── */}
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12, fill: "#999999" }}
                    />

                    {/* ─────────── Horizontal Grid Lines Only (solid) ─────────── */}
                    <CartesianGrid
                      horizontal={true}
                      vertical={false}
                      stroke="#DAE4FF" /* a light gray color—adjust as needed */
                      strokeDasharray="" /* empty = solid, not dashed */
                    />

                    <Tooltip />

                    {/* ─────────── Bars with rounded tops ─────────── */}
                    <Bar dataKey="value" barSize={70} radius={[10, 10, 0, 0]}>
                      {medicalData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/*** Card 2: Cardiology Inventory ***/}
            <div className={style.card}>
              <div
                className={style.cardHeader}
                style={{
                  justifyContent: "flex-start",
                  gap: "4px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/doctor/department/inventory")}
              >
                <h3>Cardiology Inventory</h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_3883_12115)">
                    <path
                      d="M7.99457 3.23919C8.5254 2.70836 9.38124 2.70836 9.91207 3.23919L18.9146 12.2417C19.3371 12.6642 19.3371 13.3467 18.9146 13.7692L9.91207 22.7717C9.38124 23.3025 8.5254 23.3025 7.99457 22.7717C7.46374 22.2409 7.46374 21.385 7.99457 20.8542L15.8379 13L7.98374 5.14586C7.46374 4.62586 7.46374 3.75919 7.99457 3.23919Z"
                      fill="#25307F"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3883_12115">
                      <rect
                        width="26"
                        height="26"
                        fill="white"
                        transform="matrix(-1 0 0 1 26 0)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <div className={style.cardContent}>
                {/* Responsive donut/pie chart */}
                <ResponsiveContainer width="100%" height={270}>
                  <PieChart>
                    <Pie
                      data={inventoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={105}
                      paddingAngle={4}
                      cornerRadius={8}
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      onMouseEnter={onPieEnter}
                      onMouseLeave={onPieLeave}
                    >
                      {inventoryData.map((entry, index) => (
                        <Cell
                          key={`slice-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                {/* ───── Custom legend below ───── */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 4,
                    marginTop: 4,
                    padding: "1rem",
                  }}
                >
                  {inventoryData.map((entry, index) => {
                    const displayValue = formatValue(entry.value);
                    const color = COLORS[index % COLORS.length];

                    return (
                      <div
                        key={`legend-item-${index}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: 14,
                          color: "#2E3A59",
                          lineHeight: 1.2,
                        }}
                      >
                        {/* Colored marker with slight border-radius */}
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            backgroundColor: color,
                            borderRadius: 3,
                            marginRight: 6,
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "13vw",
                          }}
                        >
                          <div
                            style={{
                              color: "#00000",
                              fontWeight: 600,
                              fontSize: "13px",
                            }}
                          >
                            {entry.name}
                          </div>
                          <div
                            style={{
                              color: "#00000",
                              fontWeight: 600,
                              fontSize: "13px",
                            }}
                          >
                            {displayValue} ({entry.percentage})%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={style.totalLabel}>
                  <span>Total</span>
                  <h2>33K</h2>
                </div>
              </div>
            </div>
          </div>
          <div className={style.right}>
            {/* ===== 1. Patient Overview Section ===== */}
            <section className={style.patientOverview}>
              <div className={style.title}>
                <h3 className={style.sectionTitle}>Patient Overview</h3>
                <div className={style.drop}>
                  <select
                    className={style.dropdown}
                    value={filter}
                    onChange={handleFilterChange}
                  >
                    <option value="month">This Month</option>
                    <option value="week">This Week</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
              </div>
              <div className={style.overviewCards}>
                <div className={style.card}>
                  {/*<UserIcon className={style.cardIcon}/>*/}
                  <div className={style.cardInfo}>
                    <svg
                      width="31"
                      height="31"
                      viewBox="0 0 31 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_3883_12012)">
                        <path
                          d="M28.1275 14.4338V16.5976H2.88V8.84009H0.5V24.3576H2.88V20.8113H28.1275V24.6538H30.5V14.4313L28.1275 14.4338Z"
                          fill="#25307F"
                        />
                        <path
                          d="M11.3864 14.4563C11.3864 15.1613 10.8151 15.7338 10.1089 15.7338H5.24137C5.07351 15.7341 4.90724 15.7013 4.7521 15.6372C4.59696 15.5731 4.456 15.479 4.33731 15.3603C4.21861 15.2416 4.12453 15.1007 4.06044 14.9455C3.99636 14.7904 3.96354 14.6241 3.96387 14.4563V14.4538C3.96387 13.7488 4.53512 13.1762 5.24137 13.1762H10.1089C10.8139 13.1762 11.3864 13.7475 11.3864 14.4538V14.4563ZM25.1789 9.455H22.2164V6.5H20.1164V9.45625H17.1601V11.5563H20.1151V14.5125H22.2151V11.5563H25.1776L25.1789 9.455Z"
                          fill="#25307F"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3883_12012">
                          <rect
                            width="30"
                            height="30"
                            fill="white"
                            transform="translate(0.5 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <span className={style.cardNumber}>
                      {patientOverview?.admitted ?? 0}
                    </span>
                    <span className={style.cardLabel}>Admitted</span>
                  </div>
                </div>
                <div className={style.card}>
                  {/*<BedIcon className={style.cardIcon}/>*/}
                  <div className={style.cardInfo}>
                    <svg
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.75 26.25V3.75H19.25V26.25H13V20H8V26.25H1.75ZM6.75 16.25H9.25V13.75H6.75V16.25ZM6.75 11.25H9.25V8.75H6.75V11.25ZM11.75 16.25H14.25V13.75H11.75V16.25ZM11.75 11.25H14.25V8.75H11.75V11.25ZM24.875 19.375L23.125 17.625L24.4688 16.25H20.5V13.75H24.4688L23.125 12.375L24.875 10.625L29.25 15L24.875 19.375Z"
                        fill="#EAA000"
                      />
                    </svg>
                    <span className={style.cardNumber}>
                      {patientOverview?.discharged ?? 0}
                    </span>
                    <span className={style.cardLabel}>Discharged</span>
                  </div>
                </div>
                <div className={style.card}>
                  {/*<CalendarIcon className={style.cardIcon}/>*/}
                  <div className={style.cardInfo}>
                    <svg
                      width="31"
                      height="30"
                      viewBox="0 0 31 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.5 17.5C19.4583 17.5 18.5729 17.1354 17.8438 16.4062C17.1146 15.6771 16.75 14.7917 16.75 13.75C16.75 12.7083 17.1146 11.8229 17.8438 11.0938C18.5729 10.3646 19.4583 10 20.5 10C21.5417 10 22.4271 10.3646 23.1562 11.0938C23.8854 11.8229 24.25 12.7083 24.25 13.75C24.25 14.7917 23.8854 15.6771 23.1562 16.4062C22.4271 17.1354 21.5417 17.5 20.5 17.5ZM13 25V22.625C13 22.1875 13.1042 21.7708 13.3125 21.375C13.5208 20.9792 13.8125 20.6667 14.1875 20.4375C15.125 19.875 16.12 19.4533 17.1725 19.1725C18.225 18.8917 19.3342 18.7508 20.5 18.75C21.6658 18.7492 22.7754 18.89 23.8288 19.1725C24.8821 19.455 25.8767 19.8767 26.8125 20.4375C27.1875 20.6667 27.4792 20.9792 27.6875 21.375C27.8958 21.7708 28 22.1875 28 22.625V25H13ZM4.25 17.5V15H14.25V17.5H4.25ZM4.25 7.5V5H19.25V7.5H4.25ZM14.375 12.5H4.25V10H15.5C15.2083 10.3542 14.9742 10.7396 14.7975 11.1562C14.6208 11.5729 14.48 12.0208 14.375 12.5Z"
                        fill="#2E823B"
                      />
                    </svg>
                    <span className={style.cardNumber}>
                      {patientOverview?.scheduled ?? 0}
                    </span>
                    <span className={style.cardLabel}>Scheduled</span>
                  </div>
                </div>
              </div>
            </section>

            <div className={style.parent2}>
              {/* ===== 2. Statistics Section ===== */}
              <section className={style.statisticsSection}>
                <h3 className={style.sectionTitle}>Statistics</h3>
                <div className={style.statsList}>
                  <div className={style.statItem}>
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 20V17.2C4 16.6333 4.146 16.1127 4.438 15.638C4.73 15.1633 5.11733 14.8007 5.6 14.55C6.63333 14.0333 7.68333 13.646 8.75 13.388C9.81667 13.13 10.9 13.0007 12 13C12.3333 13 12.6667 13.0127 13 13.038C13.3333 13.0633 13.6667 13.1007 14 13.15V20H4ZM12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 24V19H16V13H22L20 17H22L18 24Z"
                          fill="#25307F"
                        />
                      </svg>
                      <span className={style.statLabel}>Total Patients:</span>
                    </div>
                    <span className={style.statValue}>{totalPatients}</span>
                  </div>
                  <div className={style.statItem}>
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 18V8.5C21 8.10218 20.842 7.72064 20.5607 7.43934C20.2794 7.15804 19.8978 7 19.5 7H15.5C15.1022 7 14.7206 7.15804 14.4393 7.43934C14.158 7.72064 14 8.10218 14 8.5V18M10 18V12H4C3.73478 12 3.48043 12.1054 3.29289 12.2929C3.10536 12.4804 3 12.7348 3 13V18"
                          stroke="#25307F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 12H21V14H3V13C3 12.7348 3.10536 12.4804 3.29289 12.2929C3.48043 12.1054 3.73478 12 4 12Z"
                          stroke="#25307F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={style.statLabel}>
                        Total Beds Available :
                      </span>
                    </div>
                    <span className={style.statValue}>{totalBeds}</span>
                  </div>
                  <div className={style.statItem}>
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.00001 20C4.85801 20 4.73934 19.952 4.64401 19.856C4.54867 19.76 4.50067 19.641 4.50001 19.499C4.49934 19.357 4.54734 19.2383 4.64401 19.143C4.74067 19.0477 4.85934 19 5.00001 19H6.50001V4.808C6.50001 4.57934 6.57734 4.38734 6.73201 4.232C6.88667 4.07667 7.07867 3.99934 7.30801 4H13.462C13.6907 4 13.8823 4.07734 14.037 4.232C14.1917 4.38667 14.269 4.57867 14.269 4.808V5H16.692C16.9213 5 17.1133 5.07734 17.268 5.232C17.4227 5.38667 17.5 5.57867 17.5 5.808V19H19C19.1413 19 19.26 19.048 19.356 19.144C19.452 19.24 19.5 19.359 19.5 19.501C19.5 19.643 19.452 19.7617 19.356 19.857C19.26 19.9523 19.1413 20 19 20H17.317C17.079 20 16.8833 19.9227 16.73 19.768C16.5767 19.6133 16.5 19.4213 16.5 19.192V6H14.27V19.192C14.27 19.4213 14.1923 19.6133 14.037 19.768C13.8817 19.9227 13.69 20 13.462 20H5.00001ZM12.27 12C12.27 11.7933 12.1933 11.6133 12.04 11.46C11.8867 11.3067 11.7067 11.23 11.5 11.23C11.2933 11.23 11.1133 11.3067 10.96 11.46C10.8067 11.6133 10.73 11.7933 10.73 12C10.73 12.2067 10.8067 12.3867 10.96 12.54C11.1133 12.6933 11.2933 12.77 11.5 12.77C11.7067 12.77 11.8867 12.6933 12.04 12.54C12.1933 12.3867 12.27 12.2067 12.27 12Z"
                          fill="#25307F"
                        />
                      </svg>
                      <span className={style.statLabel}>
                        Total Rooms Available :
                      </span>
                    </div>
                    <span className={style.statValue}>{totalRooms}</span>
                  </div>
                </div>
              </section>

              {/* ===== 3. Cases Bar Section ===== */}
              <section className={style.casesSection}>
                <div className={style.casesHeader}>{totalCases} cases</div>
                <div className={style.casesTop}>
                  <p className={style.caseLabel}>
                    <span>{ipdCount}</span> IPD
                  </p>
                  <p className={style.caseLabel}>
                    <span>{opdCount}</span> OPD
                  </p>
                </div>
                <div className={style.casesContent}>
                  <div className={style.progressBar}>
                    <div
                      className={style.progressInner}
                      style={{
                        width: `${ipdPercent}%` /* e.g. 122/466 total = 26% */,
                      }}
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* ===== 4. Alerts & Notifs Section ===== */}
            <section className={style.alertsSection}>
              <h4 className={style.alertsTitle}>Alerts and Notifs</h4>
              <div className={style.alertsList}>
                <span className={style.alertItem}>
                  Doctors: <strong>12</strong>
                </span>
                <span className={style.alertItem}>
                  Patients: <strong>45</strong>
                </span>
                <span className={style.alertItem}>
                  Rooms: <strong>8</strong>
                </span>
                <span className={style.alertItem}>
                  Beds: <strong>24</strong>
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Department;
