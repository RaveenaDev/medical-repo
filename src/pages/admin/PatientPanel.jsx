import React from 'react';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const EditPatientButton = () => {
  return (
    <Button
      variant="text" // No background or border
      startIcon={<EditIcon sx={{ color: 'blue' }} />}
      sx={{
        backgroundColor: 'white',
        color: 'grey',
        border: 'none',
        outline: 'none',
        '&:hover': {
          backgroundColor: 'white', // No background color change on hover
        },
        '&:focus': {
          outline: 'none', // Remove focus outline when clicked
        },
      }}
    >
      Edit Patient
    </Button>
  );
};

export default EditPatientButton;
