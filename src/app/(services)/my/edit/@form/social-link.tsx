import React from 'react';

import { Text } from '@/components/atoms/text/Text';
import { useLogout, useUnregister } from '@/hooks/auth.hooks';

const SocialLink = () => {
  const { mutate: logout } = useLogout();
  const { mutate: unregister } = useUnregister();

  const buttonList = [
    { id: 1, title: '로그아웃', onClick: () => logout() },
    { id: 2, title: '회원 탈퇴', onClick: () => unregister() },
  ];

  return (
    <section>
      <div className="divider">
        <Text fontSize={12} color="grey02">
          로그아웃 및 탈퇴
        </Text>
      </div>

      <div className="flex flex-col">
        {buttonList.map((menu) => {
          return (
            <Text
              key={menu.id}
              className="py-2"
              onClick={menu.onClick}
              color={menu.title === '로그아웃' ? 'grey04' : 'red01'}
            >
              {menu.title}
            </Text>
          );
        })}
      </div>
    </section>
  );
};

export default SocialLink;
