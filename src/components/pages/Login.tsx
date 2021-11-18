import React, { useState, useEffect } from "react";
import { memo,VFC } from "react";
import { Flex, Box, Button, Heading, Input, Stack } from "@chakra-ui/react"
import { auth } from "../../firebase"
import { onAuthStateChanged } from "@firebase/auth";
import { useNavigate } from "react-router";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";


export const Login: VFC = memo((props: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const onClickLogin = () => login(email, password, isLogin)

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      user && navigate("/login");
    });
    return () => unSub();
  }, [navigate]);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" py={5} w="sm" borderRadius="md" shadow="md">
        <Heading as="h1" px={10}>{ isLogin? "Login" : "Register" }</Heading>
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
          <PrimaryButton onClick={onClickLogin}>{isLogin ? "ログイン" : "登録"}</PrimaryButton>
          <Button textAlign="center" fontWeight="500" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create new account ?" : "Back to login"}
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
});