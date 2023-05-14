import { Box } from "@mui/material";

import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import useImage from 'use-image';
import Konva from 'konva';

import MineMap from "../assets/mine-map.png";

const MapComponent = () => {
  const [map] = useImage(MineMap);

  return (
    <Box className="w-full h-full bg-white">
      <Stage width="100%" height={1000}>
        <Layer>
          <Image image={map} x={0} y={0} width={1000} height={1000} draggable />
        </Layer>
      </Stage>
    </Box>
  );
};

export default MapComponent;
