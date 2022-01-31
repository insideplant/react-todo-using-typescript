import { memo, useCallback, VFC, useState, useEffect, useContext } from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { TodoButton } from "../atoms/button/createTodoButton";
import { Container } from "@chakra-ui/react";
import { db, auth } from "../../firebase";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { useNavigate } from "react-router";

import { TodoDetailModal } from "../organisms/todo/TodoDetailModal";
import { TodosTable } from "../organisms/todo/TodosTable";
import { ModalContext } from "../../providers/ModalProvider";
import { UserContext } from "../../providers/UserProvider";

type Todos = {
  id: string;
  status: Status;
  detail: string;
  title: string;
  limitDate: string;
  createdAt: Date;
};

enum Status {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}

export const Home: VFC = memo(() => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const navigate = useNavigate();
  const { user } = useContext<any>(UserContext);

  // userにidの格納は確認済み
  console.log(user);
  
  useEffect(() => {
    if (user) {
      // Todosという名前のコレクションを取得し、
      const q = query(collection(db, "Todos"), 
      // Login時にuser変数に格納させたuser.uidと同じフィールドを持つドキュメントを取得。
      where("userId", "==", user ));
      console.log(q);
      
      // 上述で取得したドキュメントを
      onSnapshot(q, (querySnapshot) => {
        let todos: Todos[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          userId: doc.data().userId,
          status: doc.data().status,
          detail: doc.data().detail,
          title: doc.data().title,
          limitDate: doc.data().limitDate,
          createdAt: doc
            .data({ serverTimestamps: "estimate" })
            .createdAt.toDate(),
        }));
        // console.log(todos);
        // 変数todosに追加値をsetTodosを用いてtodosに値を保持
        setTodos(todos);
      });
    } else {
      navigate("login");
    }
  }, []);

  const { onOpen, setDetail, setTitle, setLimitDate, setIsEditing } =
    useContext<any>(ModalContext);

  // const { isOpen, onOpen, onClose } = useDisclosure();
  const onClickCreate = useCallback(
    () => (
      onOpen(),
      setDetail(""),
      setTitle(""),
      setLimitDate(""),
      setIsEditing(true)
    ),
    []
  );

  return (
    <Container maxW="container.xl">
      <Box p={3}>
        <Heading as="h3" size="lg" p={4}>
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
