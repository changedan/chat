import { atom } from "recoil";

type AuthStateType = {
  isLoading: boolean;
  user: {
    createdAt: string;
    displayName: string;
    email: string;
    uid: string;
  };
};

export const authState = atom<AuthStateType>({
  key: "authState",
  default: {
    isLoading: false,
    user: {
      createdAt: null,
      displayName: null,
      email: null,
      uid: null,
    },
  },
});
