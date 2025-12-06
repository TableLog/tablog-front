// store.ts
// store의 타입을 정의해준다.
import { create } from 'zustand/react';

import { IRecipeFilterParams } from '@/types/api';

interface IRecipeStore {
  isFilter: boolean;
  setIsFilter: (newStatus: boolean) => void;
}
export const useRecipeStore = create<IRecipeStore>()((set) => ({
  isFilter: false,
  setIsFilter: (newStatus: boolean) => set(() => ({ isFilter: newStatus })),
}));

export const useFilterStore = create<{
  filterCondition: Partial<IRecipeFilterParams> | null;
  setFilterCondition: (newCondition: Partial<IRecipeFilterParams> | null) => void;
}>((set) => ({
  filterCondition: null,
  setFilterCondition: (newCondition: Partial<IRecipeFilterParams> | null) =>
    set(() => ({ filterCondition: newCondition })),
}));
