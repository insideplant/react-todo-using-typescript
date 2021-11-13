import { memo,VFC } from "react";
import { Flex, Box, Button, Heading, Input, Stack } from "@chakra-ui/react"

export const Login: VFC = memo(() => {
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" borderRadius="md" shadow="md">
        <Heading as="h1"></Heading>
        <Stack spacing={4} py={4} px={10}>
          <Input placeholder="User ID" />
          <Input placeholder="Password" />
          <Button bg="orange.300" _hover={{ opacity: 0.8 }}>ログイン</Button>
        </Stack>
      </Box>
    </Flex>
  );
});