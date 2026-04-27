import React, { useEffect, useRef, useState } from "react";
import styles from "./sidebar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import adi from "../../pages/receptionist/Settings/Settings.module.scss";
import Logout from "../../pages/receptionist/Settings/Logout.jsx";
import DoctorNotesPopup from "./DoctorNotesPopup.jsx";
import { useMediaQuery } from "@mui/material";
import MobileBottomNav from "./MobileBottomNav.jsx";
import { Menu, X } from "lucide-react";
import Logo from "../Logo/index.jsx";
import { height, margin, width } from "@mui/system";

const roleOptions = {
  receptionist: [
    { title: "Overview", path: "/receptionist" },
    { title: "Speak Bot", path: "/receptionist/bot" }, // Bot new changes
    { title: "Patients", path: "/receptionist/patients" },
    { title: "Departments", path: "/receptionist/departments" },
    { title: "Settings", path: "/receptionist/settings" },
  ],
  admin: [
    { title: "Overview", path: "/admin" },
    { title: "Reception", path: "/admin/reception" },
    { title: "Departments", path: "/admin/departments" },
    { title: "TPA", path: "/admin/tpa" },
    { title: "Reports", path: "/admin/reports" },
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
    { title: "Patient", path: "/doctor/patientList" },
    { title: "Department", path: "/doctor/department" },
    { title: "Settings", path: "/doctor/settings" },
  ],
};
const mobileReceptionistNav = [
  { title: "Overview", path: "/receptionist", key: "overview" },
  { title: "Billing", path: "/receptionist/billing", key: "billing" },
  { title: "Patients", path: "/receptionist/patients", key: "patients" },
  { title: "Logout", action: "logout", key: "logout" },
];

const Sidebar = ({ role, onOpenAppointment, onCloseAppointment }) => {
  const isMobile = useMediaQuery("(max-width:480px)");

  const isTablet = useMediaQuery("(min-width:481px) and (max-width:1024px)");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogout, setIsLogout] = useState(false);

  const [showDoctorNotes, setShowDoctorNotes] = useState(false);
  const buttonRef = useRef(null);

  // Get side options based on role
  const sideOptions = React.useMemo(() => {
    if (isMobile && role === "receptionist") {
      return mobileReceptionistNav;
    }
    return roleOptions[role] || [];
  }, [role, isMobile]);

  const isSettingsPage = location.pathname.includes("settings");

  // Sync activeIndex with the current route
  useEffect(() => {
    if (!role || sideOptions.length === 0) return;

    const currentPath = location.pathname;

    // Step 1: Try exact match first
    let matchedIndex = sideOptions.findIndex(
      (option) => option.path === currentPath,
    );

    // Step 2: If not exact match, try to find the most specific (longest) matching path
    if (matchedIndex === -1) {
      let longestMatchLength = 0;

      sideOptions.forEach((option, index) => {
        if (
          currentPath.startsWith(option.path) &&
          option.path.length > longestMatchLength
        ) {
          longestMatchLength = option.path.length;
          matchedIndex = index;
        }
      });
    }

    if (matchedIndex !== -1) {
      setActiveIndex(matchedIndex);
    }
  }, [location.pathname, role, sideOptions]);

  // Runs whenever the route changes

  const handleClick = (index, option) => {
    if (option.action === "logout") {
      setIsLogout(true);
      return;
    }
    navigate(option.path);
    if (isTablet) setIsDrawerOpen(false); // ← add this
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

  const [showChildPopup, setShowChildPopup] = useState(false);
  const popupRef = useRef(null);
  const [childPopupPosition, setChildPopupPosition] = useState({
    left: 550,
  });

  const hospitalName = localStorage.getItem("hospitalName");
  const hospitalImage = localStorage.getItem("hospitalImage");
  // console.log(hospitalName)

  return (
    <>
      {" "}
      {/* MOBILE RECEPTIONIST → Bottom Nav ONLY */}
      {isMobile && role === "receptionist" ? (
        <MobileBottomNav
          activePath={location.pathname}
          onNavigate={navigate}
          onLogout={() => setIsLogout(true)}
          onOpenAppointment={onOpenAppointment}
          onCloseAppointment={onCloseAppointment}
        />
      ) : (
        <>
          {/* Tablet hamburger top bar */}
          {isTablet && (
            <div className={styles.tabletTopBar}>
              <button
                className={styles.hamburgerBtn}
                onClick={() => setIsDrawerOpen((prev) => !prev)}
              >
                {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}

          {/* Backdrop overlay (tablet only) */}
          {isTablet && isDrawerOpen && (
            <div
              className={styles.overlay}
              onClick={() => setIsDrawerOpen(false)}
            />
          )}

          {/* Sidebar — normal on desktop, drawer on tablet */}
          <div
            className={`${styles.sidebar} ${
              isTablet ? styles.drawerSidebar : ""
            } ${isTablet && isDrawerOpen ? styles.open : ""}`}
            style={{
              width: isTablet ? undefined : "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: isTablet ? "100vh" : "86.7vh",
              overflowY: "auto",
            }}
          >
            {isTablet && <Logo style={{}} />}

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
            {!isMobile &&
              activeIndex ===
                sideOptions.findIndex(
                  (option) => option.title === "Settings",
                ) && (
                <div className={adi.side_panel}>
                  <Box>
                    <Typography
                      variant="body1"
                      onClick={() => handleSubClick("")}
                      gutterBottom
                      className={`${
                        activeSub === "" ? adi.selected : "option"
                      }`}
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
                zIndex: 1, //
              }}
            >
              {!isMobile && role === "doctor" && !isSettingsPage && (
                <div
                  style={{ position: "relative", margin: "0 25px 10px 25px" }}
                >
                  <div
                    ref={buttonRef}
                    onClick={() => setShowDoctorNotes((prev) => !prev)}
                    style={{
                      backgroundColor: "#cde8e1",
                      color: "#25307F",
                      height: "140px",
                      border: "none",
                      cursor: "pointer",
                      width: "100%",
                      fontWeight: 600,
                      boxShadow: "0px 0px 3px 0px #00000036",
                      position: "relative",
                    }}
                  >
                    <p
                      style={{
                        padding: "1rem 0rem 0rem 1rem",
                      }}
                    >
                      Doctor Notes
                    </p>
                    <svg
                      style={{
                        position: "absolute",
                        bottom: "0px",
                        left: "0px",
                        cursor: "pointer",
                      }}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 0H20V20L0 0Z"
                        fill="black"
                        fillOpacity="0.2"
                      />
                    </svg>
                    <svg
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        pointerEvents: "none",
                        zIndex: 1, // ensure it stays behind the button
                      }}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0,40 L0,0 L40,40 Z" fill="white" />
                    </svg>
                  </div>
                  {showDoctorNotes && (
                    <DoctorNotesPopup
                      anchorRef={buttonRef}
                      onClose={() => {
                        setShowDoctorNotes(false);
                        setShowChildPopup(false);
                      }}
                      onAdd={() => setShowChildPopup(true)}
                      disableAdd={showChildPopup}
                      popupRef={popupRef}
                    />
                  )}
                  {showChildPopup && (
                    <DoctorNotesPopup
                      anchorRef={buttonRef}
                      onClose={() => setShowChildPopup(false)}
                      onAdd={() => {}}
                      disableAdd={true}
                      popupRef={null}
                      // override position manually
                      customStyle={{
                        left: childPopupPosition.left,
                      }}
                    />
                  )}
                </div>
              )}

              {!isMobile && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "6px",
                    paddingTop: "6px",
                    borderTop: "1px solid #E2E2E2 ",
                    zIndex: -1,
                  }}
                >
                  <div style={{ display: "flex", gap: 12, marginLeft: "25px" }}>
                    {/* <img
                      style={{ width: "3.8rem", height: "3.8rem" }}
                      src={hospitalImage}
                      alt="Sai Asha"
                    /> */}
                    <div style={{ padding: "9px" }}>
                      <p
                        style={{
                          color: "#25307F",
                          fontWeight: 600,
                          fontSize: "15px",
                        }}
                      >
                        {hospitalName?.toUpperCase()}
                      </p>
                      <p style={{ color: "#878787", fontSize: "12px" }}>
                        You will be fine...
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {isLogout && <Logout isLogout={isLogout} setIsLogout={setIsLogout} />}
    </>
  );
};
export default Sidebar;
