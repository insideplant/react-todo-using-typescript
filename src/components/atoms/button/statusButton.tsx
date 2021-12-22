import { memo, ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/button";

enum Status {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}

type Props = {
  children: ReactNode;
  onClick: () => void;
  status: Status;
};

export const StatusButton: VFC<Props> = memo((props) => {
  const { children, onClick, status } = props;
  const color = (e:Status) =>{
    switch (e) {
      case "TODO": 
        return "green.100";
      case "DOING": 
        return "orange.300";
      case "DONE": 
        return "gray.300";
    }
  };

  return (
    <Button
      bg={color(status)}
      _hover={{ opacity: 0.8 }}
      onClick={onClick}
      mr={3}
    >
      {children}
      {/* {console.log(color(status))} */}
    </Button>
  );
});
