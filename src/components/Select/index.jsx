import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
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
          // displayEmpty
          // inputProps={{ 'aria-label': 'Without label' }}
        >
					{
						props?.list?.map((item) => {
							const valueId = formatString(item);
							return <MenuItem value={valueId}>{item}</MenuItem>
						})
					}
        </Select>
      </FormControl>
    </Box>
  );
}
