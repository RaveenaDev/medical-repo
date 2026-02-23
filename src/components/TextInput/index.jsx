/* eslint-disable react/prop-types */
import TextField from '@mui/material/TextField';

export default function TextFieldHiddenLabel({
  id,
  value = '',
  type = 'text',
  style,
  placeholder = '',
}) {
  return (
    <TextField
      hiddenLabel
      id={id}
      defaultValue={value}
      variant="outlined"
      type={type}
      sx={style}
      placeholder={placeholder}
    />
  );
}
