// TabsContext.tsx
'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type TabsContextType = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  handleTabChange?: (index: number) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function TabsProvider({
  defaultIndex,
  children,
  handleTabChange,
}: {
  defaultIndex?: number;
  children: ReactNode;
  handleTabChange?: (index: number) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex ?? 0);

  useEffect(() => {
    handleTabChange?.(activeIndex);
  }, [activeIndex, handleTabChange]);

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex, handleTabChange }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) throw new Error('useTabsContext must be used within a TabsProvider');

  return context;
}
