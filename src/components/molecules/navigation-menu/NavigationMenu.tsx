import React from 'react';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { Text } from '@/components/atoms/text/Text';

interface INavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  menuName: string;
  iconName: string;
}

const NavigationMenu = ({ isActive, menuName, iconName, ...rest }: INavigationMenuProps) => {
  return (
    <div
      className="flex inline-flex cursor-pointer flex-col items-center justify-center gap-[4px]"
      {...rest}
    >
      <BoxIcon name={iconName} color={isActive ? 'primary01' : 'grey04'} size={24} />

      <Text fontSize={14} color={isActive ? 'primary01' : 'grey04'}>
        {menuName}
      </Text>
    </div>
  );
};

export default NavigationMenu;
