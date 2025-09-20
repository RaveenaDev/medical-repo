import React from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { Search } from "lucide-react";
import styles from "../Records.module.scss";

const RecordsHeader = ({
  billsCount,
  sortOrder,
  setSortOrder,
  searchQuery,
  setSearchQuery,
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "0.5px solid #4A4A4A8C",
      borderBottom: "0.5px solid #4A4A4A8C",
      paddingY: 1.5,
      marginBottom: 1,
    }}
  >
    {/* Left Section */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {/* Records Count */}
      <Box
        sx={{
          borderRight: "0.5px solid #4A4A4A8C",
          display: "flex",
          alignItems: "center",
          paddingRight: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mr: 1, color: "black" }}
        >
          {billsCount}
        </Typography>
        <Typography variant="body1" sx={{ color: "#878787" }}>
          Records
        </Typography>
      </Box>

      {/* Sort Dropdown */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="body1"
          sx={{
            mr: 1,
            color: "#0B0B0B",
            fontWeight: "500",
            fontSize: "1.25rem",
          }}
        >
          Sort by:
        </Typography>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          size="small"
          sx={{
            minWidth: 160,
            background: "#fff",
            boxShadow: "0px 4px 4px 0px #BDBDBD1C",
            border: "1px solid transparent",
          }}
        >
          <MenuItem value="Weekly">Weekly</MenuItem>
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="Yearly">Yearly</MenuItem>
        </Select>
      </Box>
    </Box>

    {/* Search */}
    <div className={styles["search-wrapper"]}>
      <Search size={18} className={styles["search-icon"]} />
      <input
        type="text"
        placeholder="Search bills..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles["search-input"]}
        aria-label="Search bills"
      />
    </div>
  </Box>
);

export default RecordsHeader;
