'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import Title from '@/components/atoms/title/Title';
import BottomSheet from '@/components/organisms/bottom-sheet/BottomSheet';
import Notification from '@/components/pages/Notification';
import Search from '@/components/pages/Search';

const Header = () => {
  const router = useRouter();

  const [isSearching, setIsSearching] = useState(false);
  const [isNotichecking, setIsNotichecking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getContent = () => {
    if (isSearching) return <Search />;
    if (isNotichecking) return <Notification />;
    return <div />;
  };

  const onSearch = () => {
    setIsSearching(true);
    setIsNotichecking(false);
    setIsOpen(true);
  };

  const onCheckNotification = () => {
    setIsNotichecking(true);
    setIsSearching(false);
    setIsOpen(true);
  };

  const onToMain = () => {
    router.push('/home');
    setIsNotichecking(false);
    setIsSearching(false);
    setIsOpen(false);
  };

  return (
    <div className="bg-primary01 flex h-[60px] w-full items-center justify-between px-[20px] select-none">
      <Title onClick={onToMain} className="cursor-pointer" />

      <div className="flex gap-[10px]">
        {!isSearching && <BoxIcon name="search-alt" color="white01" size={24} onClick={onSearch} />}

        {!isNotichecking && (
          <BoxIcon name="bell" color="white01" size={24} onClick={onCheckNotification} />
        )}
      </div>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showBackdrop={false}
        showHandlebar={false}
      >
        {getContent()}
      </BottomSheet>
    </div>
  );
};

export default Header;
