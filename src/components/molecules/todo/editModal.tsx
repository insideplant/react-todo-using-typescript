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
  ModalContent,
  Stack
} from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";

import { db } from "../../../firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import { ModalContext } from "../../../providers/ModalProvider";

export const EditModal: VFC = () => {
  const {
    onClose,
    id,
    title,
    limitDate,
    detail,
    setTitle,
    setLimitDate,
    setDetail,
    setIsEditing,
    isOpen,
  } = useContext<any>(ModalContext);

  const tasksRef = collection(db, "Todos");
  const editEvent = async () => {
    await setDoc(
      doc(tasksRef, id),
      {
        title,
        limitDate,
        detail,
      },
      { merge: true }
    );
    onClose();
    setIsEditing(true);
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
          <ModalHeader>Edit Todo</ModalHeader>
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
              <PrimaryButton onClick={editEvent}>Update a Todo</PrimaryButton>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
