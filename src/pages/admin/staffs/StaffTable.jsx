import React, { memo, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
  Typography,
  Avatar,
  IconButton,
  useMediaQuery,
  CircularProgress,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

/* compact only for 10–13" screens */
const useIs10to13Inch = () =>
  useMediaQuery("(min-width:900px) and (max-width:1200px)");

const EllipsizedCell = ({ children, sx, width }) => (
  <TableCell
    sx={{
      maxWidth: width,
      width,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      ...sx,
    }}
  >
    {children}
  </TableCell>
);

/* ---------- row ---------- */
const StaffRow = memo(function StaffRow({ staff, onOpenMenu, isCompact }) {
  const deptName =
    staff?.department?.name || staff?.department?.departmentName || "-";

  const avatarSize = isCompact ? 30 : 40;
  const nameVariant = isCompact ? "body2" : "body1";
  const rowHeight = isCompact ? 50 : 60;

  return (
    <TableRow
      sx={{
        background: "#fff",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.08)",
        borderRadius: "8px",
        "&:hover": { backgroundColor: "#f9f9f9" },
        "& > *": { borderBottom: "unset" },
        height: rowHeight,
      }}
    >
      {!isCompact && (
        <TableCell>
          <Avatar
            src={staff?.profile}
            alt="Profile"
            sx={{ width: avatarSize, height: avatarSize }}
          />
        </TableCell>
      )}

      <EllipsizedCell
        width={isCompact ? 100 : 128}
        sx={{ color: "#25307F", fontWeight: 700 }}
      >
        {staff?.staff_id}
      </EllipsizedCell>

      <EllipsizedCell width={isCompact ? 150 : 220}>
        <Typography
          variant={nameVariant}
          sx={{ fontWeight: 700, color: "#25307F", cursor: "pointer" }}
          title={staff?.name}
        >
          {staff?.name}
        </Typography>
      </EllipsizedCell>

      <EllipsizedCell width={isCompact ? 130 : 160} sx={{ color: "#747474" }}>
        {staff?.phone}
      </EllipsizedCell>

      <EllipsizedCell width={isCompact ? 140 : 180} sx={{ color: "#747474" }}>
        {deptName}
      </EllipsizedCell>

      <EllipsizedCell width={isCompact ? 140 : 180} sx={{ color: "#747474" }}>
        {staff?.designation}
      </EllipsizedCell>

      <TableCell sx={{ width: isCompact ? 110 : 140 }}>
        <Chip
          label={staff?.status}
          size={isCompact ? "small" : "medium"}
          variant="outlined"
          sx={{
            color: staff?.status === "Available" ? "#2E823B" : "#E1473D",
            borderColor: staff?.status === "Available" ? "#2E823B" : "#E1473D",
            fontWeight: 600,
            height: isCompact ? 22 : 28,
          }}
        />
      </TableCell>

      <TableCell sx={{ width: isCompact ? 52 : 64 }}>
        <IconButton
          onClick={(e) => onOpenMenu(e, staff)}
          size={isCompact ? "small" : "medium"}
        >
          <MoreVertIcon fontSize={isCompact ? "small" : "medium"} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

/* ---------- headers ---------- */
const headersFull = [
  "Profile",
  "Staff ID",
  "Name",
  "Phone Number",
  "Department",
  "Designation",
  "Status",
  "Actions",
];

const headersCompact = [
  "Staff ID",
  "Name",
  "Phone Number",
  "Department",
  "Designation",
  "Status",
  "Actions",
];

/* ---------- table ---------- */
const StaffTable = memo(function StaffTable({
  staffs,
  page,
  rowsPerPage,
  count,
  onPageChange,
  onRowsPerPageChange,
  onOpenMenu,
  loading,
}) {
  const isCompact = useIs10to13Inch();

  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const windowed = useMemo(
    () => staffs.slice(start, end),
    [staffs, start, end]
  );

  const headers = isCompact ? headersCompact : headersFull;

  return (
    <TableContainer
      sx={{
        maxHeight: isCompact ? "68vh" : "72vh",
        overflowY: "auto",
        position: "relative",
        px: isCompact ? 0.5 : 1,
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(2px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 20,
          }}
        >
          <CircularProgress sx={{ color: "#25307F" }} />
        </Box>
      )}
      <Table
        size={isCompact ? "small" : "medium"}
        sx={{
          borderCollapse: "separate",
          borderSpacing: isCompact ? "0 8px" : "0 10px",
          mb: isCompact ? "16px" : "30px",
          tableLayout: "fixed",
        }}
      >
        <TableHead
          sx={{
            position: "sticky",
            backgroundColor: "#f1f1f1",
            top: 0,
            zIndex: 10,
          }}
        >
          <TableRow>
            {headers.map((h) => (
              <TableCell
                key={h}
                sx={{ fontWeight: 600, fontSize: isCompact ? 13 : 16 }}
              >
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {windowed.length > 0 ? (
            windowed.map((staff) => (
              <StaffRow
                key={staff?._id}
                staff={staff}
                onOpenMenu={onOpenMenu}
                isCompact={isCompact}
              />
            ))
          ) : (
            <TableRow>
              <TableCell
                align="center"
                colSpan={headers.length}
                sx={{
                  background: "#fff",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.08)",
                  borderRadius: "8px",
                }}
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={isCompact ? [5, 10, 20, 50] : [5, 10, 20, 50, 100]}
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "#fff",
          borderTop: "2px solid #ddd",
          zIndex: 11,
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              fontSize: isCompact ? 12 : 14,
            },
          "& .MuiTablePagination-select": { fontSize: isCompact ? 12 : 14 },
          "& .MuiTablePagination-actions button": {
            padding: isCompact ? "4px" : "6px",
          },
        }}
      />
    </TableContainer>
  );
});

export default StaffTable;
