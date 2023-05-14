import { Box, Typography } from "@mui/material";
import ModuleCardComponent from "../components/ModuleCardComponent";
import MapComponent from "../components/MapComponent";

const DashboardPage = () => {
  return (
    <Box className="w-full h-full bg-slate-950 p-5">
      <Typography className="text-white text-5xl font-bold" variant="h1">
        dashboard
      </Typography>

      <MapComponent />

      <ModuleCardComponent />
    </Box>
  );
};

export default DashboardPage;
