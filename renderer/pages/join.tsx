import { NextPage } from "next";
import JoinForm from "components/JoinForm";
import { useRouter } from "next/router";
import Button from "components/common/Button";
import styled from "@emotion/styled";

const IndexPage: NextPage = function () {
  const router = useRouter();

  return (
    <StyledJoin>
      <h2>회원가입</h2>
      <JoinForm />
      <Button
        title="홈"
        type="button"
        color="#585858"
        buttonColor={{ background: "#fff" }}
        onClick={() => router.push("/")}
      />
    </StyledJoin>
  );
};
export default IndexPage;

const StyledJoin = styled.main`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  padding: 0 2rem;
`;
