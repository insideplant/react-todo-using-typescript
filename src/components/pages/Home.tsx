import { memo, useCallback, VFC, useState, useEffect, useContext } from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { TodoButton } from "../atoms/button/createTodoButton";
import { Container, ModalContent, useDisclosure } from "@chakra-ui/react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "@firebase/firestore";

import { TodoDetailModal } from "../organisms/todo/TodoDetailModal";
import { TodosTable } from "../organisms/todo/TodosTable";
import { ModalContext } from "../../providers/ModalProvider";

type Todos = {
  id: string;
  status: Status;
  detail: string;
  title: string;
  limitDate: string;
  createdAt: Date;
};

enum Status {
  TODO = 'TODO',
  DOING = 'DOING',
  DONE = 'DONE',
}

export const Home: VFC = memo(() => {
  const [todos, setTodos] = useState<Todos[]>([]);
  useEffect(() => {
    const unSub = onSnapshot(collection(db, "Todos"), (snapshot) => {
      let todos: Todos[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        status: doc.data().status,
        detail: doc.data().detail,
        title: doc.data().title,
        limitDate: doc.data().limitDate,
        createdAt: doc
          .data({ serverTimestamps: "estimate" })
          .createdAt.toDate(),
      }));
      setTodos(todos);
    });
  }, []);

  const { onOpen, setDetail, setTitle, setLimitDate, setIsEditing } =
    useContext<any>(ModalContext);

  // const { isOpen, onOpen, onClose } = useDisclosure();
  const onClickCreate = useCallback(
    () => (onOpen(), setDetail(""), setTitle(""), setLimitDate(""), setIsEditing(true)),
    []
  );

  return (
    <Container maxW="container.xl">
      <Box p={3}>
        <Heading as="h3" size="lg">
          Todo List
        </Heading>
        <Flex align="center" justify="center" height="30vh">
          <TodoButton onClick={onClickCreate}>Create</TodoButton>
        </Flex>
      </Box>
      <TodoDetailModal />
      <TodosTable todos={todos} />
    </Container>
  );
});
