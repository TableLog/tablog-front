'use client';
import type { PropsWithChildren } from 'react';
import type React from 'react';

import { usePopupContext } from '@/components/molecules/popup/PopupProvider';
import { useLoginStore } from '@/lib/zustand/userStore';

import Button from './Button';

/**
 * 로그인 된 유저만 클릭 가능한 버튼을 만듭니다.
 * 로그인이 된 상태가 아닐 때 클릭 이벤트를 가로채서 로그인 필요 모달을 띄웁니다.
 */
function LoginClickGuard({ children }: PropsWithChildren) {
  const { isLoggedIn } = useLoginStore();
  const { openModal } = usePopupContext();

  function handleClickCapture(e: React.MouseEvent<HTMLSpanElement>) {
    if (!isLoggedIn) {
      e.preventDefault();
      e.stopPropagation();
      openModal({
        title: '로그인이 필요한 기능입니다.',
        activeButtonComponent: ({ closeModal }) => (
          <Button
            href="/login"
            buttonColor="primary"
            size="medium"
            onClick={() => {
              closeModal();
            }}
          >
            로그인
          </Button>
        ),
        children: <p>로그인 후 이용해주세요.</p>,
      });
    }
  }

  return <span onClickCapture={handleClickCapture}>{children}</span>;
}

export default LoginClickGuard;
