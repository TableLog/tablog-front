'use client';
import { MouseEvent, PropsWithChildren } from 'react';

import Popup from '@/components/molecules/popup/Popup';
import { LOGIN_REQUIRED_MODAL } from '@/constants/modal.constants';
import { useLoginStore } from '@/lib/zustand/userStore';
import { handleOpenModal } from '@/utils/functions';

import Button from './Button';

/**
 * 로그인 된 유저만 클릭 가능한 버튼을 만듭니다.
 * 로그인이 된 상태가 아닐 때 클릭 이벤트를 가로채서 로그인 필요 모달을 띄웁니다.
 */
function LoginClickGuard({ children }: PropsWithChildren) {
  const { isLoggedIn } = useLoginStore();

  function handleClickCapture(e: MouseEvent<HTMLElement>) {
    if (!isLoggedIn) {
      e.preventDefault();
      e.stopPropagation();
      handleOpenModal(LOGIN_REQUIRED_MODAL);
    }
  }

  return (
    <>
      <Popup
        id={LOGIN_REQUIRED_MODAL}
        title="로그인이 필요한 기능입니다."
        activeButtonComponent={
          <Button href="/login" buttonColor="primary" size="medium">
            로그인
          </Button>
        }
      >
        <p>로그인 후 이용해주세요.</p>
      </Popup>
      <span onClickCapture={handleClickCapture} style={{ display: 'contents' }}>
        {children}
      </span>
    </>
  );
}

export default LoginClickGuard;
