import { Subject, subjectClass } from "../@types";
import { initSubjectClass, initSubject } from "./init";

const removeSpaceHTML = (str: string | undefined) =>
  str?.replace(/\&nbsp;/g, "") || "";

export const stringToHTML = (str: string) => {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, "text/html");
  return doc;
};
export const getData = <T>({
  rows,
  map,
  init,
}: {
  rows: NodeListOf<Element>;
  map: { title: string; key: number }[];
  init: () => T;
}) => {
  const data: T[] = [];

  rows.forEach((row) => {
    const temp: Partial<T> = {};

    map.forEach((item) => {
      temp[item.title as keyof T] = removeSpaceHTML(
        row.querySelector(`td:nth-child(${item.key})`)?.innerHTML
      ) as T[keyof T];
    });
    if (Object.keys(temp).length > 0) data.push(temp as T);
  });
  return data;
};
export const getSubjectData = (str: string) => {
  const data = getData({
    rows: stringToHTML(str).querySelectorAll(
      "form > table > tbody > tr:nth-child(n+3):not(:last-child)"
    ),
    map: [
      { title: "id", key: 2 },
      { title: "name", key: 3 },
      { title: "year", key: 5 },
      { title: "semester", key: 6 },
    ],
    init: initSubject,
  }).reduce<Subject>((acc, { id, name, year, semester }) => {
    acc[year] ??= {};
    acc[year][semester] ??= [];
    acc[year][semester].push({ id, name, class: [] });
    return acc;
  }, {});

  return data;
};
export const getSubjectClassData = (str: string) => {
  let helper: { [key: string]: subjectClass } = {};
  const data = getData({
    rows: stringToHTML(str).querySelectorAll(
      ".border_1:nth-child(2) > tbody > tr:nth-child(n+2)"
    ),
    map: [
      { title: "id", key: 2 },
      { title: "day", key: 3 },
      { title: "start", key: 4 },
      { title: "count", key: 5 },
      { title: "room", key: 6 },
      { title: "slot", key: 7 },
      { title: "available", key: 8 },
      { title: "week", key: 9 },
      { title: "name", key: 10 },
    ],
    init: initSubjectClass,
  }).reduce<subjectClass[]>(
    (acc, { available, count, day, id, name, room, slot, start, week }) => {
      const key = `${id}-${name}-${slot}-${available}-${week}`;
      if (!helper[key]) {
        helper[key] = Object.assign(
          {},
          {
            id,
            name,
            slot,
            available,
            week,
            detail: [
              {
                room,
                start,
                count,
                day,
              },
            ],
          }
        );
        acc.push(helper[key]);
      } else {
        helper[key].detail.push({ room, start, count, day });
      }

      return acc;
    },
    []
  );
  return data || [];
};
