import * as S from "styles/Join.modules";
import { NextPage } from "next";
import JoinForm from "components/JoinForm";
import { useRouter } from "next/router";
import Button from "components/common/Button";

const IndexPage: NextPage = function () {
  const router = useRouter();

  return (
    <S.Join>
      <h2>회원가입</h2>
      <JoinForm />
      <Button
        title="홈"
        type="button"
        color="#585858"
        buttonColor={{ background: "#fff" }}
        onClick={() => router.push("/")}
      />
    </S.Join>
  );
};
export default IndexPage;
