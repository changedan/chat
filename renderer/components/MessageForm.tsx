import styled from "@emotion/styled";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { auth, db } from "utils/firebase/firebase.utils";
import Button from "./common/Button";
import { authState } from "./recoil/atoms";

interface IMessageForm {
  text: string;
}

const MessageForm = () => {
  const [message, setMessage] = useState<IMessageForm>({
    text: "",
  });
  const { email, uid, displayName } = useRecoilValue(authState);
  const setAuthState = useSetRecoilState(authState);

  const getUserInfo = async () => {
    const queryDisplayName = query(
      collection(db, "user"),
      where("uid", "==", `"${auth.currentUser.uid}"`)
    );
    const querySnapshot = await getDocs(queryDisplayName);
    const getDisplayName = new Array();
    getDisplayName.push(
      querySnapshot.forEach((data) => ({
        displayName: data.data().display,
      }))
    );
    setAuthState((prevent) => ({
      ...prevent,
      displayName: getDisplayName[0].displayName,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value });
  };

  console.log(auth.currentUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.text === "") {
      return;
    }

    getUserInfo();

    await addDoc(collection(db, "messages"), {
      text: message.text,
      createdAt: serverTimestamp(),
      displayName: displayName,
      uid: uid,
      email: email,
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
