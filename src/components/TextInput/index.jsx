import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function TextFieldHiddenLabel(props) {
  return (
      <TextField
        hiddenLabel
        id={props?.id}
        defaultValue={props?.value || ""}
        variant="outlined"
        type={props?.type || "text"}
        sx={props?.style}
        placeholder={props?.placeholder || ""}
      />
  );
}
