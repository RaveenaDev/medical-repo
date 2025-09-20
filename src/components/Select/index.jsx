import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);

        // Call the parent's callback function to pass the selected value
        if (props.onChange) {
            props.onChange(newValue);
        }
    };

    const formatString = (input) => {
        let trimmed = input?.trim();
        let formatted = trimmed?.includes(' ') ? trimmed.replace(/ +/g, '_') : trimmed;
        return formatted?.toLowerCase();
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size={props?.size || ''}>
                {/* <InputLabel id={props?.inputId}>{props?.label}</InputLabel> */}
                <Select
                    labelId={props?.inputId}
                    id={props?.selectId}
                    value={selectedValue || 'All Branches'}
                    onChange={handleChange}
                    sx={{
                        color: `${props?.color || 'black'}`, // Text color
                        backgroundColor: 'transparent', // Background color if needed
                        '& .MuiSelect-icon': { color: `${props?.color || 'black'}` }, // Icon color
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                maxHeight: 200, // Adjust the height as needed
                                overflowY: 'auto', // Enable vertical scrolling
                            },
                        },
                    }}
                >
                    <MenuItem value="All Branches">All Branches</MenuItem>
                    {props?.list?.map((item, index) => {
                        // const valueId = formatString(item);
                        return (
                            <MenuItem value={item.departmentId} key={index}>
                                {item.departmentName}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
