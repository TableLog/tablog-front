import { BoxIcon } from '../icon/BoxIcon';

interface RatingProps {
  rating: number;
}

function Rating({ rating }: RatingProps) {
  return (
    <div>
      {[...new Array(rating)].map((_, idx) => (
        <BoxIcon key={`rating-y-${idx}`} name="star" type="solid" color="yellow01" />
      ))}
      {[...new Array(5 - rating)].map((_, idx) => (
        <BoxIcon key={`rating-g-${idx}`} name="star" type="solid" color="grey08" />
      ))}
    </div>
  );
}

export default Rating;
