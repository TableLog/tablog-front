'use client';

import Button from '@/components/atoms/button/Button';
import Popup from '@/components/moleclues/popup/Popup';
import Navigation from '@/components/organisms/navigation/Navigation';
import { HandleOpenModal } from '@/utils/functions';

export default function Page() {
  return (
    <div className="max-w-[360px]">
      <Navigation />

      <Button onClick={() => HandleOpenModal('my_modal_2')}>open modal</Button>

      <Popup
        title="가입된 계정이 없습니다"
        closeButtonComponent={
          <Button buttonColor="grey06" size="medium">
            닫기
          </Button>
        }
        activeButtonComponent={
          <Button buttonColor="primary" size="medium">
            로그인
          </Button>
        }
      >
        <>
          <p>입력하신 휴대폰 번호로 가입된 계정이 없습니다.</p>

          <p>정보를 다시 확인 후 입력해주세요.</p>
        </>
      </Popup>
    </div>
  );
}
