import React, { useState, useEffect } from "react";
import { memo,VFC } from "react";
import { Flex, Box, Button, Heading, Input, Stack, Text } from "@chakra-ui/react"
import { auth } from "../../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";


export const Login: VFC = memo((props: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(()=>{
  //   auth.onAuthStateChanged((user)=>{
  //     user && props.history.push("/");
  //   })
  // },[props.history])

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
            name="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }} 
          />
          <Button 
            bg="orange.300" 
            _hover={{ opacity: 0.8 }}
            onClick={() =>
              isLogin 
              ? signInWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    props.history.push("/")
                  })
                  .catch((error) => {
                    const errorMessage = error.message;
                    alert(errorMessage)
                  })
              : createUserWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    props.history.push("/")
                  })
                  .catch((error) => {
                    const errorMessage = error.message;
                    alert(errorMessage)
                  })
            }
          >{isLogin ? "ログイン" : "登録"}</Button>
          <Text textAlign="center" fontWeight="500" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Create new account ?" : "Back to login"}
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
});