import React from "react";
import { Card, Option, Typography } from "@material-tailwind/react";

import { SubjectData } from "../../@types";

interface Props {
  data: SubjectData[];
}

const TABLE_HEAD = ["Mã học phần", "Tên học phần", "Chọn"];

const TablePlan = ({ data }: Props) => {
  return (
    <div className="my-6">
      <Card className="overflow-y-scroll h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map(({ name, id, class: classDetail }, index) => (
              <tr key={name} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {id}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className="p-4"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default TablePlan;
