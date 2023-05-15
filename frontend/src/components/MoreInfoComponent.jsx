import { Box, Typography, Tooltip } from "@mui/material";

import { moduleData, units } from "../vars";

import IconInfoComponent from "./IconInfoCompoent";

import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import SensorsIcon from "@mui/icons-material/Sensors";
import SpeedIcon from "@mui/icons-material/Speed";
import CloudIcon from "@mui/icons-material/Cloud";
import formatTime from "../util/formatTime";

const MoreInfoComponent = ({ workerData }) => {
  console.log(workerData);
  const moreData = moduleData[workerData.mac_address];

  return (
    <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 rounded-xl p-8 bg-slate-800 z-50 text-white">
      <Typography className="text-3xl font-bold mb-3">
        {moreData.name}{" "}
        <span className="text-gray-400">({workerData.mac_address})</span>
      </Typography>

      <Box className="flex space-x-5 mb-8">
        <Tooltip title="Current Status">
          <Typography className="mb-1 font-bold px-2 text-center text-sm bg-slate-700 p-0.5 rounded-full">
            {workerData.panic_flag !== "None" ? "🔴 PANICKING" : "🟢 Active"}
          </Typography>
        </Tooltip>

        <IconInfoComponent
          icon={AccessTimeFilledIcon}
          className="mb-1 mx-auto text-xs"
          iconClassName="mr-1 text-xl"
          tooltip="Last Update Time"
        >
          {formatTime(workerData.time)}
        </IconInfoComponent>

        <IconInfoComponent
          icon={LocationOnIcon}
          className="mb-1 mx-auto text-xs"
          tooltip="Location"
        >
          {moreData.locationString}
        </IconInfoComponent>
      </Box>
      <Box className="bg-slate-900 w-full p-3 rounded-lg flex flex-col space-y-1.5">
        <Typography className="text-xl font-bold">Sensor Values</Typography>

        {Object.keys(workerData.sensors).map((name, i) => (
          <IconInfoComponent key={i} icon={SensorsIcon}>
            {name}: {workerData.sensors[name]}
            <span className="text-gray-300 whitespace-pre">{units[name]}</span>
          </IconInfoComponent>
        ))}
      </Box>
    </Box>
  );
};

export default MoreInfoComponent;
