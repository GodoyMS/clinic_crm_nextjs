import { Typography, Box, useTheme } from "@mui/material";

const Header = ({ title, subtitle }) => {

  return (
    <Box mb="15px">
      <Typography
       className="text-slate-600 text-lg md:text-2xl"
        variant="h2"        
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" className="text-blue-600 text-sm md:text-lg">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;