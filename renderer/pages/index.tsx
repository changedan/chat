import * as S from "styles/Home.modules";
import Login from "../components/LoginForm";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "components/common/Button";

const HomePage: NextPage = function () {
  const router = useRouter();

  return (
    <S.Home>
      <S.Header>
        <h1>Chatting</h1>
      </S.Header>
      <Login />
      {/* <S.Button onClick={() => router.push("/join")}>회원가입</S.Button> */}
      <Button
        type="button"
        title="회원가입"
        color="#585858"
        buttonColor={{ background: "#fff" }}
        onClick={() => router.push("/join")}
      />
    </S.Home>
  );
};

export default HomePage;
