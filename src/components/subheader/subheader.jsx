import { Typography, Box, useTheme } from "@mui/material";

const SubHeader = ({ title, icon }) => {

  return (
    <div>

    
    <Box  className="flex gap-2" mb="15px">
        {icon}
      <div
       
       className="text-blue-500 text-xs md:text-base"
        variant="h3"        
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </div>

    </Box>
    </div>
  );
};

export default SubHeader;