import React from "react";
import { Tooltip, Typography } from "@mui/material";


const IconInfoComponent = ({
  icon,
  className,
  iconClassName,
  tooltip,
  children,
}) => {
  return (
    <Tooltip title={tooltip}>
      <Typography className={`flex items-center text-sm ${className}`}>
        {React.createElement(icon, {
          className: `mr-0.5 h-6 ${iconClassName}`,
        })}
        {children}
      </Typography>
    </Tooltip>
  );
};

export default IconInfoComponent;