'use client';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

import Popup from '@/components/molecules/popup/Popup';
import { LOGIN_REQUIRED_MODAL } from '@/constants/modal.constants';
import { useLoginStore } from '@/lib/zustand/userStore';
import { handleOpenModal } from '@/utils/functions';

import Button, { ButtonProps } from './Button';

function LoginRequiredLink({ ...props }: ButtonProps) {
  const router = useRouter();
  const { isLoggedIn } = useLoginStore();

  function handleButtonClick(e?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
    if (!isLoggedIn) {
      e?.preventDefault();
      handleOpenModal(LOGIN_REQUIRED_MODAL);
      return;
    }

    if ('href' in props) {
      router.push(props.href.toString());
    } else {
      props.onClick?.();
    }
  }

  return (
    <>
      <Popup
        id={LOGIN_REQUIRED_MODAL}
        title="로그인이 필요합니다."
        activeButtonComponent={
          <Button href="/login" buttonColor="primary" size="medium">
            로그인
          </Button>
        }
      >
        <p>로그인 후 이용해주세요.</p>
      </Popup>
      <Button onClick={handleButtonClick} {...props}>
        일기 작성
      </Button>
    </>
  );
}

export default LoginRequiredLink;
