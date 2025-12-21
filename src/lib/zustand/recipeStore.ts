// store.ts
// store의 타입을 정의해준다.
import { create } from 'zustand/react';

import { IRecipeFilterParams } from '@/types/api';

export const useFilterStore = create<{
  filterCondition: Partial<IRecipeFilterParams> | null;
  setFilterCondition: (newCondition: Partial<IRecipeFilterParams> | null) => void;
}>((set) => ({
  filterCondition: null,
  setFilterCondition: (newCondition: Partial<IRecipeFilterParams> | null) =>
    set((prev) => ({ filterCondition: { ...prev.filterCondition, ...newCondition } })),
}));
