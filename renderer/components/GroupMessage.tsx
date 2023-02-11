import styled from "@emotion/styled";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "utils/firebase/firebase.utils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState, directState, roomState } from "./recoil/atoms";

interface IChat {
  createdAt: string;
  fromId: string;
  fromName: string;
  message: string;
}

const GroupMessage = () => {
  const [messages, setMessages] = useState<Array<IChat>>([]);
  const { uid } = useRecoilValue(authState);

  const getGroupMessage = () => {
    const MessageRef = collection(db, "group");
    const queryGroupMsg = query(MessageRef, orderBy("createdAt"));

    const message = onSnapshot(queryGroupMsg, (snapshot) => {
      const msg = snapshot?.docs.map((data) => ({
        createdAt: data.data().createdAt,
        fromId: data.data().fromId,
        fromName: data.data().fromName,
        message: data.data().message,
      }));
      if (!msg) return setMessages(null);
      setMessages(msg);
    });
    return () => message();
  };

  useEffect(() => {
    getGroupMessage();
  }, []);

  return (
    <>
      <StyledGroupMas>Group Chat</StyledGroupMas>
      {messages &&
        messages?.map((msg) => (
          <StyledMsg key={msg.createdAt}>
            {msg.fromId === uid ? (
              <StyledUser style={{ color: "#45A9F9" }}>
                {msg.fromName}
              </StyledUser>
            ) : (
              <StyledUser>{msg.fromName}</StyledUser>
            )}
            {msg.message}
          </StyledMsg>
        ))}
    </>
  );
};

export default GroupMessage;

const StyledGroupMas = styled.h3`
  text-align: center;
`;

const StyledMsg = styled.li`
  list-style: none;
  padding: 2px 20px;
`;

const StyledUser = styled.b`
  margin-right: 6px;
`;
