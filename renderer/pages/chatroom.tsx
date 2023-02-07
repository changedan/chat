import { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "components/common/Button";
import Message from "components/Message";
import MessageForm from "components/MessageForm";
import { useRef } from "react";
import Navbar from "components/common/Navbar";
import styled from "@emotion/styled";

const HomePage: NextPage = function () {
  const router = useRouter();
  const scrollRef = useRef();

  return (
    <StyledChatroom>
      <StyledChat>
        <Message />
      </StyledChat>
      <MessageForm
      // scroll={scrollRef}
      />
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
  padding: 15px 0 15px;
  width: 430px;
`;
