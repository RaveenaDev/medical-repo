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
    <Box sx={{ padding: 2, margin: "auto" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <h3 style={{ fontWeight: 500,color:'#25307F' }}>
          Files/ Documents
        </h3>
        <Button
          variant="text"
          startIcon={<AddIcon />}
          component="label"
          sx={{ textTransform: "none",color:"#25307F" }}
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
            border: '2px solid #AACCAF',
          bgcolor: "#ECF4ED",
          color: "#2E823B",
          paddingX: 1,
            paddingY: 2.2,
          borderRadius: 1,
          mb: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          {files.filter((file) => file.status === "Pending").length} file
          Pending
        </Typography>
      </Box>

      {/* File List */}
      {files.map((file) => (
          <div
              key={file.id}
              style={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  padding: '0.44rem 1rem',
                  border: "2px solid #ECECEC", // Add this line
                  borderRadius: '4px',
                  marginTop: '0.5rem'
              }}
          >
              {/*<FolderIcon color="primary" sx={{ fontSize: 20, mr: 2 }} />*/}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M14 22H10C6.229 22 4.343 22 3.172 20.828C2.001 19.656 2 17.771 2 14V10C2 6.229 2 4.343 3.172 3.172C4.344 2.001 6.239 2 10.03 2C10.636 2 11.121 2 11.53 2.017C11.5167 2.097 11.51 2.17833 11.51 2.261L11.5 5.095C11.5 6.192 11.5 7.162 11.605 7.943C11.719 8.79 11.98 9.637 12.672 10.329C13.362 11.019 14.21 11.281 15.057 11.395C15.838 11.5 16.808 11.5 17.905 11.5H21.957C22 12.034 22 12.69 22 13.563V14C22 17.771 22 19.657 20.828 20.828C19.656 21.999 17.771 22 14 22Z"
                        fill="#25307F"/>
                  <path
                      d="M19.352 7.61711L15.392 4.05411C14.265 3.03911 13.702 2.53111 13.009 2.26611L13 5.00011C13 7.35711 13 8.53611 13.732 9.26811C14.464 10.0001 15.643 10.0001 18 10.0001H21.58C21.218 9.29611 20.568 8.71211 19.352 7.61711Z"
                      fill="#25307F"/>
              </svg>
              <CardContent sx={{flex: 1, padding: "8px 0"}}>
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
                      <VisibilityIcon/>
                  </IconButton>
                  <svg width="24" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.19667 20.0217 5.00067 19.5507 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8043 20.021 18.413 20.413C18.0217 20.805 17.5507 21.0007 17 21H7ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                          fill="#F14400"/>
                  </svg>
              </Stack>
          </div>
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
                            style={{width: "100%"}}
                        />
                    ) : (
                        <Typography>
                            File type not previewable. Download to view.
                        </Typography>
                    )}
                </DialogContent>
            </Dialog>
        )}
    </Box>
  );
};

export default FileDocuments;
