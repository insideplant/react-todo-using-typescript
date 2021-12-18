import React, { VFC } from "react";
import { Tr, Td } from "@chakra-ui/table";

type Props = {
  id: number,
  detail: string,
  title: string,
  limitDate: string,
  createdAt: any,
};

export const TrTable: VFC<Props> = (props) => {
  const { id, createdAt, limitDate, title, detail } = props;
  const year = createdAt.getFullYear();
  const month = ("0" + (createdAt.getMonth() + 1)).slice(-2);
  const date = ("0" + createdAt.getDate()).slice(-2);
  const hour = ("0" + createdAt.getHours()).slice(-2);
  const min = ("0" + createdAt.getMinutes()).slice(-2);

  return (
    <Tr>
      <Td>{id}</Td>
      <Td>{title}</Td>
      <Td>{detail}</Td>
      <Td>{limitDate}</Td>
      <Td>{year}/{month}/{date} {hour}:{min}</Td>
    </Tr>
  );
};
