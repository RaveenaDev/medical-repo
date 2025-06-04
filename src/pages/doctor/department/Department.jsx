import React, { useState } from 'react';
import CommonPanel from "../components/CommonPanel.jsx";
import style from './Department.module.scss';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const doctors = [
    {
        id: 1,
        name: 'Deepak Singh',
        role: 'Doctor',
        avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    },
    {
        id: 2,
        name: 'Raj Malhotra',
        role: 'Practitioner Doctor',
        avatar: 'https://randomuser.me/api/portraits/men/24.jpg',
    },
    {
        id: 3,
        name: 'Chandan Shukla',
        role: 'Junior Doctor',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        id: 4,
        name: 'Anmol Arora',
        role: 'Junior Doctor',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
];

const staffMembers = [
    {
        id: 1,
        name: 'Ritika Bhola',
        role: 'Nurse Manager',
        avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    },
    {
        id: 2,
        name: 'Sonia Kapoor',
        role: 'Receptionist',
        avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
    },
    {
        id: 3,
        name: 'Vikram Joshi',
        role: 'Lab Technician',
        avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    },
    {
        id: 4,
        name: 'Pooja Mehta',
        role: 'Pharmacist',
        avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    },
];

const medicalData = [
    { name: 'Angioplasty', value: 30, color: '#F14400' },
    { name: 'Surgeries',   value: 20, color: '#66A7B4' },
    { name: 'Stenting',    value: 15, color: '#EAA000' },
    { name: 'Pacemaker',   value: 28, color: '#2E823B' }
];

const inventoryData = [
    { name: 'Medicines',         value: 2000, percentage: '49' },
    { name: 'Surgical tools',    value: 150, percentage: '9'  },
    { name: 'Devices',           value: 1000, percentage: '19'  },
    { name: 'Emergency Supplies',value:  105, percentage: '29'  }
];

/* A simple color palette for the Pie chart slices */
const COLORS = ['#25307F', '#5461BE', '#586EB4', '#DAE4FF'];

const Department = () => {
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
            return remainder === 0 ? `${thousands.toFixed(0)}k` : `${thousands.toFixed(1)}k`;
        }
        return val.toString();
    };

    return (
        <>
            <CommonPanel />

            <div className={style.parent}>
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
                                className={`${anyDoctorSelected ? style.assignButton : style.notAssigned}`}
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
                                className={`${anyStaffSelected ? style.assignButton : style.notAssigned}`}
                                disabled={!anyStaffSelected}
                            >
                                Assign
                            </button>
                        </div>
                    </div>

                    <div className={style.center}>
                        {/*** Card 1: Number of medical procedures ***/}
                        <div className={style.card} style={{backgroundColor: '#25307F'}}>
                            <div className={style.cardHeader}>
                                <h3>Number of medical procedures</h3>
                                <div>
                                    <span className={style.subTitle}>This Month</span>
                                    <svg
                                        style={{marginLeft: '4px', transform: 'translateY(3px)'}}
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
                                        <p style={{fontSize: '15px', marginLeft: '6px', fontWeight: '500'}}>cases</p>
                                        <span className={style.percentage}>(+10% last month)</span>
                                    </h1>
                                </div>

                                <ResponsiveContainer height={200}>
                                    <BarChart
                                        data={medicalData}
                                        margin={{top: 20, right: 10, left: -20, bottom: 0}}
                                    >
                                        {/* ─────────── X Axis ─────────── */}
                                        <XAxis
                                            dataKey="name"
                                            tick={{fontSize: 12, fill: '#DAE4FF'}}
                                            axisLine={{stroke: '#475569', strokeWidth: 1}}
                                            tickLine={false}
                                        />

                                        {/* ─────────── Y Axis ─────────── */}
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{fontSize: 12, fill: '#999999'}}
                                        />

                                        {/* ─────────── Horizontal Grid Lines Only (solid) ─────────── */}
                                        <CartesianGrid
                                            horizontal={true}
                                            vertical={false}
                                            stroke="#DAE4FF"    /* a light gray color—adjust as needed */
                                            strokeDasharray=""  /* empty = solid, not dashed */
                                        />

                                        <Tooltip/>

                                        {/* ─────────── Bars with rounded tops ─────────── */}
                                        <Bar dataKey="value" barSize={70} radius={[10, 10, 0, 0]}>
                                            {medicalData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color}/>
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>

                            </div>
                        </div>

                        {/*** Card 2: Cardiology Inventory ***/}
                        <div className={style.card}>
                            <div className={style.cardHeader}>
                                <h3>Cardiology Inventory</h3>
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
                                        >
                                            {inventoryData.map((entry, index) => (
                                                <Cell key={`slice-${index}`} fill={COLORS[index % COLORS.length]}/>
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>

                                {/* ───── Custom legend below ───── */}
                                <div
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'space-between',
                                        gap: 4,
                                        marginTop: 4,
                                        padding: '1rem'
                                    }}
                                >
                                    {inventoryData.map((entry, index) => {
                                        const displayValue = formatValue(entry.value);
                                        const color = COLORS[index % COLORS.length];

                                        return (
                                            <div
                                                key={`legend-item-${index}`}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    fontSize: 14,
                                                    color: '#2E3A59',
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
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    width: '13vw'
                                                }}>
                                                    <div style={{color: '#00000', fontWeight: 600, fontSize: '13px'}}>
                                                        {entry.name}
                                                    </div>
                                                    <div style={{color: '#00000', fontWeight: 600, fontSize: '13px'}}>
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
                            <h3 className={style.sectionTitle}>Patient Overview</h3>
                            <div className={style.overviewCards}>
                                <div className={style.card}>
                                    {/*<UserIcon className={style.cardIcon}/>*/}
                                    <div className={style.cardInfo}>
                                        <span className={style.cardNumber}>24</span>
                                        <span className={style.cardLabel}>Admitted</span>
                                    </div>
                                </div>
                                <div className={style.card}>
                                    {/*<BedIcon className={style.cardIcon}/>*/}
                                    <div className={style.cardInfo}>
                                        <span className={style.cardNumber}>8</span>
                                        <span className={style.cardLabel}>Discharged</span>
                                    </div>
                                </div>
                                <div className={style.card}>
                                    {/*<CalendarIcon className={style.cardIcon}/>*/}
                                    <div className={style.cardInfo}>
                                        <span className={style.cardNumber}>12</span>
                                        <span className={style.cardLabel}>Scheduled</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ===== 2. Statistics Section ===== */}
                        <section className={style.statisticsSection}>
                            <h3 className={style.sectionTitle}>Statistics</h3>
                            <div className={style.statsList}>
                                <div className={style.statItem}>
                                    <span className={style.statLabel}>Total Patients:</span>
                                    <span className={style.statValue}>342</span>
                                </div>
                                <div className={style.statItem}>
                                    <span className={style.statLabel}>Total Beds Available :</span>
                                    <span className={style.statValue}>32</span>
                                </div>
                                <div className={style.statItem}>
                                    <span className={style.statLabel}>Total Rooms Available :</span>
                                    <span className={style.statValue}>9</span>
                                </div>
                            </div>
                        </section>

                        {/* ===== 3. Cases Bar Section ===== */}
                        <section className={style.casesSection}>
                            <div className={style.casesHeader}>1228 cases</div>
                            <div className={style.casesContent}>
                                <span className={style.caseLabel}>122 IPD</span>
                                <div className={style.progressBar}>
                                    <div
                                        className={style.progressInner}
                                        style={{width: '26%' /* e.g. 122/466 total = 26% */}}
                                    />
                                </div>
                                <span className={style.caseLabel}>344 OPD</span>
                            </div>
                        </section>

                        {/* ===== 4. Alerts & Notifs Section ===== */}
                        <section className={style.alertsSection}>
                            <h4 className={style.alertsTitle}>Alerts and Notifs</h4>
                            <div className={style.alertsList}>
                                <span className={style.alertItem}>Doctors: <strong>12</strong></span>
                                <span className={style.alertItem}>Patients: <strong>45</strong></span>
                                <span className={style.alertItem}>Rooms: <strong>8</strong></span>
                                <span className={style.alertItem}>Beds: <strong>24</strong></span>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Department;
