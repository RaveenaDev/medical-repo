import React from "react";
import Tooltip from "@mui/material/Tooltip";
import styles from "./PersonalInfo.module.scss";
import { Box, CircularProgress } from "@mui/material";

const PersonalInfo = ({ patient }) => {
  const tables = [
    {
      labels: ["Gender", "Birthday", "Phone Number"],
      values: [patient.gender, patient.birthday, patient.phone],
      cols: 3,
    },
    {
      labels: ["Registered Date", "Pat ID", "Assessed by"],
      values: [
        new Date(patient.registrationDate).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        patient.patId || "Not Assigned",
        patient.appointments[patient.appointments.length - 1]?.doctorName ||
          "Not Assigned",
      ],
      cols: 3,
    },
    {
      labels: ["Address", "Member status"],
      values: [patient.address, patient.status],
      cols: 2,
    },
  ];
  const capitalize = (str) => {
    if (!str || typeof str !== "string") return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className={styles.container}>
      {!patient ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "36vh", // or full height you need
          }}
        >
          <CircularProgress sx={{ color: "#25307F" }} size={45} />
        </Box>
      ) : (
        <>
          {tables.map((section, index) => (
            <React.Fragment key={index}>
              <div
                className={`${styles.section} ${
                  section.cols === 3 ? styles.cols3 : styles.cols2
                }`}
              >
                {section.labels.map((label, i) => (
                  <div key={i} className={styles.item}>
                    <p className={styles.label}>{label}</p>

                    <Tooltip title={section.values[i] || ""} arrow>
                      <p className={styles.value}>
                        {capitalize(section.values[i])}
                      </p>
                    </Tooltip>
                  </div>
                ))}
              </div>

              {index < tables.length - 1 && (
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "#ddd",
                    margin: "12px 0",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default PersonalInfo;
