import React, { useContext } from "react";
import { VFC } from "react";

import { ModalContext } from "../../../providers/ModalProvider";
import { CreateModal } from "../../molecules/todo/createModal";
import { EditModal } from "../../molecules/todo/editModal";

export const TodoDetailModal: VFC = () => {
  const { isEditing } = useContext<any>(ModalContext);


  return (
    <>
      {isEditing ? (
        <CreateModal />
        ) : (
        <EditModal  />
        ) 
      }
    </>
  )
};