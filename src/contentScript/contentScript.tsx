import React from "react";
import PlanTable from "./components/PlanTable";
import Schedule from "./components/Schedule";
import { Divider } from "antd";
import PlanTableProvider from "./contexts/planTableContext";

const ContentScript = () => {
  return (
    <PlanTableProvider>
      <PlanTable />
      <Schedule />
      <Divider>CTU</Divider>
    </PlanTableProvider>
  );
};

export default ContentScript;
