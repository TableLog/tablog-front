import { create } from 'zustand/react';

interface toastIStore {
  isRegisterSuccess: boolean;
  setIsRegisterSuccess: (newStatus: boolean) => void;
}
export const useToastStore = create<toastIStore>((set) => ({
  isRegisterSuccess: false,
  setIsRegisterSuccess: (newStatus: boolean) => set(() => ({ isRegisterSuccess: newStatus })),
}));
