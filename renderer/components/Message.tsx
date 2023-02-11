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
  displayName: string;
  message: string;
  uid: string;
  roomId?: string;
}

const Message = () => {
  const [messages, setMessages] = useState<Array<IChat>>([]);
  const { uid } = useRecoilValue(authState);
  const { toId } = useRecoilValue(directState);
  const setDirectState = useSetRecoilState(directState);

  const getDirectMessage = () => {
    const MessageRef = collection(db, "direct");
    const queryDirectMsg = query(
      MessageRef,
      where("roomUid", "in", [uid + toId, toId + uid]),
      orderBy("createdAt")
    );

    const message = onSnapshot(queryDirectMsg, (snapshot) => {
      const msg = snapshot?.docs.map((data) => ({
        createdAt: data.data().createdAt,
        displayName: data.data().displayName,
        message: data.data().message,
        uid: data.data().uid,
        roomId: data.data().roomId,
      }));
      if (!msg) return setMessages(null);
      setMessages(msg);
      setDirectState((prevent) => ({
        ...prevent,
        roomId: msg[0]?.roomId,
      }));
    });
    return () => message();
  };
  useEffect(() => {
    getDirectMessage();
  }, []);

  return (
    <>
      <StyledDirect>Direct Chat</StyledDirect>
      {messages &&
        messages?.map((msg) => (
          <StyledMsg key={msg.createdAt}>
            {msg.uid === uid ? (
              <StyledUser style={{ color: "#45A9F9" }}>
                {msg.displayName}
              </StyledUser>
            ) : (
              <StyledUser>{msg.displayName}</StyledUser>
            )}
            {msg.message}
          </StyledMsg>
        ))}
    </>
  );
};

export default Message;

const StyledDirect = styled.h3`
  text-align: center;
`;

const StyledMsg = styled.li`
  list-style: none;
  padding: 2px 20px;
`;

const StyledUser = styled.b`
  margin-right: 6px;
`;
