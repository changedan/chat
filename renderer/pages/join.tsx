import * as S from "styles/Join.modules";
import { NextPage } from "next";
import JoinForm from "components/JoinForm";

const IndexPage: NextPage = function () {
  return (
    <S.Join>
      <h2>회원가입</h2>
      <JoinForm />
    </S.Join>
  );
};
export default IndexPage;
