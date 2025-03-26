'use client';

import { useState } from 'react';

import Icon from '@/components/atoms/icon/Icon';
import Title from '@/components/atoms/title/Title';

const Header = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isNotichecking, setIsNotichecking] = useState(false);

  const onClickSearch = () => {
    setIsSearching(true);
    setIsNotichecking(false);
  };

  const onClickNotification = () => {
    setIsNotichecking(true);
    setIsSearching(false);
  };

  return (
    <div className="bg-primary01 flex w-[375px] justify-between px-[20px] pt-[23.5px] pb-[12.5px]">
      <Title />
      <div className="flex gap-[10px]">
        {!isSearching && (
          <Icon iconName="bx bx-search-alt" className="text-white01" onClick={onClickSearch} />
        )}
        {!isNotichecking && (
          <Icon iconName="bx bx-bell" className="text-white01" onClick={onClickNotification} />
        )}
      </div>
    </div>
  );
};

export default Header;
