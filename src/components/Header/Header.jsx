import { Typography, Box, useTheme } from "@mui/material";

const Header = ({ title, subtitle }) => {

  return (
    <Box mb="15px">
      <h2
       className="text-slate-600 text-lg md:text-2xl  font-bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </h2>
      <h5 className="text-blue-600 text-sm md:text-lg font-semibold">
        {subtitle}
      </h5>
    </Box>
  );
};

export default Header;