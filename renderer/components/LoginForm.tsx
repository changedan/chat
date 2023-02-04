import * as S from "styles/LoginForm.modules";
import { useState } from "react";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleMemberId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <S.LoginForm>
        아이디
        <input type="text" value={id} onChange={handleMemberId} />
        비밀번호
        <input type="text" value={password} onChange={handlePassword} />
      </S.LoginForm>
      <button onClick={() => router.push("/join")}>회원가입</button>
      <button onClick={() => router.push("/")}>로그인</button>
    </>
  );
};

export default LoginForm;
