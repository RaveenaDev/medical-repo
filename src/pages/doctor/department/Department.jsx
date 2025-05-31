import React, { useState } from 'react';
import CommonPanel from "../components/CommonPanel.jsx";
import style from './Department.module.scss';

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
                        <div>Center Row 1</div>
                        <div>Center Row 2</div>
                    </div>
                    <div className={style.right}>
                        <div>Right Row 1</div>
                        <div>Right Row 2</div>
                        <div>Right Row 3</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Department;
