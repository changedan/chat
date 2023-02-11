import { atom } from "recoil";

type AuthStateTypes = {
  isLoading: boolean;
  displayName: string;
  email: string;
  uid: string;
};

type roomStateTypes = {
  roomType: "direct" | "group";
};

type directTypes = {
  toId: string;
  fromId: string;
  roomId?: string;
};

export const authState = atom<AuthStateTypes>({
  key: "authState",
  default: {
    isLoading: false,
    displayName: null,
    email: null,
    uid: null,
  },
});

export const roomState = atom<roomStateTypes>({
  key: "roomState",
  default: {
    roomType: null,
  },
});

export const directState = atom<directTypes>({
  key: "directState",
  default: {
    toId: null,
    fromId: null,
    roomId: null,
  },
});
