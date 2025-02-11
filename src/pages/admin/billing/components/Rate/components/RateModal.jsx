import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const RateModal = ({ open, handleClose, addService }) => {
  const [serviceName, setServiceName] = useState("");
  const [categories, setCategories] = useState([
    {
      name: "",
      rateType: "",
      currentRate: "",
      amenities: "",
      effectiveDate: "",
    },
  ]);
  const [lastUpdated, setLastUpdated] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleCategoryChange = (index, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index][field] = value;
    setCategories(updatedCategories);
  };

  const addCategory = () => {
    setCategories([
      ...categories,
      {
        name: "",
        rateType: "",
        currentRate: "",
        amenities: "",
        effectiveDate: "",
      },
    ]);
  };

  const removeCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const handleSubmit = () => {
    addService({
      serviceName,
      categories: categories.map((cat) => ({
        ...cat,
        lastUpdated,
      })),
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Service</DialogTitle>
      <DialogContent>
        <TextField
          label="Service Name"
          fullWidth
          margin="dense"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
        {categories.map((category, index) => (
          <div
            key={index}
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
              value={category.name}
              onChange={(e) =>
                handleCategoryChange(index, "name", e.target.value)
              }
            />
            <TextField
              label="Rate Type"
              fullWidth
              margin="dense"
              value={category.rateType}
              onChange={(e) =>
                handleCategoryChange(index, "rateType", e.target.value)
              }
            />
            <TextField
              label="Current Rate"
              fullWidth
              margin="dense"
              type="number"
              value={category.currentRate}
              onChange={(e) =>
                handleCategoryChange(index, "currentRate", e.target.value)
              }
            />
            <TextField
              label="Amenities"
              fullWidth
              margin="dense"
              value={category.amenities}
              onChange={(e) =>
                handleCategoryChange(index, "amenities", e.target.value)
              }
            />
            <TextField
              label="Effective Date"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              type="date"
              value={category.effectiveDate}
              onChange={(e) =>
                handleCategoryChange(index, "effectiveDate", e.target.value)
              }
            />
            {categories.length > 1 && (
              <IconButton
                onClick={() => removeCategory(index)}
                color="secondary"
              >
                <Remove />
              </IconButton>
            )}
          </div>
        ))}
        <Button
          onClick={addCategory}
          startIcon={<Add />}
          color="primary"
          variant="outlined"
          sx={{ marginBottom: 2 }}
        >
          Add Category
        </Button>
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

export default RateModal;
