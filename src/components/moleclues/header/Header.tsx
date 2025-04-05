'use client';

import { useState } from 'react';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
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
          <BoxIcon name="search-alt" color="white01" size={24} onClick={onClickSearch} />
        )}
        {!isNotichecking && (
          <BoxIcon name="bell" color="white01" size={24} onClick={onClickNotification} />
        )}
      </div>
    </div>
  );
};

export default Header;
