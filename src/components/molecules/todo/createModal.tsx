import React, { useContext, VFC } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Modal,
  ModalOverlay,
  ModalContent
} from "@chakra-ui/react";

import { Stack } from "@chakra-ui/layout";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

import { db } from "../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ModalContext } from "../../../providers/ModalProvider";

export const CreateModal: VFC = () => {
  const {
    onClose,
    title,
    limitDate,
    detail,
    setTitle,
    setLimitDate,
    setDetail,
    isOpen
  } = useContext<any>(ModalContext);

  enum Status {
    TODO = 'TODO',
    DOING = 'DOING',
    DONE = 'DONE',
  }

  const addEvent = async () => {
    await addDoc(collection(db, "Todos"), {
      title,
      status: Status.TODO,
      limitDate,
      detail,
      createdAt: serverTimestamp(),
    });
    setLimitDate("");
    setTitle("");
    setDetail("");
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        motionPreset="slideInRight"
      >
        <ModalOverlay />
        <ModalContent pb={6}>
          <ModalHeader>New Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Limit Date</FormLabel>
                <Input
                  type="date" 
                  value={limitDate}
                  onChange={(e) => setLimitDate(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>To Do</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Detail</FormLabel>
                <Textarea
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
              </FormControl>
              <PrimaryButton onClick={addEvent}>Create a Todo</PrimaryButton>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
