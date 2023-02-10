import styled from "@emotion/styled";
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { db } from "utils/firebase/firebase.utils";
import Button from "./common/Button";
import { authState, directState, roomState } from "./recoil/atoms";
import { RiSendPlane2Fill } from "react-icons/ri";
interface IMessageForm {
  text: string;
}

const MessageForm = () => {
  const [message, setMessage] = useState<IMessageForm>({
    text: "",
  });
  const { uid, displayName } = useRecoilValue(authState);
  const { roomType } = useRecoilValue(roomState);
  const { toId } = useRecoilValue(directState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.text === "") {
      return;
    }

    if (roomType === "direct") {
      addDoc(collection(db, "direct"), {
        createdAt: new Date(),
        displayName: displayName,
        message: message.text,
        roomUid: uid + toId,
        uid: uid,
      });
    }

    if (roomType === "group") {
      addDoc(collection(db, "group"), {
        createdAt: new Date(),
        fromId: uid,
        fromName: displayName,
        message: message.text,
      });
    }
    setMessage({ text: "" });
  };

  return (
    <StyledMsgForm onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        name="text"
        value={message.text}
        onChange={handleChange}
      />
      <StyledBtn type="submit" title="보내기">
        <RiSendPlane2Fill />
      </StyledBtn>
    </StyledMsgForm>
  );
};

export default MessageForm;

const StyledMsgForm = styled.form`
  display: flex;
  flex-flow: row;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  border: solid 1px #dadada;
  outline: 0;
  padding: 10px 110px 10px 14px;
  font-size: 15px;
`;

const StyledBtn = styled.button`
  border: solid 1px #dadada;
  background-color: #dadada;
  width: 60px;
  padding: 10px;

  svg {
    cursor: pointer;
    color: #585858;
    font-size: 22px;
  }
`;
