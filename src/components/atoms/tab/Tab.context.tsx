// TabsContext.tsx
'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type TabsContextType = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function TabsProvider({
  defaultIndex,
  children,
}: {
  defaultIndex?: number;
  children: ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex ?? 0);

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>{children}</TabsContext.Provider>
  );
}

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error('useTabsContext must be used within a TabsProvider');
  return context;
}
