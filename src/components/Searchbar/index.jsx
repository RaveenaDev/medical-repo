import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function Searchbar() {
  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        style: {
          height: '40px', // Custom height
            backgroundColor:'white'
        },
      }}
      sx={{
        width: '190px', // Custom width
        '& .MuiOutlinedInput-root': {
          borderRadius: '15px', // Rounded corners
        },
          '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px', // Bold border
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px', // Keep bold on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px', // Keep bold on focus
          }
      }}
    />
  );
}

export default Searchbar;
