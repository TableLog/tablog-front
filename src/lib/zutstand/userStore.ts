// store.ts
// store의 타입을 정의해준다.
import { create } from 'zustand/react';

interface Store {
  isLoggedIn: boolean;
  setIsLoggedIn: (newStatus: boolean) => void;
}

// store를 create
const useUserStore = create<Store>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (newStatus: boolean) => set(() => ({ isLoggedIn: newStatus })),
}));

export default useUserStore;
