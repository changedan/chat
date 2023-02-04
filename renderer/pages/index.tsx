import * as S from "styles/Home.modules";
import { NextPage } from "next";
import Login from "../components/LoginForm";

const HomePage: NextPage = function () {
  return (
    <S.Home>
      <h2>Chatting</h2>
      <Login />
    </S.Home>
  );
};

export default HomePage;
