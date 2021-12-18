import { memo, ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/button";

type Props = {
  children: ReactNode;
  onClick: () => void;
}

export const PrimaryButton: VFC<Props> = memo((props)=>{
  const { children, onClick } = props;
  return (
    <Button 
      bg="orange.300" 
      _hover={{ opacity: 0.8 }} 
      onClick={onClick}
      mr={3}
    >
      {children}
    </Button>
  );
});