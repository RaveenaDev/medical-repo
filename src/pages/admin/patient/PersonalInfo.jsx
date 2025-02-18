import React from "react";

const PersonalInfo = ({patient}) => {
  const tables = [
    {
      labels: ["Gender", "Birthday", "Phone Number"],
      values: [patient.gender, patient.birthday, patient.phone],
    },
    {
      labels: ["Address", "Case ID", "Assessed by"],
      values: [patient.address, patient.appointments[patient.appointments.length - 1].caseId, patient.appointments[patient.appointments.length - 1].doctorName],
    },
    {
      labels: ["Member status", "Registered Date"],
      values: [patient.status, patient.registrationDate],
    },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      {tables.map((section, index) => (
        <React.Fragment key={index}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "10px",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            {section.labels.map((label, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "100px",
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
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#1A1A1A",
                    width: "7.8rem"
                  }}
                >
                  {section.values[i]}
                </p>
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
    </div>
  );
};

export default PersonalInfo;
