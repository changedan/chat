import * as S from "styles/JoinForm.modules";
import React, { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../utils/firebase/firebase.utils";

export interface IJoinForm {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

const JoinForm = () => {
  const [formField, setFormFiled] = useState<IJoinForm>({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const { email, nickname, password, confirmPassword } = formField;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFiled({ ...formField, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    try {
      await createAuthUserWithEmailAndPassword(email, password);
    } catch (error) {}
  };

  return (
    <>
      <S.JoinForm onSubmit={handleSubmit}>
        <S.Label>이메일</S.Label>
        <S.Input
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="id@email.com"
        />

        <S.Label>닉네임</S.Label>
        <S.Input
          type="text"
          name="nickname"
          value={nickname}
          onChange={handleChange}
        />

        <S.Label>비밀번호</S.Label>
        <S.Input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <S.Label>비밀번호 확인</S.Label>
        <S.Input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <S.Button type="submit">가입하기</S.Button>
      </S.JoinForm>
    </>
  );
};

export default JoinForm;
