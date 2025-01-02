import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FilterBox from "./Components/FilterBox";
import { Link} from "react-router-dom";


const PatientPanel = () => {

  const[showFilter, setShowFilter] = useState(false);
  
  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#F9FAFB",
        minHeight: "100vh",
        position:"relative"
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ArrowBackIosIcon sx={{ color: "#111827", marginRight: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#111827" }}>
            Patient List
          </Typography>
        </Box>
      </Box>

      {/* Sort and Filter Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ color: "#6B7280", marginRight: 2 }}>
            56 Patients
          </Typography>
          <Box>
            <Typography
              variant="body2"
              sx={{ color: "#6B7280", marginRight: 1, display: "inline" }}
            >
              Sort by:
            </Typography>
            <Select
              value={"Newest to Oldest"}
              sx={{
                height:"40px",
                width:"200px",
                outline:"none",
                border: "none",
                borderRadius: "8px",
                padding: "2px",
                backgroundColor: "#FFFFFF",
              }}
            >
              <MenuItem value="Newest to Oldest">Newest to Oldest</MenuItem>
              <MenuItem value="Oldest to Newest">Oldest to Newest</MenuItem>
            </Select>
          </Box>
        </Box>
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          sx={{
            textTransform: "none",
            color: "#374151",
            borderColor: "#D1D5DB",
            backgroundColor: "#FFFFFF",
          }}

          onClick={()=> setShowFilter((prev) => !prev)}
        >
          Filter
        </Button>

      </Box>
      
        {showFilter && <FilterBox setShowFilter={setShowFilter} />}


      {/* Table Section */}
      <TableContainer component={Paper} sx={{ borderRadius: "8px", boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#F3F4F6" }}>
            <TableRow>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Case Id</TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Phone Number</TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Visit</TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Branch</TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ color: "#6B7280", fontWeight: "bold" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(9)].map((_, index) => (
              <TableRow
                key={index}

                
                sx={{
                  backgroundColor: "#FFFFFF",
                  marginBottom: 2,
                  "&:not(:last-child)": {
                    borderBottom: "16px solid #F9FAFB",
                  },
                }}
              >
                <TableCell>XXXXXXXX</TableCell>
                <TableCell>
                  <Link to={"/PatientDetails"}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "#111827" }}
                  >
                    {index % 2 === 0 ? "Jasimine Kaur" : "Amit Tripathi"}
                  </Typography>
                  </Link>
                  <Typography variant="body2" sx={{ color: "#6B7280" }}>
                    example@gmail.com
                  </Typography>
                </TableCell>
                <TableCell>+91 79327728</TableCell>
                <TableCell>{index % 2 === 0 ? "Walk In" : "Referral"}</TableCell>
                <TableCell>Cardiology</TableCell>
                <TableCell>08-10-2024</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      backgroundColor: "#D1FAE5",
                      padding: "4px 8px",
                      borderRadius: "16px",
                      color: "#059669",
                      textAlign: "center",
                      display: "inline-block",
                      fontSize: "0.875rem",
                      fontWeight: "bold",
                    }}
                  >
                    Active
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <MoreVertIcon sx={{ color: "#9CA3AF" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PatientPanel;