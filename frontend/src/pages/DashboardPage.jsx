import { Box, Typography, Modal } from "@mui/material";

import { useEffect, useState } from "react";

import { BACKEND_URL, moduleData } from "../vars";

import formatTime from "../util/formatTime";

import ModuleCardComponent from "../components/ModuleCardComponent";
import MoreInfoComponent from "../components/MoreInfoComponent";
import MapComponent from "../components/MapComponent";

const DashboardPage = () => {
  const [moreInfoPage, setMoreInfoPage] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const dataFetcher = setInterval(() => {
      (async () => {
        const response = await fetch(BACKEND_URL + "status");
        const json = await response.json();

        // console.log(json);
        setData(json);
      })();
    }, 500);

    return () => clearInterval(dataFetcher);
  }, []);

  useEffect(() => {
    console.log("more info page", moreInfoPage);
  }, [moreInfoPage]);

  return (
    <Box className="w-full h-full">
      <MapComponent />

      <Modal
        open={moreInfoPage !== false}
        onClose={() => setMoreInfoPage(false)}
      >
        <MoreInfoComponent workerData={data?.data[moreInfoPage]} />
      </Modal>

      <Box
        className="absolute h-full flex flex-col p-4 bg-slate-700 bg-opacity-80 z-10"
        direction="column"
        alignItems="center"
      >
        <Typography
          className="text-white text-5xl font-bold z-20 mb-5"
          variant="h1"
        >
          Dashboard
        </Typography>

        {!data && (
          <Typography className="text-white text-3xl break-words">
            🔴 No Connections Found!
          </Typography>
        )}

        {data && (
          <ModuleCardComponent
            name="Master"
            status={
              data.panic_flag !== "None" ? "🔴 PANICKING" : "🟢 Active"
            }
            lastUpdate="9:00 PM"
            showMoreInfo={false}
          />
        )}

        {data &&
          data.data.map((worker, i) => (
            <ModuleCardComponent
              name={moduleData[worker.mac_address].name}
              status={
                worker.panic_flag !== "None" ? "🔴 PANICKING" : "🟢 Active"
              }
              key={i}
              lastUpdate={formatTime(worker.time)}
              onShowMoreInfo={() => {
                setMoreInfoPage(i);
              }}
            />
          ))}

        {/* <ModuleCardComponent /> */}
      </Box>
    </Box>
  );
};

export default DashboardPage;
