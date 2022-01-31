import React, { useState, useEffect, useContext } from "react";
import { memo, VFC } from "react";
import { Flex, Box, Button, Heading, Input, Stack } from "@chakra-ui/react";
import { UserContext } from "../../providers/UserProvider";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";




export const Login: VFC = memo((props: any) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const onClickLogin = () => login(email, password, isLogin);
  const {user, setUser} = useContext<any>(UserContext);

  // useEffect(() => {
  //   const unSub = onAuthStateChanged(auth, (user) => {
  //     user && navigate("/");
  //   });
  //   return () => unSub();
  // }, [navigate]);

  useEffect(() => {
    // userStateにログインしているuserのidを保持
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid as any);
      } 
    });
  }, [setIsLogin]);
  

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" py={5} w="sm" borderRadius="md" shadow="md">
        <Heading as="h1" px={10}>
          {isLogin ? "Login" : "Register"}
        </Heading>
        <Stack spacing={4} py={4} px={10}>
          <Input
            placeholder="User ID"
            name="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <PrimaryButton onClick={onClickLogin}>
            {isLogin ? "Login" : "Create"}
          </PrimaryButton>
          <Button
            textAlign="center"
            fontWeight="500"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Create new account ?" : "Back to login"}
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
});
