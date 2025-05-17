import { useEffect } from 'react';
import { Slide, toast } from 'react-toastify';
import axios from 'axios';

import { ERROR_CODE_MESSAGE_MAP } from '@/constants/error-message.constants';
import { APIErrorResponse } from '@/types/api';

export function hanldeApiError(error: unknown): never {
  console.info('running handle api error');

  if (axios.isAxiosError<APIErrorResponse>(error) && error.response) {
    if (error.status === 403) {
      console.error('토큰을 확인해주세요');
    }

    const { code } = error.response.data.message;

    if (code) {
      const errorMessage = ERROR_CODE_MESSAGE_MAP[code];

      console.error(`공통 에러 메세지: ${errorMessage}`);
    } else {
      console.error('알 수 없는 오류가 발생했습니다.');
    }
  }

  throw error;
}

export function HandleOpenModal(modalId: string) {
  const modal = document.getElementById(modalId) as HTMLDialogElement | null;

  if (modal) {
    modal.showModal();
  }
}

// 모달 등 해당 컨텐츠 밖 클릭시 닫기 이벤트
export function useClickOutsideClose(
  ref: React.RefObject<HTMLElement | null>,
  closeEvent: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeEvent();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeEvent, ref]);
}

// NOTE: 생년월일 포맷 자동으로 조정 ("YYYY-MM-DD")
export function changeInputBirthFormat(e: React.ChangeEvent<HTMLInputElement>) {
  e.target.value = e.target.value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1-$2-$3')
    .replace(/(-{1,2})$/g, '');

  return e.target.value;
}

interface ToastProps {
  message: string | React.ReactNode;
  type: 'success' | 'error' | 'warning' | 'info';
}
export const showToast = ({ message, type }: ToastProps) => {
  toast[type](message, {
    transition: Slide,
    position: 'top-center',
    toastId: 'unique',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    role: type,
  });
};

export function getErrorCode(err: APIErrorResponse) {
  if (axios.isAxiosError<APIErrorResponse>(err) && err.response) {
    return err.response.data.message;
  }
}

export const showErrorToast = (err: APIErrorResponse) => {
  if (axios.isAxiosError<APIErrorResponse>(err) && err.response) {
    const errorCode = getErrorCode(err);

    showToast({ message: ERROR_CODE_MESSAGE_MAP[errorCode], type: 'error' });
  }
};
