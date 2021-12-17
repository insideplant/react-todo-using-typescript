import { memo, useCallback, VFC, useState, useEffect } from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { TodoButton } from "../atoms/button/createTodoButton";
import { Container, useDisclosure } from "@chakra-ui/react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "@firebase/firestore";

import { TodoDetailModal } from "../organisms/todo/TodoDetailModal";
import { TodosTable } from "../organisms/todo/TodosTable";

type Todos = {
  detail: string;
  title: string;
  limitDate: string;
  createdAt: Date | null;
};

export const Home: VFC = memo(() => {
  const [todos, setTodos] = useState<Todos[]>([
    { detail: "", title: "", limitDate: "", createdAt: null },
  ]);
  useEffect(() => {
    const unSub = onSnapshot(collection(db, "Todos"), (snapshot) => {
      console.log(snapshot.docs.map((doc) => doc.id));
      setTodos(()=>(
        snapshot.docs.map((doc) => ({
          detail: doc.data().detail,
          title: doc.data().title,
          limitDate: doc.data().limitDate,
          createdAt: doc.data({ serverTimestamps: "estimate" }).createdAt.toDate(),
        })))
      );
    });
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const onClickCreate = useCallback(() => onOpen(), []);

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
      <TodoDetailModal isOpen={isOpen} onClose={onClose} />
      <TodosTable todos={todos} />
    </Container>
  );
});
