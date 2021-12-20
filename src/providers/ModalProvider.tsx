import React, { createContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

export const ModalContext: React.Context<{}> = createContext({});


export const ModalProvider = (props: any) => {
  const [id, setId] = useState<string>("")
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("");
  const [limitDate, setLimitDate] = useState<string>("");
  const [detail, setDetail] = useState<string>("detail");
  const { children } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ModalContext.Provider value={{ 
      isOpen, 
      onOpen, 
      onClose, 
      isEditing,
      setIsEditing,
      setId,
      setTitle,
      setDetail,
      setLimitDate,
      id,
      title,
      limitDate,
      detail
    }}>
      {children}
    </ModalContext.Provider>
  );
};
