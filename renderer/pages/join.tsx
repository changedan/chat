import * as S from "styles/Join.modules";
import { NextPage } from "next";
import JoinForm from "components/JoinForm";
import { useRouter } from "next/router";

const IndexPage: NextPage = function () {
  const router = useRouter();

  return (
    <S.Join>
      <h2>회원가입</h2>
      <JoinForm />
      <S.Button onClick={() => router.push("/")}>홈</S.Button>
    </S.Join>
  );
};
export default IndexPage;
