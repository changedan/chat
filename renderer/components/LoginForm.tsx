import * as S from "styles/LoginForm.modules";
import { useState } from "react";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState<string>("");

  const handleMemberId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <S.LoginForm>
        <S.Input
          type="text"
          value={id}
          onChange={handleMemberId}
          placeholder={"아이디"}
        />
        <S.Input
          type="text"
          value={password}
          onChange={handlePassword}
          placeholder={"비밀번호"}
        />
        <S.Button onClick={() => {}}>로그인</S.Button>
      </S.LoginForm>
    </>
  );
};

export default LoginForm;
