import Icon from '@/components/atoms/icon/Icon';

interface BookmarkProps {
  isMarked: boolean;
}
const Bookmark = ({ isMarked }: BookmarkProps) => {
  return (
    <div className="absolute top-[20px] right-[24px]">
      {isMarked && <Icon iconName="bx bxs-bookmark" />}
      {!isMarked && <Icon iconName="bx bx-bookmark" />}
    </div>
  );
};
export default Bookmark;
