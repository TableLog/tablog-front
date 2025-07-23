import React, { useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { Text } from '@/components/atoms/text/Text';
import { cn } from '@/utils/cn';

interface StarRateProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

const StarRate = <T extends FieldValues>({ control, name }: StarRateProps<T>) => {
  // 상태 변수로 선택된 별점 값을 저장
  const [rating, setRating] = useState<number>(5);

  const {
    field: { onChange },
  } = useController({
    name,
    control,
  });

  // 별점을 선택했을 때 호출되는 함수
  const onChangeRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 선택된 별점 값을 업데이트
    setRating(Number(event.target.value));
    onChange(Number(event.target.value));
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
      <div className="rating rating-half rating-lg">
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
