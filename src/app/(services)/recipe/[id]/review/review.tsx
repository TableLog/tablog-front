import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { Text } from '@/components/atoms/text/Text';
import { IReview } from '@/types/api';
import { convertDateFormat } from '@/utils/functions';

interface ReviewProps {
  review: IReview;
}

const Review = ({ review }: ReviewProps) => {
  // ! 작성자일 때
  // if (review.isMine) return <div></div>;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <BoxIcon name="star" type="solid" />
          <span>{review.star.toFixed(1)}</span>
        </div>
        <Text fontSize={14} color="grey04">
          {convertDateFormat(review.modifiedAt)}
        </Text>
      </div>
      <div className="line-clamp-3">{review.content}</div>
    </div>
  );
};

export default Review;
