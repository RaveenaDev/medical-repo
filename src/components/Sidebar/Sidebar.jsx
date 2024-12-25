import React, {useEffect, useState} from 'react'
import styles from "./sidebar.module.scss"
import {useLocation, useNavigate} from "react-router-dom";

const roleOptions = {
    receptionist: [
        { title: "Overview", path: "/receptionist" },
        { title: "Patients", path: "/receptionist/patients" },
        { title: "Departments", path: "/receptionist/departments" },
        { title: "Settings", path: "/receptionist/settings" },
    ],
    admin: [
        { title: "Overview", path: "/admin" },
        { title: "Reception", path: "/admin/reception" },
        { title: "Departments", path: "/admin/departments" },
        { title: "Expenses", path: "/admin/expenses" },
        { title: "Settings", path: "/admin/settings" }
    ],
    patient: [
        { title: "Profile", path: "/patient/profile" },
        { title: "Appointments", path: "/patient/appointments" },
        { title: "Prescriptions", path: "/patient/prescriptions" },
        { title: "Settings", path: "/patient/settings" },
    ],
};

// const sideOptions = [
//     {title:"Overview",path:"/receptionist"},
//     {title:"Patients",path:"patients"},
//     {title:"Departments",path:"/departments"},
//     {title:"Settings",path:"/settings"}
// ]

const Sidebar = ({role}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    // Get side options based on role
    const sideOptions = roleOptions[role] || [];

    // Sync activeIndex with the current route
    useEffect(() => {
        const currentIndex = sideOptions.findIndex(option => option.path === location.pathname);
        if (currentIndex !== -1) {
            setActiveIndex(currentIndex);
        }
    }, [location.pathname]); // Runs whenever the route changes

    const handleClick = (index,option) => {
        setActiveIndex(index);
        navigate(`${option.path}`)
    }
    return (
        <div className={styles.sidebar}>
            <>
                {
                    sideOptions.map((option,index) => (
                        <div key={index} className={`${styles.sideElement} ${activeIndex === index ? styles.active : ''}`}
                            onClick={() => handleClick(index,option)}
                        >
                            {option.title}
                        </div>
                    ))
                }
            </>
        </div>
    )
}
export default Sidebar
