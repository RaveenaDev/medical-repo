import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import PatientHeader from "./components/PatientHeader";

const ProgressReport = () => {
  const sections = [
    {
      title: "Healing Progress",
      items: [
        {
          text: "Incision Healing: The incision is healing well, with minimal redness and swelling. There are no signs of infection.",
        },
        {
          text: "Cardiac Function: The patient's heart rate and blood pressure are within normal limits. Recent echocardiograms show improved left ventricular function.",
        },
        {
          text: "Lung Function: The patient is breathing comfortably and has no shortness of breath. Oxygen saturation levels are consistently above 95%.",
        },
        {
          text: "Activity Level: The patient is gradually increasing her activity level. She can walk short distances without fatigue.",
        },
        {
          text: "Pain Management: The patient's pain is well-controlled with pain medication. There are no significant side effects.",
        },
        {
          text: "Wound Care: The incision is being dressed daily. There are no complications related to wound care.",
        },
      ],
    },
    {
      title: "Goals",
      items: [
        { text: "Return to work within 4-6 weeks." },
        {
          text: "Resume normal activities, including exercise, within 2-3 months.",
        },
        {
          text: "Improve overall heart health and prevent future cardiovascular events.",
        },
      ],
    },
    {
      title: "Next Steps",
      items: [
        { text: "Follow-up appointment with the cardiologist in 2 weeks." },
        { text: "Cardiac rehabilitation program starting in 3 weeks." },
        {
          text: "Regular monitoring of blood pressure, blood sugar, and cholesterol levels.",
        },
      ],
    },
  ];

  return (
    <>
      <PatientHeader showEditPatients={false} />
      <Box
        sx={{
          padding: "24px",
          margin: "auto",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {sections.map((section, index) => (
          <Box key={index} sx={{ marginBottom: "1px" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#25307F", marginBottom: "2px" }}
            >
              {section.title}
            </Typography>
            <List sx={{ paddingLeft: "16px" }}>
              {section.items.map((item, itemIndex) => (
                <ListItem
                  key={itemIndex}
                  sx={{
                    display: "list-item",
                    listStyleType: "disc",
                    paddingLeft: "0",
                    paddingBottom: "4px",
                    paddingTop: "4px",
                  }}
                >
                  <ListItemText
                    secondary={item.text}
                    secondaryTypographyProps={{
                      sx: { fontSize: "14px", lineHeight: "1.5" },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ProgressReport;
