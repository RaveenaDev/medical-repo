import React from "react";

const PersonalInfo = ({ patient }) => {
  const tables = [
    {
      labels: ["Gender", "Birthday", "Phone Number"],
      values: [patient.gender, patient.birthday, patient.phone],
    },
    {
      labels: ["Address", "Case ID", "Assessed by"],
      values: [
        patient.address,
        patient.appointments[patient.appointments.length - 1]?.caseId ||
          "Not Assigned",
        patient.appointments[patient.appointments.length - 1]?.doctorName ||
          "Not Assigned",
      ],
    },
    {
      labels: ["Member status", "Registered Date"],
      values: [
        patient.status,
        new Date(patient.registrationDate).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      ],
    },
  ];

  return (
    <div style={{maxWidth: "600px", margin: "auto" }}>
      {tables.map((section, index) => (
        <React.Fragment key={index}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              padding: "10px",
              paddingBottom: '18px',
              borderRadius: "8px",
              marginTop: '8px'
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
                    fontWeight: "600",
                    color: "#1A1A1A",
                    width: "9rem",
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
