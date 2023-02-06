import { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "components/common/Button";
import Message from "components/Message";
import MessageForm from "components/MessageForm";
import { useRef } from "react";
import Navbar from "components/common/Navbar";

const HomePage: NextPage = function () {
  const router = useRouter();
  const scrollRef = useRef();

  return (
    <>
      <Message />
      <MessageForm
      // scroll={scrollRef}
      />
      <Navbar />
    </>
  );
};

export default HomePage;
