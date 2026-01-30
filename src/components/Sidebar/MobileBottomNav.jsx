import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Fab,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";

const MobileBottomNav = ({
  activePath,
  onNavigate,
  onLogout,
  onOpenAppointment,
}) => {
  const getValue = () => {
    if (activePath.includes("billing")) return 1;
    if (activePath.includes("patients")) return 2;
    return 0;
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1300,
      }}
    >
      {/* PLUS FAB */}
      <Fab
        color="primary"
        onClick={() => {
          // Always go to receptionist root first
          if (!activePath.startsWith("/receptionist")) {
            onNavigate("/receptionist");
          } else if (activePath !== "/receptionist") {
            onNavigate("/receptionist");
          }

          // Open appointment after navigation
          setTimeout(() => {
            onOpenAppointment();
          }, 0);
        }}
        sx={{
          position: "fixed",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1300,
          pointerEvents: "auto",
        }}
      >
        <AddIcon />
      </Fab>

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          pointerEvents: "auto",
        }}
        elevation={12}
      >
        <BottomNavigation value={getValue()}>
          <BottomNavigationAction
            label="Overview"
            icon={<DashboardIcon />}
            onClick={() => onNavigate("/receptionist")}
          />

          <BottomNavigationAction
            label="Billing"
            icon={<ReceiptLongIcon />}
            onClick={() => onNavigate("/receptionist/billing")}
          />

          {/* FAB space */}
          <BottomNavigationAction disabled />

          <BottomNavigationAction
            label="Patients"
            icon={<PeopleIcon />}
            onClick={() => onNavigate("/receptionist/patients")}
          />

          <BottomNavigationAction
            label="Logout"
            icon={<LogoutIcon />}
            onClick={onLogout}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
};

export default MobileBottomNav;
