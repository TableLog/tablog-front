// store.ts
// store의 타입을 정의해준다.
import { create } from 'zustand/react';

interface userIStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (newStatus: boolean) => void;
}

interface toastIStore {
  isRegisterSuccess: boolean;
  setIsRegisterSuccess: (newStatus: boolean) => void;
}

export const useUserStore = create<userIStore>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (newStatus: boolean) => set(() => ({ isLoggedIn: newStatus })),
}));

export const useToastStore = create<toastIStore>((set) => ({
  isRegisterSuccess: false,
  setIsRegisterSuccess: (newStatus: boolean) => set(() => ({ isRegisterSuccess: newStatus })),
}));
