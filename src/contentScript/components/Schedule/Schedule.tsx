import React, { Fragment, useState } from "react";
import usePlanTable from "../../hooks/usePlanTable";
import { SubjectData } from "../../@types";
import { Pagination } from "antd";

import styles from "./Schedule.module.css";

const initMatrix = () => {
  return [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
};

const isConflict = (value: any, Data: any) => {
  if (!value.class?.detail.length) return true;
  for (const timeOfValue of value.class.detail) {
    for (const data of Data) {
      if (!data?.class?.detail.length) return true;
      for (const timeOfData of data?.class?.detail) {
        if (timeOfValue.day === timeOfData.day) {
          const start1 = parseInt(timeOfValue.start);
          const end1 = start1 + parseInt(timeOfValue.count);

          const start2 = parseInt(timeOfData.start);
          const end2 = start2 + parseInt(timeOfData.count);

          if (start2 <= start1 && start1 <= end2) return true;
          if (start1 <= start2 && start2 <= end1) return true;
        }
      }
    }
  }

  return false;
};

const generateSchedule = (subjectData: SubjectData[]) => {
  if (!subjectData.length) return [];
  let results = subjectData[0].class.map((value) => {
    return [
      {
        ...subjectData[0],
        class: value,
      },
    ];
  });

  for (const subject of subjectData.slice(1)) {
    const temp = [];

    for (const result of results) {
      for (const i of subject.class) {
        const value = {
          ...subject,
          class: i,
        };
        if (!isConflict(value, result)) {
          temp.push([
            ...result,
            {
              ...subject,
              class: i,
            },
          ]);
        }
      }
    }
    results = temp;
  }
  return results;
};

const Cell = ({ data, index }: { data: any; index: any }) => {
  if (!data) return <td></td>;
  if (index + 1 !== data.start) return <></>;
  return (
    <td rowSpan={data.height} className={styles.cell}>
      <div>
        <div>
          <b>
            {data.id} - Nhóm {data.group}
          </b>
        </div>
        <b>{data.name}</b>
        <b>Phòng: {data.room}</b>
        <b>
          Sỉ số: {data.slot} / {data.available}
        </b>
      </div>
    </td>
  );
};

const Schedule = () => {
  const { timeTable, year, semester, page, setPage } = usePlanTable();

  const tableData = generateSchedule(timeTable?.[year]?.[semester] || []);

  const matrix: any = initMatrix();

  tableData?.[page - 1]?.forEach((item: any) => {
    console.log(item);
    for (const k of item.class.detail) {
      const start = parseInt(k.start);
      const count = parseInt(k.count);
      const day = parseInt(k.day);
      for (let i = 0; i < count; i++) {
        matrix[start + i - 1][day - 1] = {
          id: item.id,
          name: item.name,
          slot: item.class.slot,
          available: item.class.available,
          room: k.room,
          group: item.class.id,
          start: start,
          height: count,
          day,
        };
      }
    }
  });
  return (
    <>
      <Pagination
        total={tableData.length}
        pageSize={1}
        current={page}
        onChange={setPage}
      />
      <table className={styles.table}>
        <colgroup>
          <col span={1} width="5%" />
          <col span={1} style={{ width: "calc(95%/6)" }} />
          <col span={1} style={{ width: "calc(95%/6)" }} />
          <col span={1} style={{ width: "calc(95%/6)" }} />
          <col span={1} style={{ width: "calc(95%/6)" }} />
          <col span={1} style={{ width: "calc(95%/6)" }} />
          <col span={1} style={{ width: "calc(95%/6)" }} />
        </colgroup>
        <thead>
          <tr>
            <th className={styles.leftCol}>Tiết</th>
            <th>Thứ 2</th>
            <th>Thứ 3</th>
            <th>Thứ 4</th>
            <th>Thứ 5</th>
            <th>Thứ 6</th>
            <th>Thứ 7</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((item: any, index: number) => {
            return (
              <Fragment key={index}>
                <tr>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  {Array(6)
                    .fill(0)
                    .map((_, i) => {
                      return (
                        <Cell
                          key={`${index}-${i + 1}`}
                          data={item[i + 1]}
                          index={index}
                        />
                      );
                    })}
                </tr>

                {index === 4 && (
                  <tr className={styles.divider}>
                    <td colSpan={7}> Chiều </td>
                  </tr>
                )}

                {index === 8 && (
                  <tr className={styles.divider}>
                    <td colSpan={7}> Tối </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Schedule;
