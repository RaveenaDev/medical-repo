import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getPatientFiles, uploadPatientFile } from "../../../../components/State/Receptionist/Action.js";

const FileDocuments = ({ patientId }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const dispatch = useDispatch();

    // Fetch files from Redux state
    useEffect(() => {
        dispatch(getPatientFiles(patientId)); // Fetch files on mount
    }, [dispatch, patientId]);

    const patientFiles = useSelector((store) => store.receptionist.patientFiles);

    console.log("Files: ", patientFiles);

    const handleAddFile = async (event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            const formData = new FormData();
            formData.append("files", newFile);
            formData.append("patientId", patientId);

            await dispatch(uploadPatientFile(formData));
        }

        dispatch(getPatientFiles(patientId))
    };

    const handleDelete = (id) => {
        console.log("Delete")
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
                <Typography sx={{ color: "#25307F" }}>Files/ Documents</Typography>
                <Button
                    variant="text"
                    startIcon={<AddIcon />}
                    component="label"
                    sx={{ textTransform: "none", color: "#25307F" }}
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
                    {patientFiles.filter((file) => file.status === "Pending").length} file
                    Uploaded
                </Typography>
            </Box>

            {/* File List */}
            {patientFiles.map((file) => (
                <Card
                    key={file._id} // Use the file's unique _id for the key
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
                        <Typography variant="body1">{file.originalName}</Typography>
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
                            onClick={() => handleDelete(file._id)}
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
                    <DialogTitle>{selectedFile.originalName}</DialogTitle>
                    <DialogContent>
                        {selectedFile.fileType.startsWith("image/") ? (
                            <img
                                src={selectedFile.url}
                                alt={selectedFile.originalName}
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
