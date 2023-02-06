import styled from "@emotion/styled";
import { HiUserCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "utils/firebase/firebase.utils";

interface IUser {
  email: string;
  displayName: string;
}

const User = () => {
  const router = useRouter();
  const [user, setUser] = useState<Array<IUser>>([]);

  const handleChatroom = () => {
    router.push("/chatroom");
  };

  const getUserList = async () => {
    const user = await getDocs(collection(db, "user"));
    const userList = user.docs.map((user) => ({
      email: user.data().email,
      displayName: user.data().displayName,
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
          key={user.email}
          style={{ color: "#000" }}
          onClick={handleChatroom}
        >
          <HiUserCircle />
          {user.displayName}
        </StyledUser>
      ))}
    </>
  );
};

export default User;

const StyledUser = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 430px;
  align-items: center;
  cursor: pointer;
  padding: 6px 10px;

  svg {
    font-size: 30px;
    color: #585858;
    margin-right: 6px;
  }
`;
