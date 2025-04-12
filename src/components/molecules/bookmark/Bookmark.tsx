import { BoxIcon } from '@/components/atoms/icon/BoxIcon';

interface BookmarkProps {
  isMarked: boolean;
}
const Bookmark = ({ isMarked }: BookmarkProps) => {
  return (
    <div className="absolute top-[20px] right-[24px]">
      {isMarked && <BoxIcon name="bx bxs-bookmark" />}
      {!isMarked && <BoxIcon name="bx bx-bookmark" />}
    </div>
  );
};
export default Bookmark;
