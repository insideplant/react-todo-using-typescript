import React, { VFC } from "react";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/table";
import { TrTable } from "../../molecules/todo/trTodoTable";

type Props = {
  todos: Todo[];
};

type Todo = {
  id: string;
  status: Status;
  title: string;
  detail: string;
  limitDate: string;
  createdAt: any;
};

enum Status {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
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
          <Th>action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {todos.map((todo: Todo, index: number) => {
          return (
            <TrTable
              key={index}
              index={index + 1}
              status={todo.status}
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
