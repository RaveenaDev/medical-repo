// components/ActionsMenu.jsx
import React from "react";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ActionsMenu = ({ anchorEl, onClose, onEdit, onDelete }) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={onClose}
    PaperProps={{ elevation: 2, sx: { p: 1 } }}
  >
    <MenuItem onClick={onEdit}>
      <ListItemIcon>
        <EditIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Edit</ListItemText>
    </MenuItem>
    <MenuItem onClick={onDelete}>
      <ListItemIcon>
        <DeleteIcon fontSize="small" color="error" />
      </ListItemIcon>
      <ListItemText sx={{ color: "error.main" }}>Delete</ListItemText>
    </MenuItem>
  </Menu>
);

export default ActionsMenu;
