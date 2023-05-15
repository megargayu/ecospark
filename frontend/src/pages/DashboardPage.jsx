import { Box, Typography } from "@mui/material";

import { useState } from "react";

import ModuleCardComponent from "../components/ModuleCardComponent";
import MapComponent from "../components/MapComponent";

const DashboardPage = () => {
  const [moreInfoPage, setMoreInfoPage] = useState(false);
  const [data, setData] = useState();
  

  return (
    <Box className="w-full h-full">
      <MapComponent />

      <Box
        className="absolute h-full flex flex-col p-4 bg-slate-600 z-10"
        direction="column"
        alignItems="center"
      >
        <Typography className="text-white text-5xl font-bold z-20 mb-5" variant="h1">
          Dashboard
        </Typography>

        <ModuleCardComponent />
        <ModuleCardComponent />

        {/* <ModuleCardComponent /> */}
      </Box>
    </Box>
  );
};

export default DashboardPage;
