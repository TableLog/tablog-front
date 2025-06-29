// store.ts
// store의 타입을 정의해준다.
import { create } from 'zustand/react';

interface IRecipeStore {
  isFilter: boolean;
  setIsFilter: (newStatus: boolean) => void;
}
export const useRecipeStore = create<IRecipeStore>()((set) => ({
  isFilter: false,
  setIsFilter: (newStatus: boolean) => set(() => ({ isFilter: newStatus })),
}));
