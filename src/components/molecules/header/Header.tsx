'use client';

import { useState } from 'react';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import Title from '@/components/atoms/title/Title';

const Header = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isNotichecking, setIsNotichecking] = useState(false);

  const onSearch = () => {
    setIsSearching(true);
    setIsNotichecking(false);
  };

  const onCheckNotification = () => {
    setIsNotichecking(true);
    setIsSearching(false);
  };

  const onToMain = () => {
    setIsNotichecking(false);
    setIsSearching(false);
  };

  return (
    <header className="bg-primary01 flex h-[60px] w-full items-center justify-between px-[20px]">
      <Title onClick={onToMain} className="cursor-pointer" />

      <div className="flex gap-[10px]">
        {!isSearching && <BoxIcon name="search-alt" color="white01" size={24} onClick={onSearch} />}

        {!isNotichecking && (
          <BoxIcon name="bell" color="white01" size={24} onClick={onCheckNotification} />
        )}
      </div>
    </header>
  );
};

export default Header;
