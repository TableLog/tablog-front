import React from 'react';
import Link from 'next/link';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { Text } from '@/components/atoms/text/Text';

interface INavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  menuName: string;
  iconName: string;
  href: string;
}

const NavigationMenu = ({ isActive, menuName, iconName, href }: INavigationMenuProps) => {
  return (
    <Link
      href={href}
      className="inline-flex min-w-[60px] cursor-pointer flex-col items-center justify-center gap-[4px]"
    >
      <BoxIcon name={iconName} color={isActive ? 'primary01' : 'grey04'} size={24} />

      <Text fontSize={14} color={isActive ? 'primary01' : 'grey04'}>
        {menuName}
      </Text>
    </Link>
  );
};

export default NavigationMenu;
