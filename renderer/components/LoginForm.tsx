import React, { useEffect, useState } from "react";
import Button from "./common/Button";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "utils/firebase/firebase.utils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "./recoil/atoms";
interface ILoginForm {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [loginField, setLoginFiled] = useState<ILoginForm>({
    email: "",
    password: "",
  });
  const { email, password } = loginField;
  const [errorMsg, setErrorMsg] = useState<string>("");
  const setAuthState = useSetRecoilState(authState);

  const router = useRouter();

  const updateAuthState = async (email) => {
    await setAuthState({
      isLoading: true,
      displayName: auth.currentUser.displayName,
      email: email,
      uid: auth.currentUser.uid,
    });
  };

  const signIn = async (email, password) => {
    if (email === "" || password === "") {
      return setErrorMsg("이메일 또는 비밀번호를 입력해주세요.");
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      updateAuthState(email);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        return setErrorMsg("메일 주소를 다시 확인해주세요.");
      }
      if (error.code === "auth/weak-password") {
        return setErrorMsg("비밀번호를 다시 확인해주세요.");
      }
      return setErrorMsg("로그인에 실패하였습니다.");
    }
    router.push("/userList", undefined, { shallow: true });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFiled({ ...loginField, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn(email, password);
  };

  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="이메일"
      />
      <StyledInput
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="비밀번호"
      />
      {errorMsg}
      <Button type="submit" title="로그인" />
    </StyledLoginForm>
  );
};

export default LoginForm;

const StyledLoginForm = styled.form`
  display: flex;
  flex-flow: column;
  width: 430px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border: solid 1px #dadada;
  outline: 0;
  padding: 10px 110px 10px 14px;
  font-size: 15px;
  margin-bottom: 20px;
`;
