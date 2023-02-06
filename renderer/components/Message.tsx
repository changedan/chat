import styled from "@emotion/styled";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "utils/firebase/firebase.utils";

interface IChat {
  text: string;
  createdAt: string;
}

const Message = () => {
  const [messages, setMessage] = useState<Array<IChat>>();
  const scroll = useRef();

  const getMessage = () => {
    const queryMessage = collection(db, "messages");
    const message = onSnapshot(queryMessage, (snapshot) => {
      const msg = snapshot.docs.map((data) => ({
        text: data.data().text,
        createdAt: data.data().createdAt,
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
        <div key={msg.createdAt}>{msg.text}</div>
      ))}
    </>
  );
};

export default Message;
