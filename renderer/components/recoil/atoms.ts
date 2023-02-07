import { atom } from "recoil";

type AuthStateType = {
  isLoading: boolean;
  displayName: string;
  email: string;
  uid: string;
};

export const authState = atom<AuthStateType>({
  key: "authState",
  default: {
    isLoading: false,
    displayName: null,
    email: null,
    uid: null,
  },
});
