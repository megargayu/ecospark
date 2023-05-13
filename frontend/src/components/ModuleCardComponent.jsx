import React from "react";

import { Card, Box, Typography } from "@mui/material";

import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SpeedIcon from "@mui/icons-material/Speed";

import CardIcon from "../assets/card-icon.png";

const CardInfoComponent = ({ icon, className, iconClassName, children }) => {
  return (
    <Typography className={`flex items-center text-sm ${className}`}>
      {React.createElement(icon, { className: `mr-0.5 h-6 ${iconClassName}` })}
      {children}
    </Typography>
  );
};

const ModuleCardComponent = () => {
  return (
    <Card className="bg-slate-800 text-white p-2 w-48 h-80 flex flex-col items-center rounded-xl ">
      <img
        src={CardIcon}
        className="w-40 h-40 brightness-75 contrast-150 mb-3"
      />

      <Typography className="font-bold mb-1">🟢 Active</Typography>

      <CardInfoComponent icon={LocationOnIcon} className="mb-2">
        Lower Shaft
      </CardInfoComponent>

      <Box className="p-2 bg-slate-900 rounded-xl flex">
        <CardInfoComponent icon={DeviceThermostatIcon} className="mr-3">
          20 °C
        </CardInfoComponent>

        <CardInfoComponent icon={SpeedIcon} iconClassName="mr-1">
          1 atm
        </CardInfoComponent>
      </Box>
    </Card>
  );
};

export default ModuleCardComponent;
