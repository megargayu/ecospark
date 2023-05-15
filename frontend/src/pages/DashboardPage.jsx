import { Box, Typography } from "@mui/material";

import { useEffect, useState } from "react";

import { BACKEND_URL, moduleData } from "../vars";

import ModuleCardComponent from "../components/ModuleCardComponent";
import MapComponent from "../components/MapComponent";

const DashboardPage = () => {
  const [moreInfoPage, setMoreInfoPage] = useState(false);
  const [data, setData] = useState();
  
  useEffect(() => {
    const dataFetcher = setInterval(() => {
      (async () => {
        const response = await fetch(BACKEND_URL + "status");
        const json = await response.json();

        console.log(json);
        // setData(json);
      })();
    }, 500);

    return () => clearInterval(dataFetcher);
  }, []);

  return (
    <Box className="w-full h-full">
      <MapComponent />

      <Box
        className="absolute h-full flex flex-col p-4 bg-slate-700 bg-opacity-80 z-10"
        direction="column"
        alignItems="center"
      >
        <Typography className="text-white text-5xl font-bold z-20 mb-5" variant="h1">
          Dashboard
        </Typography>

        {!data && <Typography className="text-white text-3xl break-words w-full">🔴 No Connections Found!</Typography>}

        <ModuleCardComponent name="Master" status="🟢 Active" lastUpdate="9:00 PM" showMoreInfo={false} />
        <ModuleCardComponent name="Worker 1" status="🟢 Active" lastUpdate="9:00 PM" location="Upper Shaft" />

        {/* <ModuleCardComponent /> */}
      </Box>
    </Box>
  );
};

export default DashboardPage;
