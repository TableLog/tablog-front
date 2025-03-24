// store.ts

// store의 타입을 정의해준다.
import { create } from 'zustand/react';

interface Store {
  data: string;
  setData: (newData: string) => void;
}

// store를 create
const useStore = create<Store>((set) => ({
  data: '',
  setData: (newData: string) => set(() => ({ data: newData })),
}));

export default useStore;
