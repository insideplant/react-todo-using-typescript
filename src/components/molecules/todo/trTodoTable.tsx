import React, { VFC } from "react";
import { Tr, Td } from "@chakra-ui/table";

type Props = {
  id: string
  detail: string
  title: string
}

export const TrTable:VFC<Props> = (props) => {
  const {id, title, detail,} = props;
  return(
    <Tr>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
      <Td></Td>
    </Tr>
  )
}