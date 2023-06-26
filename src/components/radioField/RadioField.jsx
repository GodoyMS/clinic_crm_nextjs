import { FormControlLabel,Radio } from "@mui/material"
export const RadioField = ({name,value,label,setValue,selectedValue}) => {


  return (
    <FormControlLabel 
            
            name={name}     
            value={value}   
            control={<Radio />} 
            checked={selectedValue === value}   
            label={label}
            onChange={setValue}/>
    
  )
}
