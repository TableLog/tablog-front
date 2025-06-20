import { showToast } from '@/utils/functions';

import { BoxIcon } from '../icon/BoxIcon';

interface ShareButtonProps {
  shareInfo: {
    title?: string;
    text?: string;
    url: string;
  };
}
const ShareButton = ({ shareInfo }: ShareButtonProps) => {
  async function handleShareButtonClick() {
    try {
      await navigator.share(shareInfo);
    } catch (e) {
      showToast({ message: '공유에 실패했습니다.', type: 'error' });
      console.error(e);
    }
  }

  return (
    <button className="flex items-center" onClick={handleShareButtonClick}>
      <BoxIcon name="bxr bx-send" size={24} />
    </button>
  );
};

export default ShareButton;
