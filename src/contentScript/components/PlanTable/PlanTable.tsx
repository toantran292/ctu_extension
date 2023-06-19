import React, { Fragment, Key, useState } from "react";
import { SubjectData, subjectClass } from "../../@types";
import Table, { ColumnsType } from "antd/es/table";
import { Select, Space, Tag, Typography } from "antd";
import usePlanTable from "../../hooks/usePlanTable";

import type { CustomTagProps } from "rc-select/lib/BaseSelect";

interface ColProps extends SubjectData {
  key: Key;
}

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ margin: 3 }}
    >
      {label}
    </Tag>
  );
};

const PlanTable = () => {
  const {
    timeTable,
    plans,
    year,
    semester,
    setYear,
    setSemester,
    setTimeTable,
  } = usePlanTable();

  const getValue = (record: ColProps) => {
    const target = timeTable?.[year][semester].find(
      (item) => item.id === record.id
    );
    return target?.class.map((item) => item?.name) || [];
  };

  const columns: ColumnsType<ColProps> = [
    {
      title: "Mã học phần",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên học phần",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nhóm",
      dataIndex: "class",
      key: "class",
      render: (values: subjectClass[], record) => {
        return (
          <Select
            size="small"
            mode="multiple"
            style={{ width: 250 }}
            tagRender={tagRender}
            placeholder="Chọn nhóm học phần"
            value={getValue(record)}
            onChange={(value) => {
              setTimeTable(record.id, value);
            }}
          >
            {values?.map((value) => {
              return (
                <Select.Option key={value.name} value={value.name}>
                  Nhóm <b>{value.name}</b>
                  <br />
                  {value.detail.map((item, index) => {
                    const ss =
                      +item.start <= 5
                        ? "sáng"
                        : +item.start <= 9
                        ? "chiều"
                        : "tối";

                    return (
                      <div key={index}>
                        Thứ: {item.day} - buổi {ss} ({item.start} -{" "}
                        {+item.start + +item.count - 1})
                        <br />
                      </div>
                    );
                  })}
                  Tình trạng: {value.available} / {value.slot}
                </Select.Option>
              );
            })}
          </Select>
        );
      },
    },
  ];

  if (!plans) return <>Loading</>;

  const filter = (
    <Space style={{ marginBottom: 16 }}>
      <Typography>Năm học</Typography>
      <Select
        defaultValue={year}
        value={year}
        onChange={(v) => {
          setYear(v || "");
          setSemester(Object.keys(plans?.[year] || {})[0]);
        }}
        options={Object.keys(plans).map((year) => ({
          value: year,
          label: year,
        }))}
      />
      <Typography>Học kỳ</Typography>
      <Select
        defaultValue={semester}
        value={semester}
        onChange={(v) => setSemester(v || "")}
        options={Object.keys(plans?.[year] || {}).map((semester) => ({
          value: semester,
          label: semester,
        }))}
      />
    </Space>
  );

  return (
    <div style={{ marginBottom: 16, marginLeft: 10, marginRight: 10 }}>
      {filter}
      {plans?.[year] && plans?.[year]?.[semester] ? (
        <Table
          columns={columns}
          dataSource={plans?.[year]?.[semester].map((data) => ({
            key: data.id,
            ...data,
          }))}
          scroll={{ y: 240 }}
          pagination={{ hideOnSinglePage: true }}
        />
      ) : (
        <b>Không tìm thấy hoặc chưa mở lớp học phần!</b>
      )}
    </div>
  );
};

export default PlanTable;
