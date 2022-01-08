import React, { VFC, useMemo, useState} from "react";
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
  createdAt: Date;
};

enum Status {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
};

type Sort = {
  key: "id"|"status"|"title"|"detail"|"limitDate"| "createdAt";
  order: number;
}

export const TodosTable = (props: Props) => {
  const { todos } = props;
  const [sort, setSort] = useState<Sort>({key: "id", order: 1});

  let sortedStates = useMemo(() => {
    let _sortedStates = todos;
    if (sort.key) {
      _sortedStates = _sortedStates.sort((a,b): any  => {
        a = a[sort.key] as any ;
        b = b[sort.key] as any ;

        if(a === b) {
          return 0;
        }
        if(a > b) {
          return 1 * sort.order;
        }
        if(a < b) {
          return -1 * sort.order;
        } 
      });
    }
    return _sortedStates;
  }, [sort, todos]);

  const handleSort = (sortName: "id"|"status"|"title"|"limitDate"| "createdAt") => {
    
    if (sort.key === sortName) {
      setSort({ ...sort, order: -sort.order });
    } else {
      setSort({
        key: sortName,
        order: 1
      })
    }
  };


  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th onClick={() => handleSort("id")}>ID</Th>
          <Th onClick={() => handleSort("status")}>STATUS</Th>
          <Th onClick={() => handleSort("title")}>Todo</Th>
          <Th onClick={() => handleSort("limitDate")}>Limit</Th>
          <Th onClick={() => handleSort("createdAt")}>created day</Th>
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
