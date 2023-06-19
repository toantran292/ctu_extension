import { useContext } from "react";
import { PlanTableContext } from "../contexts/planTableContext";

const usePlanTable = () => useContext(PlanTableContext);

export default usePlanTable;
