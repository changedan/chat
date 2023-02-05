import * as S from "styles/JoinForm.modules";
import React, { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../utils/firebase/firebase.utils";
import Button from "./common/Button";

export interface IJoinForm {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

const JoinForm = function () {
  const [joinField, setJoinFiled] = useState<IJoinForm>({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const { email, nickname, password, confirmPassword } = joinField;
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJoinFiled({ ...joinField, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    try {
      await createAuthUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
      if (error.code === "auth/weak-password") {
        setErrorMsg("비밀번호 6자리 이상 입력해주세요.");
      }
      if (error.code === "auth/invalid-email") {
        setErrorMsg("잘못된 이메일 주소입니다.");
      }
      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("이미 가입되어 있는 계정입니다");
      }
    }
  };

  return (
    <>
      <S.JoinForm onSubmit={handleSubmit}>
        <S.Label>이메일</S.Label>
        <S.Input
          type="text"
          name={"email"}
          value={email}
          onChange={handleChange}
          placeholder="id@email.com"
        />

        <S.Label>닉네임</S.Label>
        <S.Input
          type="text"
          name={"nickname"}
          value={nickname}
          onChange={handleChange}
        />

        <S.Label>비밀번호</S.Label>
        <S.Input
          type="password"
          name={"password"}
          value={password}
          onChange={handleChange}
        />

        <S.Label>비밀번호 확인</S.Label>
        <S.Input
          type="password"
          name={"confirmPassword"}
          value={confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit" title="가입하기" />
      </S.JoinForm>
    </>
  );
};

export default JoinForm;
