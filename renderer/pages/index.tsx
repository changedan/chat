import styled from "@emotion/styled";
import LoginForm from "../components/LoginForm";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "components/common/Button";

const HomePage: NextPage = function () {
  const router = useRouter();

  return (
    <StyledHome>
      <StyledHeader>
        <h1>CHAT</h1>
      </StyledHeader>
      <LoginForm />
      <Button
        type="button"
        title="회원가입"
        color="#585858"
        buttonColor={{ background: "#fff" }}
        onClick={() => router.replace("/join")}
      />
    </StyledHome>
  );
};

export default HomePage;

const StyledHome = styled.main`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  padding: 0 2rem;
`;

const StyledHeader = styled.header`
  margin-bottom: 20px;
`;
