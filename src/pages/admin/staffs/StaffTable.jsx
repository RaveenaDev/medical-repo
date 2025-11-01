import React, {
  memo,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Row component memoized
const StaffRow = memo(function StaffRow({ staff, onOpenMenu }) {
  const deptName =
    staff?.department?.name || staff?.department?.departmentName || "-";
  return (
    <TableRow
      sx={{
        background: "#fff",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        "&:hover": { backgroundColor: "#f9f9f9" },
        "& > *": { borderBottom: "unset" },
      }}
    >
      <TableCell>
        <Avatar
          src={staff?.profile}
          alt="Profile"
          sx={{ width: 40, height: 40 }}
        />
      </TableCell>
      <TableCell sx={{ color: "#25307F", fontWeight: "bold" }}>
        {staff?.staff_id}
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", color: "#25307F", cursor: "pointer" }}
        >
          {staff?.name}
        </Typography>
      </TableCell>
      <TableCell sx={{ color: "#747474" }}>{staff?.phone}</TableCell>
      <TableCell sx={{ color: "#747474" }}>{deptName}</TableCell>
      <TableCell sx={{ color: "#747474" }}>{staff?.designation}</TableCell>
      <TableCell>
        <Chip
          label={staff?.status}
          size="small"
          sx={{
            backgroundColor: "transparent",
            color: staff?.status === "Available" ? "#3DB461" : "#E1473D",
            fontWeight: "bold",
            border: "none",
          }}
        />
      </TableCell>
      <TableCell>
        <IconButton onClick={(e) => onOpenMenu(e, staff)}>
          <MoreVertIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});

const headers = [
  "Profile",
  "Staff ID",
  "Name",
  "Phone Number",
  "Department",
  "Designation",
  "Status",
  "Actions",
];

const StaffTable = memo(function StaffTable({
  staffs,
  page,
  rowsPerPage,
  count,
  onPageChange,
  onRowsPerPageChange,
  onOpenMenu,
}) {
  // simple windowing for large lists to cut DOM nodes
  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const windowed = useMemo(
    () => staffs.slice(start, end),
    [staffs, start, end]
  );

  // keep table head columns stable
  const headCells = useMemo(() => headers, []);

  return (
    <TableContainer
      sx={{ maxHeight: "72vh", overflowY: "auto", position: "relative" }}
    >
      <Table
        sx={{ borderCollapse: "separate", borderSpacing: "0 10px", mb: "30px" }}
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
            {headCells.map((h) => (
              <TableCell
                key={h}
                sx={{ fontWeight: 500, fontSize: 16, lineHeight: "100%" }}
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
              />
            ))
          ) : (
            <TableRow>
              <TableCell
                align="center"
                colSpan={8}
                sx={{
                  background: "#fff",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  "& > *": { borderBottom: "unset" },
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
        count={count}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
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
  );
});

export default StaffTable;
