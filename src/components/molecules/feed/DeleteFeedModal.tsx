import React from 'react';

import Button from '@/components/atoms/button/Button';
import Popup from '@/components/molecules/popup/Popup';
import { DELETE_FEED_MODAL } from '@/constants/modal.constants';

interface DeleteFeedModalProps {
  onDelete: () => void;
}

const DeleteFeedModal = ({ onDelete }: DeleteFeedModalProps) => {
  return (
    <Popup
      id={DELETE_FEED_MODAL}
      title="일기 삭제"
      activeButtonComponent={
        <Button buttonColor="primary" size="medium" onClick={onDelete}>
          삭제
        </Button>
      }
    >
      <>
        <p>일기를 삭제하시겠습니까?</p>
        <p>삭제하신 후 되돌리실 수 없습니다.</p>
      </>
    </Popup>
  );
};

export default DeleteFeedModal;
