import React, { VFC, useContext } from "react";
import { Tr, Td } from "@chakra-ui/table";
import { ModalContext } from "../../../providers/ModalProvider";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { StatusButton } from "../../atoms/button/statusButton";

type Props = {
  id: string;
  status: Status;
  index: number;
  detail: string;
  title: string;
  limitDate: string;
  createdAt: any;
};

enum Status {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}

export const TrTable: VFC<Props> = (props) => {
  const { id, status, index, createdAt, limitDate, title, detail } = props;
  const year = createdAt.getFullYear();
  const month = ("0" + (createdAt.getMonth() + 1)).slice(-2);
  const date = ("0" + createdAt.getDate()).slice(-2);
  console.log(id);

  const { onOpen, setIsEditing, setDetail, setTitle, setLimitDate, setId } =
    useContext<any>(ModalContext);

  const handleEditClick = () => {
    setIsEditing(false);
    onOpen();
    setDetail(detail);
    setLimitDate(limitDate);
    setTitle(title);
    setId(id);
  };

  const tasksRef = collection(db, "Todos");
  const deleteEvent = async () => {
    //Firebase ver9 compliant (modular)
    await deleteDoc(doc(tasksRef, id));
  };

  const editEvent2 = async (status: Status) => {
    const status2 = () => {
      if (status === Status.TODO) {
        return Status.DOING;
      } else if (status === Status.DOING) {
        return Status.DONE;
      } else {
        return Status.TODO;
      }
    };

    await setDoc(
      doc(tasksRef, id),
      {
        status: status2(),
      },
      { merge: true }
    );
  };

  return (
    <Tr>
      <Td>{index}</Td>
      <Td>
        <StatusButton onClick={() => editEvent2(status)} status={status} >{status}</StatusButton>
      </Td>
      <Td>{title}</Td>
      <Td>{limitDate}</Td>
      <Td>
        {year}-{month}-{date}
      </Td>
      <Td>
        <PrimaryButton onClick={handleEditClick}>edit</PrimaryButton>
        <PrimaryButton onClick={deleteEvent}>delete</PrimaryButton>
      </Td>
    </Tr>
  );
};
