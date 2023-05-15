import { Box } from "@mui/material";

import { useEffect, useRef, useState } from "react";
import clamp from "../util/clamp";

import { Stage, Layer, Rect, Text, Image, Circle } from "react-konva";
import useImage from "use-image";
import Konva from "konva";

import MineMap from "../assets/mine-map.png";

const startLocations = [
  [950, 600],
  [750, 200],
];

const MapComponent = () => {
  const [map] = useImage(MineMap);

  const containerRef = useRef();
  const canvasRef = useRef();

  const [canvasSize, setCanvasSize] = useState([1000, 1000]);
  const [dragging, setDragging] = useState([[0, 0], false]);
  const [imageLocation, setImageLocation] = useState([0, 0]);

  const clampImageLocation = (location) => {
    return [
      clamp(
        location[0],
        containerRef.current.offsetWidth - map.naturalWidth,
        0
      ),
      clamp(
        location[1],
        containerRef.current.offsetHeight - map.naturalHeight,
        0
      ),
    ];
  };

  const draw = () => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(
      0,
      0,
      containerRef.current.offsetWidth,
      containerRef.current.offsetHeight
    );

    context.filter = "brightness(50%) contrast(150%) grayscale(50%)";
    context.drawImage(map, imageLocation[0], imageLocation[1]);

    context.filter = "none";
    for (const location of startLocations) {
      const x = location[0] + imageLocation[0], y = location[1] + imageLocation[1];

      context.beginPath();
      context.arc(x, y, 5, 0, 2 * Math.PI, false);
      context.fillStyle = "red";
      context.closePath();
      context.fill();
    }
  };

  useEffect(() => {
    if (!canvasRef?.current || !containerRef?.current || !map) return;

    draw();

    const canvasUpdater = setInterval(() => {
      setCanvasSize([
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight,
      ]);

      setImageLocation(clampImageLocation(imageLocation));
      draw();
    }, 100);

    return () => clearInterval(canvasUpdater);
  }, [canvasRef, imageLocation, containerRef, map]);

  const handleMouseDown = (evt) => {
    setDragging([dragging[0], [evt.clientX, evt.clientY]]);
  }

  const handleMouseUp = (evt) => {
    setDragging([imageLocation, false]);
  }

  const handleMouseMove = (evt) => {
    if (!dragging[1]) return;

    // console.log(evt.clientX - dragging[1][0] + dragging[0][0]);
    setImageLocation(
      clampImageLocation([
        evt.clientX - dragging[1][0] + dragging[0][0],
        evt.clientY - dragging[1][1] + dragging[0][1],
      ])
    );
  };

  return (
    <Box className="absolute w-full h-full bg-white" ref={containerRef}>
      <canvas
        className="absolute"
        ref={canvasRef}
        width={canvasSize[0]}
        height={canvasSize[1]}
        onMouseDown={handleMouseDown 
        }
        onMouseUp={handleMouseUp}
        onMouseOut={() => setDragging([imageLocation, false])}
        onMouseMove={handleMouseMove}
      />
    </Box>
  );
};

export default MapComponent;
