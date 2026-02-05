import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Fab,
  useMediaQuery,
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
  onCloseAppointment,
}) => {
  const isSmallMobile = useMediaQuery("(max-width:360px)");

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
      {/* FAB */}
      <Fab
        color="primary"
        size={isSmallMobile ? "medium" : "large"}
        onClick={() => {
          if (!activePath.startsWith("/receptionist")) {
            onNavigate("/receptionist");
          } else if (activePath !== "/receptionist") {
            onNavigate("/receptionist");
          }

          requestAnimationFrame(() => {
            onOpenAppointment();
          });
        }}
        sx={{
          position: "fixed",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1300,
          pointerEvents: "auto",
          boxShadow: "0px 6px 16px rgba(0,0,0,0.25)",
        }}
      >
        <AddIcon />
      </Fab>

      {/* Bottom Nav */}
      <Paper
        elevation={12}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          pointerEvents: "auto",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <BottomNavigation
          value={getValue()}
          showLabels
          sx={{
            height: 56,
            "& .MuiBottomNavigationAction-root": {
              minWidth: 0,
              padding: "6px 0",
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: "0.7rem",
            },
          }}
        >
          <BottomNavigationAction
            label="Overview"
            icon={<DashboardIcon fontSize="small" />}
            onClick={() => {
              onCloseAppointment?.();
              onNavigate("/receptionist");
            }}
          />

          <BottomNavigationAction
            label="Billing"
            icon={<ReceiptLongIcon fontSize="small" />}
            onClick={() => onNavigate("/receptionist/billing")}
          />

          {/* FAB spacer (visual only) */}
          <BottomNavigationAction
            disabled
            sx={{
              opacity: 0,
              pointerEvents: "none",
            }}
          />

          <BottomNavigationAction
            label="Patients"
            icon={<PeopleIcon fontSize="small" />}
            onClick={() => onNavigate("/receptionist/patients")}
          />

          <BottomNavigationAction
            label="Logout"
            icon={<LogoutIcon fontSize="small" />}
            onClick={onLogout}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
};

export default MobileBottomNav;
