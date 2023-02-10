import { NextPage } from "next";
import Navbar from "components/common/Navbar";
import User from "components/User";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const IndexPage: NextPage = function () {
  const [addChat, setAddChat] = useState(false);

  const handleAddChat = async () => {
    await setAddChat(true);
  };

  useEffect(() => {
    handleAddChat();
  }, [addChat]);

  return (
    <StyledUserList>
      <StyledUser
        onClick={() => {
          handleAddChat();
        }}
      >
        <User addChat={addChat} />
      </StyledUser>
      <Navbar />
    </StyledUserList>
  );
};
export default IndexPage;

const StyledUserList = styled.main`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  padding: 0 2rem;
`;

const StyledUser = styled.ul``;
