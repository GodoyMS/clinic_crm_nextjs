import React from 'react'
import { TextField } from '@mui/material'
export  const TextFieldComponent = ({value, setValue,type,label}) => {
  return (
    <TextField 
    size="medium"
    id="filled-basic" 
    label={label}
    value={value}
    variant="standard" 
    margin="normal"
    type={type}
    required
    fullWidth
    onChange={setValue}/>
  )
}
