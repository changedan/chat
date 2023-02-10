import { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "components/common/Button";
import Message from "components/Message";
import MessageForm from "components/MessageForm";
import Navbar from "components/common/Navbar";
import styled from "@emotion/styled";
import { roomState } from "components/recoil/atoms";
import { useRecoilValue } from "recoil";
import GroupMessage from "components/GroupMessage";

const HomePage: NextPage = function () {
  const { roomType } = useRecoilValue(roomState);

  return (
    <StyledChatroom>
      <StyledChat>
        <StyledMessage>
          {roomType === "direct" && <Message />}
          {roomType === "group" && <GroupMessage />}
        </StyledMessage>
        <MessageForm
        // scroll={scrollRef}
        />
      </StyledChat>
      <Navbar />
    </StyledChatroom>
  );
};

export default HomePage;

const StyledChatroom = styled.main`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
`;

const StyledChat = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  height: 100%;
`;

const StyledMessage = styled.ul`
  padding: 15px 0 15px;
  width: 430px;
`;
