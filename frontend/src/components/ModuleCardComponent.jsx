import React from "react";

import { Card, Box, Typography, Button, Tooltip } from "@mui/material";
import IconInfoComponent from "./IconInfoCompoent";

import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import SpeedIcon from "@mui/icons-material/Speed";
import CloudIcon from "@mui/icons-material/Cloud";

import CardIcon from "../assets/card-icon.png";


const ModuleCardComponent = ({
  name,
  status,
  location,
  lastUpdate,
  onShowMoreInfo,
}) => {
  return (
    <Card className="bg-slate-800 text-white p-2 py-4 m-2 flex rounded-xl h-72 w-full">
      <img src={CardIcon} className="w-40 h-40 brightness-75 contrast-150" />

      <div className="flex flex-col justify-center mx-4 w-full">
        <Typography className="font-bold mb-1 text-center">{name}</Typography>

        <Tooltip title="Current Status">
          <Typography className="mb-1 font-bold text-center text-sm bg-slate-700 p-0.5 rounded-full mx-5">
            {status}
          </Typography>
        </Tooltip>

        {lastUpdate && (
          <IconInfoComponent
            icon={AccessTimeFilledIcon}
            className="mb-1 mx-auto text-xs"
            iconClassName="mr-1 text-xl"
            tooltip="Last Update Time"
          >
            {lastUpdate}
          </IconInfoComponent>
        )}

        {location && (
          <IconInfoComponent
            icon={LocationOnIcon}
            className="mb-1 mx-auto text-xs"
            tooltip="Location"
          >
            {location}
          </IconInfoComponent>
        )}

        {onShowMoreInfo && (
          <Button variant="contained" className="w-full mt-3" onClick={onShowMoreInfo}>
            More Info
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ModuleCardComponent;
