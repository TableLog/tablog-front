import React, { useState } from 'react';

import { Text } from '@/components/atoms/text/Text';
import { cn } from '@/utils/cn';

const StarRate = () => {
  // 상태 변수로 선택된 별점 값을 저장
  const [rating, setRating] = useState<number>(0);

  // 별점을 선택했을 때 호출되는 함수
  const onChangeRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 선택된 별점 값을 업데이트
    setRating(Number(event.target.value));
  };

  const startList = [
    { id: 1, value: '0', hidden: true },
    { id: 2, value: '0.5', left: true },
    { id: 3, value: '1', left: false },
    { id: 4, value: '1.5', left: true },
    { id: 5, value: '2', left: false },
    { id: 6, value: '2.5', left: true },
    { id: 7, value: '3', left: false },
    { id: 8, value: '3.5', left: true },
    { id: 9, value: '4', left: false },
    { id: 10, value: '4.5', left: true },
    { id: 11, value: '5', left: false },
  ];

  return (
    <div className="flex items-center gap-4">
      <div className="rating rating-lg rating-half">
        {startList.map((star) => {
          const hiddenClass = star.hidden ? 'rating-hidden' : 'mask mask-star-2 bg-yellow01';
          const halfClass = star.left ? 'mask-half-1' : 'mask-half-2';

          return (
            <input
              key={star.id}
              type="radio"
              name="rating"
              className={cn(hiddenClass, star.hidden ? '' : halfClass)}
              value={star.value}
              aria-label={`${star.value} star`}
              onChange={onChangeRating}
            />
          );
        })}
      </div>

      <div className="min-w-[40px]">
        <Text>{rating}점</Text>
      </div>
    </div>
  );
};

export default StarRate;
