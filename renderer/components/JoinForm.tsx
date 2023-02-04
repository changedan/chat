import * as S from "styles/JoinForm.modules";
import React, { useState } from "react";
import { useRouter } from "next/router";
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

  const router = useRouter();

  return (
    <>
      <S.JoinForm onSubmit={handleSubmit}>
        <label>아이디</label>
        <input type="text" name="email" value={email} onChange={handleChange} />

        <label>닉네임</label>
        <input
          type="text"
          name="nickname"
          value={nickname}
          onChange={handleChange}
        />

        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <label>비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">회원가입</button>
      </S.JoinForm>
      <button onClick={() => router.push("/")}>홈으로</button>
    </>
  );
};

export default JoinForm;
