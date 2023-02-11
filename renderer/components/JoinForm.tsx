import React, { useState } from "react";
import Button from "./common/Button";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "utils/firebase/firebase.utils";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

interface IJoinForm {
  email: string;
  displayName: string;
  password: string;
  confirmPassword: string;
}

const JoinForm = () => {
  const [joinField, setJoinFiled] = useState<IJoinForm>({
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  });
  const { email, displayName, password, confirmPassword } = joinField;
  const [errorMsg, setErrorMsg] = useState<string>("");
  const router = useRouter();

  const createUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: joinField.displayName });

      setDoc(doc(db, "user", auth.currentUser.uid), {
        createdAt: serverTimestamp(),
        displayName: joinField.displayName,
        email: joinField.email,
        uid: auth.currentUser.uid,
      });
      router.push("/");
    } catch (error) {
      if (error) {
        return setErrorMsg("회원가입에 실패했습니다.");
      }
      if (error.code === "auth/weak-password") {
        return setErrorMsg("비밀번호 6자리 이상 입력해주세요.");
      }
      if (error.code === "auth/invalid-email") {
        return setErrorMsg("잘못된 이메일 주소입니다.");
      }
      if (error.code === "auth/email-already-in-use") {
        return setErrorMsg("이미 가입되어 있는 계정입니다");
      }
      return setErrorMsg("회원가입에 실패했습니다.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJoinFiled({ ...joinField, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
    }

    createUser(email, password);
  };

  return (
    <StyledJoinForm onSubmit={handleSubmit}>
      <StyledLabel>이메일</StyledLabel>
      <StyledInput
        type="text"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="id@email.com"
      />

      <StyledLabel>닉네임</StyledLabel>
      <StyledInput
        type="text"
        name="displayName"
        value={displayName}
        onChange={handleChange}
      />

      <StyledLabel>비밀번호</StyledLabel>
      <StyledInput
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
      />

      <StyledLabel>비밀번호 확인</StyledLabel>
      <StyledInput
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleChange}
      />
      {errorMsg}
      <Button type="submit" title="가입하기" />
    </StyledJoinForm>
  );
};

export default JoinForm;

const StyledJoinForm = styled.form`
  display: flex;
  flex-flow: column;
`;

const StyledLabel = styled.label`
  font-weight: 700;
  margin-bottom: 6px;
`;

const StyledInput = styled.input`
  border: solid 1px #dadada;
  outline: 0;
  padding: 10px 110px 10px 14px;
  font-size: 15px;
  margin-bottom: 20px;
`;
