import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CommonPanel from "../components/CommonPanel";

const Appointments = () => {
  const [activeBox, setActiveBox] = useState(1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const boxData = [
    { id: 1, label: "Box 1", count: 15 },
    { id: 2, label: "Box 2", count: 8 },
    { id: 3, label: "Box 3", count: 20 },
    { id: 4, label: "Box 4", count: 12 },
  ];

  const handleBoxClick = (id) => setActiveBox(id);

  const sampleData = Array.from({ length: 25 }, (_, i) => ({
    caseId: `C-${i + 1}`,
    name: `Patient ${i + 1}`,
    doctor: `Dr. XYZ`,
    typeVisit: "General",
    branch: "Main",
    tokenNumber: i + 1,
    status: i % 2 === 0 ? "Active" : "Inactive",
  }));

  const displayedData = sampleData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleBack = () => console.log("Go back");

  return (
    <div style={{ height: "99dvh", overflow: "hidden", background: "#F1F1F1" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          padding: "10px",
          width: "77%",
          background: "#F1F1F1",
          zIndex: 100,
        }}
      >
        <CommonPanel />
      </div>

      <div style={{ marginTop: "200px" }}>
        <div style={{ backgroundColor: "white", position: "relative" }}>
          {/* Sticky Header */}
          <div
            style={{
              position: "sticky",
              top: "200px",
              background: "#fff",
              zIndex: 10,
              width: "100%",
              paddingTop: "10px",
            }}
          >
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              sx={{ margin: "10px 30px 10px 0" }}
            >
              <Grid size={3} pl={2}>
                <h3
                  style={{
                    color: "#25307F",
                    paddingBottom: "12px",
                    cursor: "pointer",
                  }}
                  onClick={handleBack}
                >
                  <ArrowBackIosIcon sx={{ verticalAlign: "middle" }} /> New
                  Panel
                </h3>
              </Grid>
            </Grid>

            {/* Boxes */}
            <div
              style={{
                marginBottom: "1rem",
                padding: "0 2rem",
                display: "flex",
                gap: "1rem",
              }}
            >
              {boxData.map((box) => (
                <Box
                  key={box.id}
                  sx={{
                    backgroundColor:
                      activeBox === box.id ? "#D6E4FF" : "#F1F1F1",
                    px: { sm: 3, md: 3, lg: 7 },
                    height: 55,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 1,
                    cursor: "pointer",
                    borderBottom:
                      activeBox === box.id ? "4px solid #25307F" : "none",
                    transition: "all 0.3s ease-in-out",
                  }}
                  onClick={() => handleBoxClick(box.id)}
                >
                  <h2
                    style={{
                      fontSize: "2.1rem",
                      fontWeight: 600,
                      color: activeBox === box.id ? "#25307F" : "#4A4A4A",
                    }}
                  >
                    {box.count}
                  </h2>
                  <span
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: 500,
                      color: "black",
                      marginRight: "4px",
                    }}
                  >
                    -
                  </span>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      color: activeBox === box.id ? "black" : "#747474",
                      marginTop: "4px",
                    }}
                  >
                    {box.label}
                  </p>
                </Box>
              ))}
            </div>
          </div>

          {/* Table */}
          <TableContainer
            sx={{ maxHeight: "47vh", overflowY: "auto", position: "relative" }}
          >
            <Table
              sx={{
                borderCollapse: "separate",
                borderSpacing: "0 10px",
                marginBottom: "30px",
              }}
            >
              <TableHead
                sx={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "white",
                  zIndex: 10,
                }}
              >
                <TableRow>
                  <TableCell>Case Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Type Visit</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell align="center">Token Number</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      background: "#fff",
                      "&:hover": { backgroundColor: "#f9f9f9" },
                      "& > *": { borderBottom: "unset" },
                    }}
                  >
                    <TableCell>{row.caseId}</TableCell>
                    <TableCell>
                      <Typography variant="body1">{row.name}</Typography>
                    </TableCell>
                    <TableCell>{row.doctor}</TableCell>
                    <TableCell>{row.typeVisit}</TableCell>
                    <TableCell>{row.branch}</TableCell>
                    <TableCell align="center">{row.tokenNumber}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        sx={{
                          bgcolor:
                            row.status === "Active" ? "#3DB461" : "#F1F1F1",
                          color: row.status === "Active" ? "#FFF" : "#878787",
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={sampleData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20, 50, 100]}
              sx={{
                position: "sticky",
                bottom: 0,
                backgroundColor: "#fff",
                borderTop: "2px solid #ddd",
                zIndex: 11,
              }}
            />
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
