// store.ts
// store의 타입을 정의해준다.
import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand/react';

import { LOCAL_IS_LOGIN } from '@/constants/storage-key.constants';

interface ISocialUserData {
  birthday: string;
  email: string;
  imgUrl: string;
  nickname: string;
  provider: 'local' | 'kakao' | 'google';
  userName: string;
}

interface ILoginStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (newStatus: boolean) => void;
}
export const useLoginStore = create<ILoginStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (newStatus: boolean) => set(() => ({ isLoggedIn: newStatus })),
    }),
    {
      name: LOCAL_IS_LOGIN,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

interface IUserStore {
  socialUserData: ISocialUserData | null;
  setSocialUserData: (newStatus: ISocialUserData) => void;
  clearSocialUserData: () => void;
  foundEmail: string;
  setFoundEmail: (newEmail: string) => void;
}
export const useUserStore = create<IUserStore>((set) => ({
  socialUserData: null,
  setSocialUserData: (newData: ISocialUserData | null) => set(() => ({ socialUserData: newData })),
  clearSocialUserData: () => set(() => ({ socialUserData: null })),
  foundEmail: '',
  setFoundEmail: (newEmail: string) => set(() => ({ foundEmail: newEmail })),
}));
