import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";
import { HiUser, HiChatAlt, HiChatAlt2 } from "react-icons/hi";
import { IoLogOut } from "react-icons/io5";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState, roomState } from "../recoil/atoms";

const Navbar = () => {
  const setAuthSate = useSetRecoilState(authState);
  const setRoomSate = useSetRecoilState(roomState);
  const router = useRouter();

  const handleLogOut = () => {
    setAuthSate({
      displayName: null,
      email: null,
      isLoading: false,
      uid: null,
    });
    router.replace("/");
  };

  const handleUserList = () => {
    router.push("/userList");
  };

  const handleChatroom = () => {
    setRoomSate({ roomType: "group" });
    router.push("/chatroom");
  };

  return (
    <StyledNavbar>
      <HiUser onClick={handleUserList} />
      <HiChatAlt2 onClick={handleChatroom} />
      <IoLogOut onClick={handleLogOut} />
    </StyledNavbar>
  );
};

export default Navbar;

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 430px;
  height: 50px;
  border-top: 1px solid #dadada;
  background-color: #dadada;

  padding: 10px;

  svg {
    cursor: pointer;
    font-size: 30px;
    color: #585858;
  }
`;
