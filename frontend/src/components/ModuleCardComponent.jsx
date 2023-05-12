import { Card } from "@mui/material";
import CardIcon from "../assets/card-icon.png";

const ModuleCardComponent = () => {
  return (
    <Card className="bg-slate-800 text-white p-2 w-40 h-40 rounded-xl">
      <img src={CardIcon} className="w-32" />
    </Card>
  );
};

export default ModuleCardComponent;
