import React from "react";
import { Box, Button, Tooltip } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./departments.module.scss";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";

const DepartCard = ({ department, index }) => {
  const navigate = useNavigate();
  const handleClick = (departmentId) => {
    // Redirect to the specific page
    navigate(`/receptionist/departments/departDetails`, {
      state: { departmentId },
    });
  };

  const handleClickMessage = (e) => {
    e.stopPropagation(); // Prevents card click event from firing
    window.open(
      `mailto:${department?.departmentHead?.email}?subject=Appointment Details&body=Hello, here are your appointment details.`,
      "_blank"
    );
  };

  const handleClickContact = (e) => {
    e.stopPropagation(); // Prevent navigation from firing
    // You can add further functionality here
  };

  const colors = ["#EAAA00", "#66A7B4", "#2E823B", "#F14400", "#5461BE"];

  // Get color based on the department index
  const getSequentialColor = (index) => {
    return colors[index % colors.length];
  };

  return (
    <Box
      className={styles.cardContainer}
      onClick={() => handleClick(department.departmentId)}
    >
      <div className={styles.cardHeader}>
        <div className={styles.titleContainer}>
          <div
            className={styles.circle}
            style={{ backgroundColor: getSequentialColor(index) }}
          ></div>
          <h2 className={styles.title}>{department.departmentName}</h2>
          <span className={styles.arrow}>
            <ArrowForwardIosIcon fontSize="small" />
          </span>
        </div>
        <div className={styles.icons}>
          <Button
            className={styles.message}
            onClick={handleClickMessage}
            sx={{
              outline: "none",
              boxShadow: "none",
              "&:focus": { outline: "none" },
              minWidth: "auto",
              width: "40px",
              height: "30px",
            }}
          >
            <Tooltip
              title={department?.departmentHead?.email || "No email available"}
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "rgba(37, 48, 127, 0.75)",
                    color: "white",
                    fontSize: "12px",
                    padding: "8px",
                    borderRadius: "8px",
                    // backdropFilter: "blur(15px)",
                  },
                },
                arrow: {
                  sx: {
                    color: "rgba(37, 48, 127, 0.8)",
                  },
                },
              }}
            >
              <span>
                <EmailIcon />
              </span>
            </Tooltip>
          </Button>

          <Button
            className={styles.phone}
            onClick={handleClickContact}
            sx={{
              outline: "none",
              boxShadow: "none",
              "&:focus": { outline: "none" },
              minWidth: "auto",
              width: "40px",
              height: "30px",
            }}
          >
            <Tooltip
              title={department?.departmentHead?.phone || "No phone available"}
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "rgba(46, 130, 59, 0.75)", // 85% opacity (green)
                    color: "white",
                    fontSize: "12px",
                    padding: "8px",
                    borderRadius: "8px",
                    // backdropFilter: "blur(5px)", // Optional blur effect
                  },
                },
                arrow: {
                  sx: {
                    color: "rgba(46, 130, 59, 0.85)", // Match tooltip background
                  },
                },
              }}
            >
              <span>
                <PhoneIcon />
              </span>
            </Tooltip>
          </Button>
        </div>
      </div>

      <div className={styles.detailsContainer}>
        <div className={styles.details}>
          <p className={styles.name}>Department Head:</p>
          <p className={styles.value}>
            {department?.departmentHead.name || "Not Assigned"}
          </p>
        </div>
        <div className={styles.details}>
          <p className={styles.name}>Patients Present:</p>
          <p className={styles.value}>
            {department?.totalPatients || "Not Assigned"}
          </p>
        </div>
        <div className={styles.details}>
          <p className={styles.name}>Total Doctors:</p>
          <p className={styles.value}>{department.doctors.length}</p>
        </div>
        <div className={styles.details}>
          <p className={styles.name}>Specialist Doctors:</p>
          <p className={styles.value}>{department.specialistDocs.length}</p>
        </div>
        <div className={styles.details}>
          <p className={styles.name}>Total Nurses:</p>
          <p className={styles.value}>{department.totalNurses}</p>
        </div>
        <div className={styles.details}>
          <p className={styles.name}>Active Services:</p>
          {department.activeServices.length > 0 ? (
            <p className={styles.value}>{department.activeServices[0]}...</p>
          ) : (
            <p className={styles.value}>No Services</p>
          )}
        </div>
      </div>
    </Box>
  );
};
export default DepartCard;
