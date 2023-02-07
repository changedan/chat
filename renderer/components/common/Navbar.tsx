import styled from "@emotion/styled";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { HiUser, HiChatAlt, HiChatAlt2 } from "react-icons/hi";
import { IoLogOut } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { auth } from "utils/firebase/firebase.utils";
// import { auth } from "utils/firebase/firebase.utils";
import { authState } from "../recoil/atoms";

const Navbar = () => {
  const setAuthSate = useSetRecoilState(authState);
  const user = auth.currentUser;
  const router = useRouter();

  // const updateAuthState = () => {
  //   setAuthSate({
  //     isLoading: true,
  //     displayName: user.displayName,
  //     email: user.email,
  //     uid: user.uid,
  //   });
  // };

  const handleLogOut = () => {
    signOut(auth);
    setAuthSate((prevState) => ({
      ...prevState,
      isLoading: false,
    }));
    console.log("로그아웃 성공");
    router.replace("/");
  };

  const handleUserList = () => {
    router.push("/userList");
  };

  const handleChat = () => {
    router.push("/chat");
  };

  return (
    <StyledNavbar>
      <HiUser onClick={handleUserList} />
      <HiChatAlt2 />
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
  margin: 10px;
  border-top: 1px solid #dadada;
  background-color: #dadada;

  padding: 10px;

  svg {
    cursor: pointer;
    font-size: 30px;
    color: #585858;
  }
`;
