import { Tooltip } from "@mui/material";
import React from "react";

const PersonalInfo = ({ patient }) => {
  const tables = [
    {
      labels: ["Gender", "Birthday", "Phone Number"],
      values: [patient.gender, patient.birthday, patient.phone],
    },
    {
      labels: ["Registered Date", "Case ID", "Assessed by"],
      values: [
        new Date(patient.registrationDate).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),

        patient.appointments[patient.appointments.length - 1]?.caseId ||
          "Not Assigned",
        patient.appointments[patient.appointments.length - 1]?.doctorName ||
          "Not Assigned",
      ],
    },
    {
      labels: ["Address", "Member status"],
      values: [patient.address, patient.status],
    },
  ];
  const capitalize = (str) => {
    if (!str || typeof str !== "string") return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
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
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  padding: "10px 5px",
                  paddingBottom: "18px",
                  borderRadius: "8px",
                  marginTop: "8px",
                }}
              >
                {section.labels.map((label, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#4A4A4A",
                        marginBottom: "5px",
                      }}
                    >
                      {label}
                    </p>
                    <Tooltip title={section.values[i] || ""} arrow>
                      <p
                        style={{
                          fontSize: "15px",
                          fontWeight: "600",
                          color: "#1A1A1A",
                          width: "8.2rem",
                        }}
                      >
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
                    margin: "10px 0",
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
