import { Box } from '@mui/material'
export const ButtonComponent = ({message,icon}) => {
  return (
   
    <Box 
    component={"div"}
    className="flex justify-start">
    <button type="submit" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-blue-700 bg-blue-200 rounded-lg hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
    {message}
        <span class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-700 rounded-full">
       {icon}
    </span>
    </button>

</Box>
  )
}
