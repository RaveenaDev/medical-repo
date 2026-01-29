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
    <>
      {/* PLUS FAB */}
      <Fab
        color="primary"
        onClick={onOpenAppointment}
        sx={{
          position: "fixed",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1300,
        }}
      >
        <AddIcon />
      </Fab>

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
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
    </>
  );
};

export default MobileBottomNav;
