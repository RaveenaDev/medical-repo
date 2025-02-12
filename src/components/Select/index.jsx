import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

	const formatString = (input) => {
		let trimmed = input?.trim();
		let formatted = trimmed?.includes(' ') ? trimmed.replace(/ +/g, '_') : trimmed;
		return formatted?.toLowerCase();
	}

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size={props?.size || ''}>
        {/* <InputLabel id={props?.inputId}>{props?.label}</InputLabel> */}
        <Select
          labelId={props?.inputId}
          id={props?.selectId}
          value={selectedValue || formatString(props?.list?.[0])}
          onChange={handleChange}
          sx={{
              color: `${props?.color || 'black'}`, // Text color
              backgroundColor: 'transparent', // Background color if needed
              '& .MuiSelect-icon': { color: `${props?.color || 'black'}` } // Icon color
          }}
        >
					{
						props?.list?.map((item,index) => {
							const valueId = formatString(item);
							return <MenuItem value={valueId} key={index}>{item}</MenuItem>
						})
					}
        </Select>
      </FormControl>
    </Box>
  );
}
