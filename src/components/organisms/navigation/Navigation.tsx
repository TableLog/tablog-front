'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import NavigationMenu from '@/components/molecules/navigation-menu/NavigationMenu';
import { NAVIGATION_REVEAL_PATHS } from '@/constants/common.constants';
import { Z_INDEX } from '@/constants/z-index.constants';

const Navigation = () => {
  const pathname = usePathname();

  const shouldShow = NAVIGATION_REVEAL_PATHS.some((path) => pathname === path);

  if (!shouldShow) return null;

  const MENU_ARR = [
    { id: 1, name: '홈', iconName: 'home-smile', href: '/home' },
    { id: 2, name: '레시피', iconName: 'book', href: '/recipe' },
    { id: 3, name: '피드', iconName: 'message-square-dots', href: '/feed' },
    { id: 4, name: 'MY', iconName: 'user', href: '/my' },
  ];

  return (
    <nav
      className={`align-center bg-white01 border-grey07 fixed bottom-0 box-border flex h-[72px] max-h-[80px] w-full max-w-[100svw] justify-between border-t-1 px-[20px]`}
      style={{ zIndex: Z_INDEX.NAVIGATION }}
    >
      {MENU_ARR.map((menu) => {
        return (
          <NavigationMenu
            key={menu.id}
            menuName={menu.name}
            iconName={menu.iconName}
            isActive={pathname?.includes(menu.href)}
            href={menu.href}
          />
        );
      })}
    </nav>
  );
};

export default Navigation;
