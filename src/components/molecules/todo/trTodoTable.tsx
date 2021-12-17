import React, { VFC } from "react";
import { Tr, Td } from "@chakra-ui/table";

type Props = {
  detail: string
  title: string
  limitDate: string
  createdAt:  Date | null
}

export const TrTable:VFC<Props> = (props) => {
  const {createdAt, limitDate, title, detail,} = props;


  return(
    <Tr>
      <Td>{createdAt}</Td>
      <Td>{title}</Td>
      <Td>{detail}</Td>
      <Td>{limitDate}</Td>
      <Td></Td>
    </Tr>
  )
}