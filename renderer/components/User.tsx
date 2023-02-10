import styled from "@emotion/styled";
import { HiUserCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState, directState, roomState } from "./recoil/atoms";
import { db } from "utils/firebase/firebase.utils";

interface IUser {
  email: string;
  uid: string;
  displayName: string;
}

const User = ({ addChat }) => {
  const [user, setUser] = useState<Array<IUser>>([]);
  const { uid, displayName } = useRecoilValue(authState);
  const setRoomSate = useSetRecoilState(roomState);
  const setDirectState = useSetRecoilState(directState);
  const router = useRouter();

  const handleChatroom = async (targetUid) => {
    if (addChat === false) return;

    const roomUid = targetUid + uid;

    await setDoc(doc(collection(db, "direct"), "roomUid"), {
      roomUid: roomUid,
    });
    setRoomSate({ roomType: "direct" });
    setDirectState({ fromId: uid, toId: targetUid });
    handleRouter();
  };

  const handleRouter = () => {
    router.replace("/chatroom");
  };

  const getUserList = async () => {
    const queryUser = await query(
      collection(db, "user"),
      where("displayName", "!=", displayName),
      orderBy("displayName", "asc")
    );
    const userData = await getDocs(queryUser);
    const userList = userData.docs.map((user) => ({
      email: user.data().email,
      displayName: user.data().displayName,
      uid: user.data().uid,
    }));
    setUser(userList);
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      {user.map((user) => (
        <StyledUser
          key={user.uid}
          style={{ color: "#000" }}
          onClick={() => handleChatroom(user.uid)}
        >
          <HiUserCircle />
          <StyledUserName>
            <StyledEmail>{user.email}</StyledEmail>
            <StyledDisplayName>
              {user.displayName && "@" + `${user.displayName}`}
            </StyledDisplayName>
          </StyledUserName>
        </StyledUser>
      ))}
    </>
  );
};

export default User;

const StyledUser = styled.li`
  display: flex;
  justify-content: flex-start;
  width: 430px;
  align-items: center;
  cursor: pointer;
  padding: 6px 10px;

  svg {
    font-size: 50px;
    color: #585858;
    margin-right: 6px;
  }
`;

const StyledUserName = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledEmail = styled.span``;

const StyledDisplayName = styled.b``;
