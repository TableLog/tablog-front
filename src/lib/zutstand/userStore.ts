// store.ts
// store의 타입을 정의해준다.
import { create } from 'zustand/react';

interface ISocialUserData {
  birthday: string;
  email: string;
  imgUrl: string;
  nickname: string;
  provider: 'local' | 'kakao' | 'google';
  userName: string;
}

interface userIStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (newStatus: boolean) => void;
  socialUserData: ISocialUserData | null;
  setSocialUserData: (newStatus: ISocialUserData) => void;
  clearSocialUserData: () => void;
}

export const useUserStore = create<userIStore>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (newStatus: boolean) => set(() => ({ isLoggedIn: newStatus })),
  socialUserData: null,
  setSocialUserData: (newData: ISocialUserData | null) => set(() => ({ socialUserData: newData })),
  clearSocialUserData: () => set(() => ({ socialUserData: null })),
}));
