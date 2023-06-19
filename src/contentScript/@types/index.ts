export interface SubjectData {
  id: string;
  name: string;
  class: subjectClass[];
}
export interface Subject {
  [key: string]: {
    [key: string]: SubjectData[];
  };
}

export type subject = {
  id: string; //ma hoc phan
  name: string; //ten hoc phan
  year: string; //nam hoc
  semester: string; //hoc ky
  class?: subjectClass[];
};
export type subjectClass = {
  id: string; //ky hieu
  name: string; //lop hoc phan
  slot: string; //so luong sinh vien
  available: string; //trong
  week: string; //tuan
  detail: subjectClassDetail[];
};
export type subjectClassDetail = {
  start: string; //tiet bat dau
  count: string; //so luong tiet
  day: string; //thu
  room: string; //phong nao
};
