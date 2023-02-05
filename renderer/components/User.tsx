import styled from "@emotion/styled";
import { HiUserCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import { getUserList } from "utils/firebase/firebase.utils";

const User = () => {
  const [subscribedUsers, setSubscribedUsers] = useState<any>([]);

  const userData = async () => {
    const userList = await getUserList();
    setSubscribedUsers(userList);
  };

  useEffect(() => {
    userData();
  }, []);

  console.log(subscribedUsers);

  return (
    <>
      {subscribedUsers?.map((user) => (
        <StyledUser key={user.email} style={{ color: "#000" }}>
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
  width: 460px;
  align-items: center;
  cursor: pointer;
  padding: 6px 10px;

  svg {
    font-size: 30px;
    color: #585858;
    margin-right: 6px;
  }
`;
