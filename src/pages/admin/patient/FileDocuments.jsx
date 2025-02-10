import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Divider,
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";

const FileDocuments = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const handleAddFile = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          id: Date.now(),
          name: newFile.name,
          status: "Pending",
          file: newFile,
          url: URL.createObjectURL(newFile),
        },
      ]);
    }
  };

  const handleDelete = (id) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const handleView = (file) => {
    setSelectedFile(file);
    setViewDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setViewDialogOpen(false);
    setSelectedFile(null);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 400, margin: "auto" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Files/ Documents
        </Typography>
        <Button
          variant="text"
          startIcon={<AddIcon />}
          component="label"
          sx={{ textTransform: "none" }}
        >
          Add
          <input
            type="file"
            hidden
            onChange={handleAddFile}
            accept="application/pdf, image/*"
          />
        </Button>
      </Box>

      {/* Pending Status */}
      <Box
        sx={{
          bgcolor: "green",
          color: "white",
          padding: 1,
          borderRadius: 1,
          mb: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          {files.filter((file) => file.status === "Pending").length} file
          Uploaded
        </Typography>
      </Box>

      {/* File List */}
      {files.map((file) => (
        <Card
          key={file.id}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            padding: 1,
            boxShadow: 1,
          }}
        >
          <FolderIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <CardContent sx={{ flex: 1, padding: "8px 0" }}>
            <Typography variant="body1">{file.name}</Typography>
            {file.status === "Seen" ? (
              <Typography
                variant="body2"
                sx={{
                  color: "green",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Seen
              </Typography>
            ) : null}
          </CardContent>
          <Stack direction="row" spacing={1}>
            <IconButton
              aria-label="view"
              onClick={() => handleView(file)}
              color="primary"
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(file.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Card>
      ))}

      {/* Dialog for Viewing File */}
      {selectedFile && (
        <Dialog
          open={viewDialogOpen}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>{selectedFile.name}</DialogTitle>
          <DialogContent>
            {selectedFile.file.type.startsWith("image/") ? (
              <img
                src={selectedFile.url}
                alt={selectedFile.name}
                style={{ width: "100%" }}
              />
            ) : (
              <Typography>
                File type not previewable. Download to view.
              </Typography>
            )}
          </DialogContent>
        </Dialog>
      )}

      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default FileDocuments;
