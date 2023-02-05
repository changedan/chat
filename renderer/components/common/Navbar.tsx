import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { HiUser, HiChatAlt, HiChatAlt2 } from "react-icons/hi";
import { IoLogOut } from "react-icons/io5";
import { singOutAuth } from "utils/firebase/firebase.utils";

const Navbar = () => {
  const router = useRouter();

  const handleLogOut = () => {
    singOutAuth();
    router.replace("/");
  };

  return (
    <StyledNavbar>
      <HiUser />
      <HiChatAlt />
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
  width: 460px;
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
