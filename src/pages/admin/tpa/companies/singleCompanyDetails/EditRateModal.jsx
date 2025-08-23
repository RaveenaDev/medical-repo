import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Grid2,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Trash2Icon } from "lucide-react";
import {editTPAService, getAllDepartments} from "../../../../../components/State/Admin/Action.js";

const EditRateModal = ({companyId, open, handleClose, service }) => {
    const serviceId = service.service._id;
    const categoryId = service.category._id;

    // console.log("Service: ",service)
    // ✅ Format effectiveDate into YYYY-MM-DD
    const formattedDate = service.category.effectiveDate
        ? new Date(service.category.effectiveDate).toISOString().split("T")[0]
        : "";

    const [serviceDetails, setServiceDetails] = useState({
        serviceId: serviceId,
        name: service.service.serviceName,
        subCategoryName: service.category.subCategoryName,
        rateType: service.category.rateType,
        rate: service.category.rate,
        effectiveDate: formattedDate, // ✅ formatted here
        amenities: service.category.amenities,
        additionaldetails: service.category.additionaldetails || {},
    });

    const [lastUpdated, setLastUpdated] = useState(
        new Date().toISOString().split("T")[0]
    );

    const handleChange = (e) => {
        setServiceDetails({
            ...serviceDetails,
            [e.target.name]: e.target.value,
        });
    };

    // Handle changes in additional details (object)
    const handleAdditionalDetailChange = (key, newKey, newValue) => {
        const updatedDetails = { ...serviceDetails.additionaldetails };

        if (newKey !== undefined && key !== newKey) {
            updatedDetails[newKey] = newValue ?? updatedDetails[key];
            delete updatedDetails[key];
        } else {
            updatedDetails[key] = newValue;
        }

        setServiceDetails({
            ...serviceDetails,
            additionaldetails: updatedDetails,
        });
    };

    const handleAddAdditionalDetail = () => {
        setServiceDetails({
            ...serviceDetails,
            additionaldetails: {
                ...serviceDetails.additionaldetails,
                [`Detail_${Object.keys(serviceDetails.additionaldetails).length + 1}`]: 0,
            },
        });
    };

    const handleRemoveAdditionalDetail = (key) => {
        const updatedDetails = { ...serviceDetails.additionaldetails };
        delete updatedDetails[key];
        setServiceDetails({
            ...serviceDetails,
            additionaldetails: updatedDetails,
        });
    };

    const totalRate =
        Object.keys(serviceDetails.additionaldetails || {}).length > 0
            ? Object.values(serviceDetails.additionaldetails || {}).reduce(
                (acc, val) => acc + (parseFloat(val) || 0),
                0
            )
            : serviceDetails.rate;

    // console.log("Rate: ",totalRate)

    const handleSubmit = () => {
        const finalRate = totalRate;
        const pass = {
            serviceId: serviceDetails.serviceId,
            serviceName: serviceDetails.name,
            categories: [
                {
                    _id: service.category._id,
                    subCategoryName: serviceDetails.subCategoryName,
                    rateType: serviceDetails.rateType,
                    rate: finalRate,
                    effectiveDate: serviceDetails.effectiveDate,
                    amenities: serviceDetails.amenities,
                    additionaldetails: serviceDetails.additionaldetails,
                },
            ],
        };

        dispatch(editTPAService(companyId,serviceId,categoryId,pass))

        console.log("Edited: ", pass);

        setServiceDetails({
            name: "",
            subCategoryName: "",
            rateType: "",
            rate: "",
            effectiveDate: "",
            amenities: "",
            additionaldetails: {},
        });
        handleClose();
    };

    const dispatch = useDispatch();



    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Service</DialogTitle>
            <DialogContent>
                <TextField
                    label="Service Name"
                    fullWidth
                    margin="dense"
                    name="name"
                    value={serviceDetails.name}
                    onChange={handleChange}
                />

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        marginBottom: "16px",
                    }}
                >
                    <TextField
                        label="Category Name"
                        fullWidth
                        margin="dense"
                        name="subCategoryName"
                        value={serviceDetails.subCategoryName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Rate Type"
                        fullWidth
                        margin="dense"
                        name="rateType"
                        value={serviceDetails.rateType}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Current Rate"
                        fullWidth
                        margin="dense"
                        type="number"
                        name="rate"
                        value={totalRate}
                        onChange={handleChange}
                        disabled={
                            Object.keys(serviceDetails.additionaldetails || {}).length > 0
                        }
                    />
                    <TextField
                        label="Amenities"
                        fullWidth
                        margin="dense"
                        name="amenities"
                        value={serviceDetails.amenities}
                        onChange={handleChange}
                    />

                    {/* Additional Details Section */}
                    <div>
                        <Grid2 container spacing={2} marginTop={1}>
                            {Object.entries(serviceDetails.additionaldetails).map(
                                ([key, value], index) => (
                                    <Grid2 item xs={12} container spacing={1} key={index}>
                                        <Grid2 item xs={6}>
                                            <TextField
                                                label="Detail Name"
                                                fullWidth
                                                value={key}
                                                onChange={(e) =>
                                                    handleAdditionalDetailChange(
                                                        key,
                                                        e.target.value,
                                                        value
                                                    )
                                                }
                                            />
                                        </Grid2>
                                        <Grid2 item xs={5}>
                                            <TextField
                                                label="Value"
                                                fullWidth
                                                type="number"
                                                value={value}
                                                onChange={(e) =>
                                                    handleAdditionalDetailChange(
                                                        key,
                                                        key,
                                                        parseFloat(e.target.value)
                                                    )
                                                }
                                            />
                                        </Grid2>
                                        <Grid2
                                            item
                                            xs={1}
                                            justifyContent="center"
                                            display="flex"
                                            alignItems="center"
                                        >
                                            <Trash2Icon
                                                onClick={() => handleRemoveAdditionalDetail(key)}
                                                style={{ cursor: "pointer", color: "red" }}
                                            />
                                        </Grid2>
                                    </Grid2>
                                )
                            )}
                        </Grid2>
                        <Button
                            variant="outlined"
                            onClick={handleAddAdditionalDetail}
                            sx={{ marginTop: 2, marginBottom: 2 }}
                        >
                            Add Custom Charges & Details
                        </Button>
                    </div>

                    <TextField
                        label="Effective Date"
                        fullWidth
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        name="effectiveDate"
                        value={serviceDetails.effectiveDate} // ✅ now shows correctly
                        onChange={handleChange}
                    />
                </div>

                <TextField
                    label="Last Updated"
                    fullWidth
                    margin="dense"
                    type="date"
                    value={lastUpdated}
                    disabled
                />
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ marginTop: 2, background: "#25307F" }}
                >
                    Done
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default EditRateModal;
