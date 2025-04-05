import { isAxiosError } from 'axios';

import { ERROR_CODE_MESSAGE_MAP } from '@/constants/error-message.constants';
import { IApiErrorResponse } from '@/types/api';

export function getErrorMessage(errorCode?: string): string {
  if (errorCode) {
    return ERROR_CODE_MESSAGE_MAP[errorCode] || '알 수 없는 오류가 발생했습니다.';
  }

  return '에러 코드가 존재하지 않습니다.';
}

export function hanldeApiError(err: unknown): never {
  console.info('running handle api error');
  // AxiosError type과 커스텀 에러 response type을 같이 사용
  if (isAxiosError<IApiErrorResponse>(err)) {
    const errorCode = err.response?.data?.code;
    const message = getErrorMessage(errorCode);

    console.error(`${message}: ${err}`);
  } else {
    // AxiosError가 아닌 일반 오류 처리
    console.error('알 수 없는 오류 발생:', err);
  }

  throw err;
}
