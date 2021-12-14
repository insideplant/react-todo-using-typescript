import { memo,useCallback,VFC, useState, useEffect } from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { TodoButton } from "../atoms/button/createTodoButton";
import { Container,useDisclosure } from '@chakra-ui/react'
import { db } from "../../firebase";
import { collection, onSnapshot } from "@firebase/firestore";

import { TodoDetailModal } from "../organisms/todo/TodoDetailModal";
import { TodosTable } from "../organisms/todo/TodosTable";

type todos = {
  id: string
  detail: string
  title: string
}


export const Home: VFC = memo(() => {
  const [todos, setTodos] = useState<todos[]>([{ id: "", detail: "", title: "" }])
  useEffect((() => {
    const unSub = onSnapshot(collection(db, "Todos"), (snapshot) => {
      console.log(snapshot.docs.map(doc => doc.id));
      setTodos(
        snapshot.docs.map((doc) => ({ id: doc.id, detail: doc.data().detail, title: doc.data().title}))
      )
    })
  }), []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const onClickCreate = useCallback(() => onOpen(), []);

  return (
    <Container maxW='container.xl'>
      <Box p={3}>
        <Heading as='h3' size='lg'>
          Todo List
        </Heading>
        <Flex align="center" justify="center" height="30vh">
          <TodoButton onClick={onClickCreate}>
            Create
          </TodoButton>
        </Flex>
      </Box>
      <TodoDetailModal isOpen={isOpen} onClose={onClose} />
      <TodosTable todos={todos}/>
    </Container>
  )
});