'use client';

import React, { useCallback, useState } from 'react';

import NavigationMenu from '@/components/molecules/navigation-menu/NavigationMenu';

const Navigation = () => {
  const [isMenuOn, setIsMenuOn] = useState<number>(0);

  const MENU_ARR = [
    { id: 1, name: '홈', iconName: 'home-smile' },
    { id: 2, name: '레시피', iconName: 'book' },
    { id: 3, name: '피드', iconName: 'message-square-dots' },
    { id: 4, name: 'MY', iconName: 'user' },
  ];

  const handleMenuActiveChange = useCallback((i: number) => {
    setIsMenuOn(i);
  }, []);

  return (
    <nav className="align-center bg-white01 border-grey07 fixed bottom-0 box-border flex h-[72px] max-h-[80px] w-full max-w-[100svw] justify-between border-t-1 px-[20px]">
      {MENU_ARR.map((menu, i) => {
        return (
          <NavigationMenu
            key={menu.id}
            onClick={() => handleMenuActiveChange(i)}
            menuName={menu.name}
            iconName={menu.iconName}
            isActive={i === isMenuOn}
          />
        );
      })}
    </nav>
  );
};

export default Navigation;
