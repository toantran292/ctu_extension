import React, { Dispatch, SetStateAction, useEffect } from "react";
import { FC, PropsWithChildren, createContext, useState } from "react";
import { Subject, SubjectData } from "../@types";
import { fetchClassSubjectList, fetchSubject } from "../utils/fetchData";

export interface PlanTableCtx {
  timeTable: Subject | null;
  plans: Subject | null;
  year: string;
  semester: string;
  page: number;
  setYear: (value: string) => void;
  setSemester: (value: string) => void;
  setTimeTable: (id: string, value: string[]) => void;
  setPage: (page: number) => void;
}

export const PlanTableContext = createContext<PlanTableCtx>({
  timeTable: null,
  plans: null,
  year: "",
  semester: "",
  page: 1,
  setPage: () => {},
  setYear: () => {},
  setSemester: () => {},
  setTimeTable: () => {},
});

const compareData = (ob1: Subject, ob2: Subject) => {};

const PlanTableProvider: FC<PropsWithChildren> = ({ children }) => {
  const [plans, setPlans] = useState<Subject | null>(null);
  const [timeTable, setTimeTable] = useState<Subject | null>(
    JSON.parse(localStorage.getItem("timeTableData") || "null")
  );
  const [year, setYear] = useState(localStorage.getItem("year") || "");
  const [semester, setSemester] = useState(
    localStorage.getItem("semester") || ""
  );
  const [page, setPage] = useState(
    parseInt(localStorage.getItem("page") || "1")
  );

  const handleSetYear = (value: string) => {
    localStorage.setItem("year", value);
    setYear(value);
    handleSetPage(1);
  };

  const handleSetSemester = (value: string) => {
    localStorage.setItem("semester", value);
    setSemester(value);
    handleSetPage(1);
  };

  const handleSetTimeTable = (id: string, value: string[]) => {
    const target: SubjectData = plans?.[year][semester].filter(
      (item) => item.id === id
    )[0] || {
      id: "",
      name: "",
      class: [],
    };
    if (value.length) {
      setTimeTable((prev) => {
        if (!prev) return prev;

        const subjectData = JSON.parse(JSON.stringify(prev[year][semester]));

        const new_data = value.map((name) => {
          return target.class.filter((item) => item.name === name)[0];
        });
        const temp = subjectData.find((item: any) => item.id === id);
        if (!temp)
          subjectData.push({
            ...target,
            class: new_data,
          });
        else {
          temp.class = new_data;
        }
        localStorage.setItem(
          "timeTableData",
          JSON.stringify({
            ...prev,
            [year]: { [semester]: subjectData },
          })
        );
        return {
          ...prev,
          [year]: { [semester]: subjectData },
        };
      });
    } else {
      setTimeTable((prev) => {
        if (!prev) return prev;

        const subjectData = JSON.parse(JSON.stringify(prev[year][semester]));
        const new_data = subjectData.filter((item: any) => item.id !== id);
        localStorage.setItem(
          "timeTableData",
          JSON.stringify({
            ...prev,
            [year]: { [semester]: new_data },
          })
        );
        return {
          ...prev,
          [year]: { [semester]: new_data },
        };
      });
    }
    handleSetPage(1);
  };

  const handleSetPage = (page: number) => {
    localStorage.setItem("page", `${page}`);
    setPage(page);
  };

  const getClassSubject = async (data: Subject | null) => {
    try {
      if (!data) return;
      if (!year) return;
      if (!semester) return;

      const value = await fetchClassSubjectList({
        data: data[year][semester],
        semester,
        year,
      });

      value &&
        value[0].id &&
        setPlans((prev) => ({
          ...prev,
          [year]: { ...data[year], [semester]: value },
        }));
    } catch (error) {
      console.log(error);
    }
  };

  const getPlansData = async () => {
    try {
      const { plansData, timeTableData } = await fetchSubject();

      if (!plansData?.[year]?.[semester]) {
        const yearKey = Object.keys(plansData || {})[0];
        const semesterKey = Object.keys((plansData || {})[yearKey] || {})[0];
        setYear(yearKey || "");
        setSemester(semesterKey || "");
      }
      if (!timeTable) {
        console.log("OK");
        localStorage.setItem("timeTableData", JSON.stringify(timeTableData));
        setTimeTable(timeTableData);
      }
      setPlans(plansData);
      await getClassSubject(plansData);
    } catch (error) {}
  };
  useEffect(() => {
    getPlansData();
  }, []);

  useEffect(() => {
    getClassSubject(plans);
  }, [year, semester]);

  return (
    <PlanTableContext.Provider
      value={{
        timeTable,
        plans,
        year,
        semester,
        page,
        setPage: handleSetPage,
        setYear: handleSetYear,
        setSemester: handleSetSemester,
        setTimeTable: handleSetTimeTable,
      }}
    >
      {children}
    </PlanTableContext.Provider>
  );
};

export default PlanTableProvider;
