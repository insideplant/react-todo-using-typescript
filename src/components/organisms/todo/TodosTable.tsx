import React, { VFC } from "react";
import { Table,Thead, Tbody, Tr, Th } from "@chakra-ui/table";
import { TrTable } from "../../molecules/todo/trTodoTable";

type Props = {
  todos: Todo[];
};

type Todo = {
  id: string,
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
          <Th>Todo</Th>
          <Th>Limit</Th>
          <Th>created day</Th>
          <Th>Edit</Th>
        </Tr>
      </Thead>
      <Tbody>
        {todos.map((todo: Todo, index: number) => {
          return (
            <TrTable
              key={index}
              index={index + 1}
              id={todo.id}
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
