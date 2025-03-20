import React, { useEffect, useState } from "react";
import styles from "./sidebar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import adi from "../../pages/receptionist/Settings/Settings.module.scss";
import Logout from "../../pages/receptionist/Settings/Logout.jsx";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
  const [activeSub, setActiveSub] = useState("");

  const handleSubClick = (path) => {
    setActiveSub(path);
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
    <div
      className={styles.sidebar}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "82vh",
      }}
    >
      <div>
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
      </div>

      {/* Conditionally render settings options when "Settings" is active */}
      {activeIndex ===
        sideOptions.findIndex((option) => option.title === "Settings") && (
        <div className={adi.side_panel}>
          <Box>
            <Typography
              variant="body1"
              onClick={() => handleSubClick("")}
              gutterBottom
              className={`${activeSub === "" ? adi.selected : "option"}`}
            >
              <span>FAQ's</span>
            </Typography>
            <Typography
              variant="body1"
              onClick={() => handleSubClick("privacyPolicy")}
              gutterBottom
              className={`${
                activeSub === "privacyPolicy" ? adi.selected : "option"
              }`}
            >
              <span>Privacy Policy</span>
            </Typography>
            <Typography
              variant="body1"
              onClick={() => handleSubClick("helpAndSupport")}
              gutterBottom
              className={`${
                activeSub === "helpAndSupport" ? adi.selected : "option"
              }`}
            >
              <span> Help & Support</span>
            </Typography>
            <Typography
              variant="body1"
              onClick={handlelogout}
              className="option"
            >
              <span>Logout</span>
            </Typography>
          </Box>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "auto",
          paddingBottom: "10px",
          paddingTop: "20px",
          borderTop: "1px solid #E2E2E2 ",
        }}
      >
        <div style={{ display: "flex", gap: 16, marginLeft: "25px" }}>
          <Avatar sx={{ width: 50, height: 50 }} />
          <div style={{ paddingTop: "2px" }}>
            <p style={{ color: "black", fontWeight: 500 }}>Hospital</p>
            <p style={{ color: "#878787", fontSize: "12px" }}>TextField</p>
          </div>
        </div>

        <div style={{ paddingRight: "14px" }}>
          <IconButton>
            <KeyboardArrowDownIcon sx={{ width: 32, height: 32 }} />
          </IconButton>
        </div>
      </div>

      {isLogout && <Logout isLogout={isLogout} setIsLogout={setIsLogout} />}
    </div>
  );
};
export default Sidebar;
