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

    // NEW: hold in-progress edits for keys so we don't rename on each keystroke
    const [draftKeys, setDraftKeys] = useState({});

    useEffect(() => {
        // initialize draft keys when the modal opens / service changes
        setDraftKeys(() => {
            const map = {};
            Object.keys(serviceDetails.additionaldetails || {}).forEach((k) => {
                map[k] = k;
            });
            return map;
        });
    }, [open]); // or [serviceId] if you prefer

    const [lastUpdated, setLastUpdated] = useState(
        new Date().toISOString().split("T")[0]
    );

    const handleChange = (e) => {
        setServiceDetails({
            ...serviceDetails,
            [e.target.name]: e.target.value,
        });
    };

    // Helper: rename a key but keep the same order in the object
    const renameKeyPreserveOrder = (obj, oldKey, newKey) => {
        if (!newKey || newKey === oldKey) return obj;
        if (Object.prototype.hasOwnProperty.call(obj, newKey)) return obj; // avoid overwrite

        const entries = Object.entries(obj);
        const out = {};
        for (const [k, v] of entries) {
            if (k === oldKey) {
                out[newKey] = v; // insert new key in the same position
            } else {
                out[k] = v;
            }
        }
        return out;
    };

    // Commit rename only on blur/Enter
    const commitKeyRename = (originalKey) => {
        const newKey = (draftKeys[originalKey] || "").trim();
        if (!newKey || newKey === originalKey) return;

        setServiceDetails((prev) => {
            const updated = renameKeyPreserveOrder(
                prev.additionaldetails,
                originalKey,
                newKey
            );
            return { ...prev, additionaldetails: updated };
        });

        // also fix the draft map to reflect the new canonical key
        setDraftKeys((prev) => {
            const { [originalKey]: _, ...rest } = prev;
            return { ...rest, [newKey]: newKey };
        });
    };

    // Value changes (numbers) stay instant as before
    const handleAdditionalValueChange = (key, newValue) => {
        setServiceDetails((prev) => ({
            ...prev,
            additionaldetails: {
                ...prev.additionaldetails,
                [key]: newValue,
            },
        }));
    };

    const handleAddAdditionalDetail = () => {
        setServiceDetails((prev) => {
            const count = Object.keys(prev.additionaldetails || {}).length + 1;
            const newKey = `Detail_${count}`;
            const additionaldetails = { ...prev.additionaldetails, [newKey]: 0 };
            return { ...prev, additionaldetails };
        });
        setDraftKeys((prev) => {
            const count = Object.keys(prev).length + 1;
            const newKey = `Detail_${count}`;
            return { ...prev, [newKey]: newKey };
        });
    };

    const handleRemoveAdditionalDetail = (key) => {
        setServiceDetails((prev) => {
            const updated = { ...prev.additionaldetails };
            delete updated[key];
            return { ...prev, additionaldetails: updated };
        });
        setDraftKeys((prev) => {
            const { [key]: _, ...rest } = prev;
            return rest;
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
            service: {
                serviceName: serviceDetails.name,   // matches serviceFields
            },
            category: {
                subCategoryName: serviceDetails.subCategoryName,
                rateType: serviceDetails.rateType,
                rate: finalRate,
                effectiveDate: serviceDetails.effectiveDate,
                amenities: serviceDetails.amenities,
                additionaldetails: serviceDetails.additionaldetails,
            },
        };


        dispatch(editTPAService(companyId,serviceId,categoryId,pass))

        // console.log("Edited: ", pass);

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
                                ([key, value]) => {
                                    const draftName = draftKeys[key] ?? key; // show draft while typing
                                    return (
                                        <Grid2 item xs={12} container spacing={1} key={`add-${key}`}>
                                            <Grid2 item xs={6}>
                                                <TextField
                                                    label="Detail Name"
                                                    fullWidth
                                                    value={draftName}
                                                    onChange={(e) =>
                                                        setDraftKeys((prev) => ({
                                                            ...prev,
                                                            [key]: e.target.value,
                                                        }))
                                                    }
                                                    onBlur={() => commitKeyRename(key)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.currentTarget.blur();
                                                        }
                                                    }}
                                                />
                                            </Grid2>
                                            <Grid2 item xs={5}>
                                                <TextField
                                                    label="Value"
                                                    fullWidth
                                                    type="number"
                                                    value={value}
                                                    onChange={(e) =>
                                                        handleAdditionalValueChange(
                                                            key,
                                                            parseFloat(e.target.value)
                                                        )
                                                    }
                                                />
                                            </Grid2>
                                            <Grid2
                                                item
                                                xs={1}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Trash2Icon
                                                    onClick={() => handleRemoveAdditionalDetail(key)}
                                                    style={{cursor: "pointer", color: "red"}}
                                                />
                                            </Grid2>
                                        </Grid2>
                                    );
                                }
                            )}
                        </Grid2>

                        <Button
                            variant="outlined"
                            onClick={handleAddAdditionalDetail}
                            sx={{marginTop: 2, marginBottom: 2}}
                        >
                            Add Custom Charges & Details
                        </Button>
                    </div>

                    <TextField
                        label="Effective Date"
                        fullWidth
                        margin="dense"
                        InputLabelProps={{shrink: true}}
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
                    sx={{marginTop: 2, background: "#25307F"}}
                >
                    Done
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default EditRateModal;
