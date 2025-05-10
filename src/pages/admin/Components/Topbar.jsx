import React from "react";
import { Box, Typography, Button, Breadcrumbs } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ReceiptIcon from "@mui/icons-material/Receipt";
import EditIcon from "@mui/icons-material/Edit";
import { Link} from "react-router-dom";


const Topbar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "10vh",
        margin:"0rem 2.5rem",
        px: 2,
        backgroundColor: "#F1F1F1",
      }}
    >
      {/* Left Section */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">
          Patient List
        </Link>
        <Typography color="text.primary">Jasmine Kaur</Typography>
        <Typography color="text.primary">XXXXXX</Typography>
      </Breadcrumbs>

      {/* Right Section */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button 
          variant="contained"
          startIcon={<PrintIcon sx={{color:"#253080"}} />}
          sx={{ textTransform: "none", bgcolor:"white", color:"#8E8E8E",'&:focus': { outline: "none" }, }}
          
        >
          Print
        </Button>
        
        <Link to={"/admin/reception/patients/Billing"}>

        <Button
          variant="contained"
          startIcon={<ReceiptIcon   sx={{color:"#253080"}}/>}
          sx={{ textTransform: "none", bgcolor:"white", color:"#8E8E8E",'&:focus': { outline: "none" }, }}
        >
          Billing details
        </Button>
        
        
         </Link>


        <Button
          variant="contained"
          startIcon={<EditIcon   sx={{color:"#253080"}}/>}
          sx={{ textTransform: "none", bgcolor:"white", color:"#8E8E8E",'&:focus': { outline: "none" }, }}
        >
          Edit Patient
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
