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
import DownloadIcon from "@mui/icons-material/Download"; // ⬅️ NEW
import { useDispatch, useSelector } from "react-redux";
import {
    deletePatientFile,
    getPatientFiles,
    uploadPatientFile,
} from "../../../../components/State/Receptionist/Action.js";

const FileDocuments = ({ patientId }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPatientFiles(patientId));
    }, [dispatch, patientId]);

    const patientFiles = useSelector(
        (store) => store.receptionist.patientFiles
    ) || [];

    const handleAddFile = async (event) => {
        const newFile = event.target.files?.[0];
        if (newFile) {
            const formData = new FormData();
            formData.append("files", newFile);
            formData.append("patientId", patientId);
            await dispatch(uploadPatientFile(formData));
            // allow selecting same file again next time
            event.target.value = "";
        }
        dispatch(getPatientFiles(patientId));
    };

    const handleDelete = async (id) => {
        await dispatch(deletePatientFile(id));
        dispatch(getPatientFiles(patientId));
    };

    const handleView = (file) => {
        setSelectedFile(file);
        setViewDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setViewDialogOpen(false);
        setSelectedFile(null);
    };

    // Robust downloader: tries Blob (best for cross-origin w/CORS), falls back to plain link
    const handleDownload = async (file) => {
        const url = file.url;
        const filename = file.originalName || "download";

        try {
            const res = await fetch(url, { mode: "cors" });
            if (!res.ok) throw new Error("Network response was not ok");
            const blob = await res.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch (err) {
            // Fallback: direct link (may open in new tab if server forces inline)
            const a = document.createElement("a");
            a.href = url;
            a.setAttribute("download", filename);
            a.target = "_blank";
            a.rel = "noopener";
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
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
                    {patientFiles.filter((file) => file.status === "Pending").length === 1 ? "" : "s"} Uploaded
                </Typography>
            </Box>

            {/* File List */}
            {patientFiles.map((file) => {
                const isImage = file?.fileType?.startsWith("image/");
                return (
                    <Card
                        key={file._id}
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
                            <Typography variant="body1" noWrap title={file.originalName}>
                                {file.originalName}
                            </Typography>
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
                            {isImage ? (
                                <IconButton
                                    aria-label="view"
                                    onClick={() => handleView(file)}
                                    color="primary"
                                >
                                    <VisibilityIcon />
                                </IconButton>
                            ) : (
                                <IconButton
                                    aria-label="download"
                                    onClick={() => handleDownload(file)}
                                    color="primary"
                                >
                                    <DownloadIcon />
                                </IconButton>
                            )}

                            <IconButton
                                aria-label="delete"
                                onClick={() => handleDelete(file._id)}
                                color="error"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    </Card>
                );
            })}

            {/* Image Preview Dialog (images only) */}
            {selectedFile && (
                <Dialog
                    open={viewDialogOpen}
                    onClose={handleCloseDialog}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>{selectedFile.originalName}</DialogTitle>
                    <DialogContent>
                        {selectedFile.fileType?.startsWith("image/") ? (
                            <img
                                src={selectedFile.url}
                                alt={selectedFile.originalName}
                                style={{ width: "100%" }}
                            />
                        ) : (
                            <Typography>File type not previewable.</Typography>
                        )}
                    </DialogContent>
                </Dialog>
            )}

            <Divider sx={{ mt: 2 }} />
        </Box>
    );
};

export default FileDocuments;
