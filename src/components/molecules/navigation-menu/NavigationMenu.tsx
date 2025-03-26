import React from 'react';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { Text } from '@/components/atoms/text/Text';

interface INavigationMenu {
  isActive?: boolean;
}

const NavigationMenu = ({ isActive }: INavigationMenu) => {
  return (
    <div className="flex inline-flex flex-col items-center justify-center">
      <BoxIcon
        onClick={() => console.log('testing icon click event')}
        name="home-smile"
        color={isActive ? 'primary01' : 'black01'}
        size={24}
      />

      <Text fontSize={14} color={isActive ? 'primary01' : 'black01'}>
        홈
      </Text>
    </div>
  );
};

export default NavigationMenu;
