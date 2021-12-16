import React, { useReducer, useState } from "react";
import { memo,VFC } from "react";
import { Stack } from "@chakra-ui/layout";
import { FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react'

import reducer from "../../../hooks/reducer"
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { auth, db } from "../../../firebase"
import { collection, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
}

type State = {
  title: string,
  limitDate: string,
  detail: string,
  createdAt: Date | null //初期値を無しにしたい場合はどうすべきか
}

const initialState: State[] = [
  {
    title: "initial todo",
    limitDate: "2021/1/1",
    detail: "",
    createdAt: null
  }
];

export const TodoDetailModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose} = props;
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [title, setTitle] = useState<string>('');
  const [limitDate, setLimitDate] = useState<string>('');
  const [detail, setDetail] = useState<string>('');
  
    const addEvent2 = async() => {
      await addDoc(collection(db, "Todos"), {
        title,
        limitDate,
        detail,
        createdAt: serverTimestamp(),
      });
      setLimitDate("");
      setTitle("");
      setDetail("");
      onClose();
    }

  // const addEvent:() => void = () => {
  //   dispatch({
  //     type: 'CREATE_EVENT',
  //     title,
  //     limitDate,
  //     detail
  //   })
  //   setLimitDate("")
  //   setTitle("")
  //   setDetail("")
  //   onClose()
  // }

  return (
    <Modal 
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInRight"
    >
      <ModalOverlay />
      <ModalContent pb={6}>
        <ModalHeader>
          New Todo
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Limit Date</FormLabel>
              <Input value={limitDate} onChange={e => setLimitDate(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>To Do</FormLabel>
              <Input value={title} onChange={e => setTitle(e.target.value)}/>
            </FormControl>
            <FormControl>
              <FormLabel>Detail</FormLabel>
              <Textarea value={detail}  onChange={e => setDetail(e.target.value)}/>
            </FormControl>
            <PrimaryButton onClick={addEvent2}>Create a Todo</PrimaryButton>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
});