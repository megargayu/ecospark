import React from "react";

import { Card, Box, Typography, Button } from "@mui/material";

import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SpeedIcon from "@mui/icons-material/Speed";
import CloudIcon from "@mui/icons-material/Cloud";

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
    <Card className="bg-slate-800 text-white p-2 m-2 flex rounded-xl ">
      <img
        src={CardIcon}
        className="w-40 h-40 brightness-75 contrast-150 mb-3"
      />

      <div className="flex flex-col justify-center mx-4">
        <Typography className="font-bold mb-1 text-center">Module 1</Typography>

        <Typography className="mb-1 font-bold text-center text-xs">🟢 Active</Typography>

        <CardInfoComponent
          icon={LocationOnIcon}
          className="mb-4 mx-auto text-xs"
        >
          Lower Shaft
        </CardInfoComponent>
        

        <Button variant="contained" className="w-full">More Info</Button>
      </div>
    </Card>
  );
};

export default ModuleCardComponent;
