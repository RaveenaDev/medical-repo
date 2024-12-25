import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function Searchbar() {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        style: {
          height: '40px', // Custom height
        },
      }}
      sx={{
        width: '190px', // Custom width
        '& .MuiOutlinedInput-root': {
          borderRadius: '20px', // Rounded corners
        },
      }}
    />
  );
}

export default Searchbar;
