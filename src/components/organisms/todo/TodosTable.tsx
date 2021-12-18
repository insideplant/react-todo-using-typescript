import React, { VFC } from "react";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/table";
import { TrTable } from "../../molecules/todo/trTodoTable";

type Props = {
  todos: Todo[];
};

type Todo = {
  title: string,
  detail: string,
  limitDate: string,
  createdAt:  any,
};

export const TodosTable = (props: Props) => {
  const { todos } = props;

  return (
    <Table variant="simple">
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
        {todos.map((todo: Todo, index: number) => {
          return (
            <TrTable
              key={index}
              id={index + 1}
              limitDate={todo.limitDate}
              detail={todo.detail}
              title={todo.title}
              createdAt={todo.createdAt}
            />
          );
        })}
      </Tbody>
    </Table>
  );
};
