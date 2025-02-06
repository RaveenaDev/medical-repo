import React, { useEffect, useState } from "react";
import styles from "./sidebar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import adi from "../../pages/receptionist/Settings/Settings.module.scss";
import Logout from "../../pages/receptionist/Settings/Logout.jsx";

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
    { title: "Settings", path: "/admin/settings" },
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
//     {title:"Departments1",path:"/departments"},
//     {title:"Settings",path:"/settings"}
// ]

const Sidebar = ({ role }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogout, setIsLogout] = useState(false);

  // Get side options based on role
  const sideOptions = roleOptions[role] || [];

  // Sync activeIndex with the current route
  useEffect(() => {
    const currentIndex = sideOptions.findIndex(
      (option) => option.path === location.pathname
    );
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname]); // Runs whenever the route changes

  const handleClick = (index, option) => {
    setActiveIndex(index);
    navigate(`${option.path}`);
  };

  const handleSubClick = (path) => {
    if (role === "admin") {
      navigate(`/admin/settings/${path}`);
    } else if (role === "receptionist") {
      navigate(`/receptionist/settings/${path}`);
    } else {
      navigate(`/doctor/settings/${path}`);
    }
  };
  const handlelogout = () => {
    setIsLogout((prev) => !prev);
  };
  return (
    <div className={styles.sidebar} style={{ width: "95%" }}>
      <>
        {sideOptions.map((option, index) => (
          <div
            key={index}
            className={`${styles.sideElement} ${
              activeIndex === index ? styles.active : ""
            }`}
            onClick={() => handleClick(index, option)}
          >
            {option.title}
          </div>
        ))}
      </>

      {/* Conditionally render settings options when "Settings" is active */}
      {activeIndex ===
        sideOptions.findIndex((option) => option.title === "Settings") && (
        <div className={adi.side_panel}>
          <Box>
            <Typography
              variant="body1"
              onClick={() => handleSubClick("")}
              gutterBottom
              sx={{ cursor: "pointer" }}
            >
              FAQ's
            </Typography>
            <Typography
              variant="body1"
              onClick={() => handleSubClick("privacyPolicy")}
              gutterBottom
              sx={{ cursor: "pointer" }}
            >
              Privacy Policy
            </Typography>
            <Typography
              variant="body1"
              onClick={() => handleSubClick("helpAndSupport")}
              gutterBottom
              sx={{ cursor: "pointer" }}
            >
              Help & Support
            </Typography>
            <Typography
              variant="body1"
              onClick={handlelogout}
              sx={{ cursor: "pointer" }}
            >
              Logout
            </Typography>
          </Box>
        </div>
      )}

      {isLogout && <Logout isLogout={isLogout} setIsLogout={setIsLogout} />}
    </div>
  );
};
export default Sidebar;
