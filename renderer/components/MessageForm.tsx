import styled from "@emotion/styled";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { db } from "utils/firebase/firebase.utils";

import Button from "./common/Button";
import { authState } from "./recoil/atoms";

interface IMessageForm {
  text: string;
}

const MessageForm = () => {
  const [message, setMessage] = useState<IMessageForm>({
    text: "",
  });
  const authStateValue = useRecoilValue(authState);
  const { user } = authStateValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.text === "") {
      return;
    }

    await addDoc(collection(db, "messages"), {
      text: message.text,
      createdAt: serverTimestamp(),
      displayName: user.displayName,
      uid: user.uid,
    });
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
      <Button type="submit" title="보내기" />
    </StyledMsgForm>
  );
};

export default MessageForm;

const StyledMsgForm = styled.form`
  display: flex;
  flex-flow: column;
  width: 430px;
`;

const StyledInput = styled.input`
  width: 100%;
  border: solid 1px #dadada;
  outline: 0;
  padding: 10px 110px 10px 14px;
  font-size: 15px;
  margin-bottom: 20px;
`;
