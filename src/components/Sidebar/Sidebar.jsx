import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./sidebar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import adi from "../../pages/receptionist/Settings/Settings.module.scss";
import Logout from "../../pages/receptionist/Settings/Logout.jsx";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const DoctorNotesPopup = ({ anchorRef, onClose }) => {
  const [position, setPosition] = useState({ top: 100, left: 0 });
  const editorRef = useRef(null);

  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY - 310,
        left: rect.right + window.scrollX - 10,
      });
    }

    const handleClickOutside = (e) => {
      if (!anchorRef.current?.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [anchorRef, onClose]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        execCommand("insertImage", event.target.result);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        width: "400px",
        height: "400px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
        zIndex: 9999999,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          backgroundColor: "#25307F",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "20px", cursor: "pointer" }}>☰</span>
          <span style={{ fontSize: "20px", cursor: "pointer" }}>＋</span>
        </div>
        <span style={{ fontSize: "20px", cursor: "pointer" }} onClick={onClose}>
          ×
        </span>
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "6px 10px",
          borderBottom: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
        }}
      >
        <button onClick={() => execCommand("bold")}>B</button>
        <button onClick={() => execCommand("italic")}>I</button>
        <button onClick={() => execCommand("underline")}>U</button>
        <button
          onClick={() =>
            execCommand("styleWithCSS") ||
            execCommand("foreColor", "#25307F") ||
            execCommand(
              "insertHTML",
              '<span style="text-decoration: overline;">Overline</span>'
            )
          }
        >
          O̅
        </button>
        <button onClick={() => execCommand("insertUnorderedList")}>
          • List
        </button>
        <button onClick={handleImageUpload}>🖼️</button>
      </div>

      {/* Editable Content */}
      <div
        ref={editorRef}
        contentEditable
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
          fontSize: "14px",
          outline: "none",
        }}
        placeholder="Write notes here..."
        suppressContentEditableWarning={true}
      ></div>
    </div>,
    document.body
  );
};

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
  doctor: [
    { title: "Overview", path: "/doctor" },
    { title: "Consultation", path: "/doctor/consultation" },
    { title: "Patient", path: "/doctor/patient" },
    { title: "Department", path: "/doctor/department" },
    { title: "Settings", path: "/doctor/settings" },
  ],
};

const Sidebar = ({ role }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogout, setIsLogout] = useState(false);

  const [showDoctorNotes, setShowDoctorNotes] = useState(false);
  const buttonRef = useRef(null);

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
    } else if (role === "doctor") {
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
        height: "83vh",
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
              <span>Log Out</span>
            </Typography>
          </Box>
        </div>
      )}

      <div
        style={{
          marginTop: "auto",
          paddingBottom: "5px",
          paddingTop: "20px",
          position: "relative", // start a new stacking context
          zIndex: 9999999, // very high
        }}
      >
        {role === "doctor" && (
          <div style={{ position: "relative", margin: "0 25px 10px 25px" }}>
            <button
              ref={buttonRef}
              onClick={() => setShowDoctorNotes((prev) => !prev)}
              style={{
                backgroundColor: "#25307F",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                width: "100%",
                fontWeight: 500,
              }}
            >
              Doctor's Notes
            </button>
            {showDoctorNotes && (
              <DoctorNotesPopup
                anchorRef={buttonRef}
                onClose={() => setShowDoctorNotes(false)}
              />
            )}
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "5px",
            paddingTop: "20px",
            borderTop: "1px solid #E2E2E2 ",
          }}
        >
          <div style={{ display: "flex", gap: 16, marginLeft: "25px" }}>
            <Avatar sx={{ width: 50, height: 50 }} />
            <div style={{ paddingTop: "2px" }}>
              <p style={{ color: "#25307F", fontWeight: 500 }}>Hospital</p>
              <p style={{ color: "#878787", fontSize: "12px" }}>TextField</p>
            </div>
          </div>

          <div style={{ paddingRight: "0.7rem" }}>
            <IconButton
              sx={{
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
            >
              <KeyboardArrowDownIcon sx={{ width: 32, height: 32 }} />
            </IconButton>
          </div>
        </div>
      </div>
      {isLogout && <Logout isLogout={isLogout} setIsLogout={setIsLogout} />}
    </div>
  );
};
export default Sidebar;
