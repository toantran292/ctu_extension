import { getSubjectClassData, getSubjectData } from "./convertString";
import { Subject, SubjectData } from "../@types";

const TKB = {
  dkmh: "https://dkmh.ctu.edu.vn/htql/sinhvien/ctdt/codes/sindex.php?mID=S101",
  qldt: "https://qldt.ctu.edu.vn/htql/sinhvien/ctdt/codes/sindex.php?mID=S101",
};
const SJ = {
  dkmh: "https://dkmh.ctu.edu.vn/htql/dkmh/student/index.php?action=dmuc_mhoc_hky",
  qldt: "https://qldt.ctu.edu.vn/htql/dkmh/student/index.php?action=dmuc_mhoc_hky",
};

interface ClassSubjectProps {
  cmbHocKy: string;
  cmbNamHoc: string;
  txtMaMH: string;
  flag?: string;
  Button?: string;
  curPage?: string;
  txtUserID?: string;
}

export const fetchClassSubject = async ({
  cmbHocKy,
  cmbNamHoc,
  txtMaMH,
  flag = "1",
  Button = "Tìm",
  curPage = "+",
  txtUserID = "",
}: ClassSubjectProps) => {
  try {
    const host = window.location.href.indexOf("qldt") !== -1 ? "qldt" : "dkmh";
    let formData = new FormData();
    formData.append("cmbHocKy", cmbHocKy);
    formData.append("cmbNamHoc", cmbNamHoc);
    formData.append("txtMaMH", txtMaMH);
    formData.append("flag", flag);
    formData.append("Button", Button);
    formData.append("curPage", curPage);
    formData.append("txtUserID", txtUserID);

    const response = await fetch(SJ[host], {
      method: "POST",
      body: formData,
    });
    const text = await response.text();
    const data = getSubjectClassData(text).filter((item) => +item.slot >= 10);

    return data;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const fetchClassSubjectList = async ({
  data,
  semester,
  year,
}: {
  data: SubjectData[];
  semester: string;
  year: string;
}): Promise<SubjectData[]> => {
  const requests = data.map(({ id, name }) =>
    fetchClassSubject({
      cmbHocKy: semester === "hè" ? "3" : semester,
      cmbNamHoc: year.split("-")[1],
      txtMaMH: id,
    }).then((value) => ({
      id,
      name,
      class: value,
    }))
  );

  return await Promise.all(requests);
};

export const fetchSubject = async () => {
  try {
    const host = window.location.href.indexOf("qldt") !== -1 ? "qldt" : "dkmh";
    const response = await fetch(TKB[host]);
    const text = await response.text();
    const plansData = getSubjectData(text);
    const timeTableData: Subject = {};

    for (const year in plansData) {
      timeTableData[year] = {};
      for (const semester in plansData[year]) {
        timeTableData[year][semester] = [];
      }
    }
    return { plansData, timeTableData };
  } catch (error) {
    console.log(error);
    return { plansData: null, timeTableData: null };
  }
};
