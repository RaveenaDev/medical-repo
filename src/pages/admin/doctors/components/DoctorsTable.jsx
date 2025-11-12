// components/DoctorsTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useMediaQuery from "@mui/material/useMediaQuery";

const statusStyles = (s) =>
  s === "Available"
    ? { bgcolor: "#d4edda", color: "#2E823B", border: "1px solid #2E823B" }
    : s === "On Leave"
    ? { bgcolor: "#f8d7da", color: "#E1473D", border: "1px solid #E1473D" }
    : s === "Idle"
    ? { bgcolor: "#ffffff", color: "#878787", border: "1px solid #878787" }
    : {};

const CellText = ({
  children,
  title,
  maxWidth,
  color = "#25307F",
  weight = 400,
  fontSize,
}) => (
  <Typography
    title={title || String(children)}
    sx={{
      color,
      fontWeight: weight,
      maxWidth,
      fontSize,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
  >
    {children}
  </Typography>
);

const DoctorsTable = ({
  doctors,
  noOfDoctors,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  truncateText,
  onRowMenuOpen,
}) => {
  const is1280 = useMediaQuery("(max-width:1280px)");
  const is1024 = useMediaQuery("(max-width:1024px)");

  // font sizes
  const fsHead = is1024 ? 12 : is1280 ? 13 : 14;
  const fsBody = is1024 ? 12 : is1280 ? 13 : 14;

  // paddings
  const cellPy = is1024 ? 0.5 : 0.9; // rem
  const cellPx = is1024 ? 0.75 : 1.2; // rem

  // visibility
  const showEmail = !is1024; // hide email on very narrow laptops
  const showSpec = !is1024;

  // column widths + truncation budgets
  const widthEmail = is1280 ? 210 : 260;
  const widthName = is1024 ? 150 : is1280 ? 180 : 220;
  const widthPhone = is1024 ? 110 : 140;
  const widthDept = is1024 ? 150 : is1280 ? 190 : 230;
  const widthSpec = is1024 ? 150 : is1280 ? 190 : 230;

  const truncEmail = is1024 ? 20 : is1280 ? 26 : 34;
  const truncName = is1024 ? 18 : is1280 ? 22 : 28;
  const truncPhone = is1024 ? 12 : 14;
  const truncDept = is1024 ? 18 : is1280 ? 22 : 28;
  const truncSpec = is1024 ? 18 : is1280 ? 22 : 28;

  const visibleColCount =
    (showEmail ? 1 : 0) + 1 + 1 + 1 + (showSpec ? 1 : 0) + 1 + 1;

  return (
    <TableContainer
      sx={{
        maxHeight: is1024 ? "calc(100vh - 200px)" : "72vh",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <Table
        sx={{
          borderCollapse: "separate",
          borderSpacing: "0 10px",
          mb: 2,
          "& .MuiTableCell-root": { py: cellPy, px: cellPx, fontSize: fsBody },
        }}
      >
        <TableHead
          sx={{
            position: "sticky",
            backgroundColor: "#f1f1f1",
            top: 0,
            zIndex: 10,
            "& .MuiTableCell-root": { fontWeight: 600, fontSize: fsHead },
          }}
        >
          <TableRow>
            {showEmail && (
              <TableCell sx={{ width: widthEmail }}>Email</TableCell>
            )}
            <TableCell sx={{ width: widthName }}>Name</TableCell>
            <TableCell sx={{ width: widthPhone }}>Phone</TableCell>
            <TableCell sx={{ width: widthDept }}>Department</TableCell>
            {showSpec && (
              <TableCell sx={{ width: widthSpec }}>Specialization</TableCell>
            )}
            <TableCell align="center">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {doctors?.length ? (
            doctors.map((doctor, index) => {
              const dept =
                doctor?.departments?.[0]?.name ||
                doctor?.department ||
                "Not Assigned";
              const spec = doctor?.specialization || "Not Assigned";
              return (
                <TableRow
                  key={`${doctor?._id || index}`}
                  sx={{
                    background: "#fff",
                    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    "&:hover": { backgroundColor: "#f9f9f9" },
                    "& > *": { borderBottom: "unset" },
                  }}
                >
                  {showEmail && (
                    <TableCell sx={{ width: widthEmail }}>
                      <CellText
                        fontSize={fsBody}
                        weight={700}
                        title={doctor?.email}
                        maxWidth={widthEmail}
                      >
                        {truncateText(doctor?.email, truncEmail)}
                      </CellText>
                    </TableCell>
                  )}

                  <TableCell sx={{ width: widthName }}>
                    <CellText
                      fontSize={fsBody}
                      title={doctor?.name}
                      maxWidth={widthName}
                    >
                      {truncateText(doctor?.name, truncName)}
                    </CellText>
                  </TableCell>

                  <TableCell sx={{ width: widthPhone, color: "#747474" }}>
                    <CellText
                      fontSize={fsBody}
                      color="#747474"
                      title={doctor?.phone}
                      maxWidth={widthPhone}
                    >
                      {truncateText(doctor?.phone, truncPhone)}
                    </CellText>
                  </TableCell>

                  <TableCell sx={{ width: widthDept, color: "#747474" }}>
                    <CellText
                      fontSize={fsBody}
                      color="#747474"
                      title={dept}
                      maxWidth={widthDept}
                    >
                      {truncateText(dept, truncDept)}
                    </CellText>
                  </TableCell>

                  {showSpec && (
                    <TableCell sx={{ width: widthSpec, color: "#747474" }}>
                      <CellText
                        fontSize={fsBody}
                        color="#747474"
                        title={spec}
                        maxWidth={widthSpec}
                      >
                        {truncateText(spec, truncSpec)}
                      </CellText>
                    </TableCell>
                  )}

                  <TableCell align="center">
                    <Chip
                      label={doctor?.status || "Idle"}
                      size={is1024 ? "small" : "medium"}
                      sx={{
                        px: is1024 ? 1 : 2,
                        py: is1024 ? 0.25 : 1,
                        width: is1024 ? "auto" : "8rem",
                        fontSize: fsBody - 1,
                        ...statusStyles(doctor?.status),
                      }}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => onRowMenuOpen?.(e, doctor)}
                      size={is1024 ? "small" : "medium"}
                      sx={{ p: is1024 ? 0.5 : 1 }}
                      aria-label="row actions"
                    >
                      <MoreVertIcon fontSize={is1024 ? "small" : "medium"} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                align="center"
                colSpan={visibleColCount}
                sx={{
                  background: "#fff",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                }}
              >
                No data found!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={noOfDoctors || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={is1024 ? [5, 10, 20] : [5, 10, 20, 50, 100]}
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "#fff",
          borderTop: "2px solid #ddd",
          zIndex: 11,
          "& .MuiTablePagination-toolbar": {
            px: is1024 ? 1 : 2,
            minHeight: is1024 ? 40 : 52,
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                fontSize: fsBody - 1,
              },
          },
          "& .MuiTablePagination-select": { fontSize: fsBody - 1 },
          "& .MuiTablePagination-actions": {
            "& button": { p: is1024 ? 0.25 : 0.5 },
          },
        }}
      />
    </TableContainer>
  );
};

export default DoctorsTable;
