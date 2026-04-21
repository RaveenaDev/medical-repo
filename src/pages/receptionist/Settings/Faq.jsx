import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography, Box } from "@mui/material";
import Searchbar from "../../../components/Searchbar/index.jsx";
import Notifications from "../../../components/NotificationFunc/Notification.jsx";

const Faq = () => {
  return (
    <>
      <Box sx={{ width: "100%", padding: "1rem 1rem 1rem 4rem" }}>
        <div
          style={{
            color: "#000",
            fontWeight: 500,
            fontSize: "17px",
            marginBottom: "1rem",
          }}
        >
          Frequently Asked Questions
        </div>

        {[
          {
            question: "How do I schedule a new appointment?",
            answer:
              "To schedule a new appointment, click on the ‘New Appointment’ button, select the patient, type of consultation, doctor, and confirm the time.",
          },
          {
            question:
              "How can I access the system's help or support resources?",
            answer:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
          },
          {
            question: "Can I send appointment reminders to patients?",
            answer:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
          },
          {
            question:
              "How can I check a doctor's availability for a specific date and time?",
            answer:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
          },
          {
            question:
              "What should I do if there is a discrepancy in a patient's payment?",
            answer:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
          },
        ].map((item, index) => (
          <Accordion
            key={index}
            sx={{
              marginBottom: "0.5rem",
              width: "96%",
              boxShadow: "none",
              border: "none",
              "&::before": {
                display: "none", // This removes the default top border
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon sx={{ color: "#25307F", fontSize: "1.7rem" }} />
              }
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
              sx={{
                color: "#25307F",
                fontWeight: 600,
                "&:focus": { outline: "none" },
                "&.Mui-focusVisible": { backgroundColor: "transparent" },
                "& .MuiAccordionSummary-expandIconWrapper": {
                  marginRight: "1rem", // persistently moves icon left
                },
              }}
            >
              {item.question}
            </AccordionSummary>
            <AccordionDetails sx={{ color: "#747474" }}>
              {item.answer}
            </AccordionDetails>
          </Accordion>
        ))}

        <Box
          sx={{
            paddingLeft: "0.8rem",
            marginTop: "1.5rem",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#25307F",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          >
            Add A Question
          </Typography>
          <svg
            style={{ marginLeft: "0.5rem" }}
            width="18"
            height="18"
            viewBox="0 0 21 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.375 11.375V17.5C11.375 17.7321 11.2828 17.9546 11.1187 18.1187C10.9546 18.2828 10.7321 18.375 10.5 18.375C10.2679 18.375 10.0454 18.2828 9.88128 18.1187C9.71719 17.9546 9.625 17.7321 9.625 17.5V11.375H3.5C3.26794 11.375 3.04538 11.2828 2.88128 11.1187C2.71719 10.9546 2.625 10.7321 2.625 10.5C2.625 10.2679 2.71719 10.0454 2.88128 9.88128C3.04538 9.71719 3.26794 9.625 3.5 9.625H9.625V3.5C9.625 3.26794 9.71719 3.04538 9.88128 2.88128C10.0454 2.71719 10.2679 2.625 10.5 2.625C10.7321 2.625 10.9546 2.71719 11.1187 2.88128C11.2828 3.04538 11.375 3.26794 11.375 3.5V9.625H17.5C17.7321 9.625 17.9546 9.71719 18.1187 9.88128C18.2828 10.0454 18.375 10.2679 18.375 10.5C18.375 10.7321 18.2828 10.9546 18.1187 11.1187C17.9546 11.2828 17.7321 11.375 17.5 11.375H11.375Z"
              fill="#25307F"
            />
          </svg>
        </Box>
      </Box>
    </>
  );
};

export default Faq;
