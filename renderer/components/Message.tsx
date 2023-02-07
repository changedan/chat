import styled from "@emotion/styled";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { db } from "utils/firebase/firebase.utils";
import { authState } from "./recoil/atoms";

interface IChat {
  text: string;
  createdAt: string;
  displayName: string;
  uid: string;
  email: string;
}

const Message = () => {
  const [messages, setMessage] = useState<Array<IChat>>([]);
  const setAuthSate = useRecoilValue(authState);

  const getMessage = () => {
    const queryMessage = query(
      collection(db, "messages"),
      orderBy("createdAt")
    );
    const message = onSnapshot(queryMessage, (snapshot) => {
      const msg = snapshot.docs.map((data) => ({
        text: data.data().text,
        displayName: data.data().displayName,
        createdAt: data.data().createdAt,
        email: data.data().email,
        uid: data.data().uid,
      }));
      setMessage(msg);
    });
    return () => message();
  };

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <>
      {messages?.map((msg) => (
        <div key={msg.createdAt}>
          {msg.displayName}
          {msg.text}
        </div>
      ))}
    </>
  );
};

export default Message;
