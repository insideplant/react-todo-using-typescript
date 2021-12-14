import { Flex, Heading, Text } from "@chakra-ui/layout";
import {memo, VFC} from "react";
import { useAuth } from "../../../hooks/useAuth";

export const Header: VFC = memo(() => {

  const {logout} = useAuth();

  return (
    <Flex 
      as="nav" 
      bg="orange.500"
      color="gray.50"
      align="center"
      justify="space-between"
      padding={{base: "3", md:"5"}}
    >
      <Heading as="h1" fontSize={{ base: "md", md: "lg"}}>
        TODO
      </Heading>
      <Text as="a" fontSize={{ base: "md", md: "lg"}}
        onClick={logout}
      >
        Log out
      </Text>
    </Flex>
  )
});