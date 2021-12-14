import { memo, ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/button";

type Props = {
  children: ReactNode;
  onClick: () => void;
  // onClick: () => void;
}

export const TodoButton: VFC<Props> = memo((props)=>{
  const { children, onClick } = props;
  return (
    <Button 
      size='lg'
      height='60px'
      width='300px'
      border='2px'
      bg='orange.100'
      borderColor='orange.500'
      variant='outline'
      _hover={{ opacity: 0.8 }} 
      onClick={onClick}
    >
      {children}
    </Button>
  );
});