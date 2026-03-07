import { Box, Typography, Chip, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileAppointmentCard = ({ appointment, onMenuClick }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "Ongoing":
        return "#3DB461";
      case "Completed":
        return "#EAA000";
      case "Scheduled":
        return "#25307F";
      case "Waiting":
        return "#757575";
      default:
        return "#999";
    }
  };
  const handleClick = (patient) => {
    const latestAppointment =
      patient.appointments?.[patient.appointments.length - 1];
    const caseId = latestAppointment?.caseId || "Not Assigned";
    navigate("/receptionist/patients/profile", { state: { patient, caseId } });
  };
  return (
    <Box
      onClick={() => setExpanded((p) => !p)}
      sx={{
        background: "#fff",
        borderRadius: "12px",
        p: 1.5,
        mb: 1.2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
      >
        <Box
          sx={{
            minWidth: 0,
            flex: 1, // take remaining space
          }}
        >
          <Typography
            fontSize="15px"
            fontWeight={600}
            onClick={() => handleClick(appointment.patient)}
            sx={{ cursor: "pointer" }}
          >
            {appointment.patient.name}
          </Typography>
          <Typography fontSize="12px" color="gray">
            Case: {appointment.caseId}
          </Typography>
          <Typography
            fontSize="12px"
            color="gray"
            sx={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            Bill Status:
            <Typography
              fontSize="12px"
              sx={{
                color:
                  appointment.billStatus === "Paid"
                    ? "white"
                    : appointment.billStatus === "Pending"
                    ? "#EAA000"
                    : appointment.billStatus === "No Bill"
                    ? "#25307F"
                    : "#757575",
              }}
            >
              {appointment.billStatus || "N/A"}
            </Typography>
          </Typography>
        </Box>

        {/* Status + 3-dot menu */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            gap: "4px",
          }}
        >
          <Chip
            label={appointment.status}
            size="small"
            sx={{
              bgcolor: getStatusColor(appointment.status),
              color: "white",
              fontSize: "11px",
              fontWeight: 600,
            }}
          />

          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation(); // prevent expand toggle
              onMenuClick(e, appointment);
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Meta */}
      <Typography fontSize="13px" mt={0.5}>
        {appointment.doctor?.name || "—"} •{" "}
        {appointment?.tokenDate
          ? new Date(appointment.tokenDate).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A"}
      </Typography>

      {/* Expanded info */}
      {expanded && (
        <Box mt={1}>
          <Typography fontSize="13px">
            <b>Department:</b> {appointment.department?.name || "—"}
          </Typography>
          <Typography fontSize="13px">
            <b>Visit:</b> {appointment.typeVisit || "—"}
          </Typography>
          <Typography fontSize="13px">
            <b>Token:</b> {appointment.tokenNumber || "N/A"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MobileAppointmentCard;
