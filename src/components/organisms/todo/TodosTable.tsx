import React, { VFC } from "react";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/table";
import { TrTable } from "../../molecules/todo/trTodoTable";

type Props = {
  todos : Todo[]
}

type Todo = { 
  id: string
  title: string
  detail: string
}

export const TodosTable = (props:Props) => {
  const {todos} = props;
  return (
    <Table variant='simple'>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>STATUS</Th>
          <Th>Limit</Th>
          <Th>Todo</Th>
          <Th isNumeric>Todo</Th>
        </Tr>
      </Thead>
      <Tbody>
        {todos.map((todo:Todo) => {
          return <TrTable id={todo.id} detail={todo.detail} title={todo.title}/>
        })}
      </Tbody>
    </Table>
  )

}