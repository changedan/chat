import * as S from "styles/LoginForm.modules";
import React, { useState } from "react";
import { signInAuthUserWithEmailAndPassword } from "../utils/firebase/firebase.utils";
import Button from "./common/Button";
import { useRouter } from "next/router";

export interface ILoginForm {
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

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFiled({ ...loginField, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" && password === "") {
      setErrorMsg("이메일 또는 비밀번호를 확인해주세요.");
    }

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      router.push("/userList");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/user-not-found" || "user-not-found") {
        setErrorMsg("이메일을 잘못 입력했습니다.");
      }
      if (error.code === "auth/wrong-password") {
        setErrorMsg("비밀번호를 잘못 입력했습니다.");
      }
    }
  };

  return (
    <>
      <S.LoginForm onSubmit={handleSubmit}>
        <S.Input
          type="text"
          name={"email"}
          value={email}
          onChange={handleChange}
          placeholder={"이메일"}
        />
        <S.Input
          type="password"
          name={"password"}
          value={password}
          onChange={handleChange}
          placeholder={"비밀번호"}
        />
        <Button type="submit" title="로그인" />
      </S.LoginForm>
    </>
  );
};

export default LoginForm;
