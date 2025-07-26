import React, { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { IRecipe } from '@/types/api';
import { ECookTime, EPrice } from '@/types/enum';

interface ILatestRecipeSliderProps {
  list?: Array<IRecipe>;
}

const LatestRecipeSlider = ({ list }: ILatestRecipeSliderProps) => {
  const router = useRouter();

  const handleClickRecipe = useCallback(
    (recipeId: number) => {
      router.push(`/recipe/${recipeId}`);
    },
    [router],
  );

  return (
    <div>
      <Swiper className="w-full" slidesPerView={'auto'} spaceBetween={12}>
        {list?.map((item, idx) => {
          return (
            <SwiperSlide
              key={item.id}
              className="relative aspect-square max-w-[280px] overflow-hidden rounded-[20px]"
              onClick={() => handleClickRecipe(item.id)}
            >
              <Image
                src={item.imageUrl || `/images/dummy-recipe-image${idx + 1}.jpg`}
                alt={item.title}
                className="image-cover w-full"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />

              <div className="absolute bottom-[10px] left-[10px] right-[10px] rounded-[10px] bg-white01/90 p-4">
                <p className="line-clamp-2 min-h-[56px] text-lg font-medium">{item.title}</p>

                <div className="mt-1 flex items-center gap-1.5 text-sm">
                  {EPrice[item.price]}원 | {ECookTime[item.cookingTime]} | {item.totalCal}kcal
                </div>

                <div className="mt-1 flex items-center gap-1 text-xs">
                  <BoxIcon name="star" type="solid" size={16} color="primary01" />

                  <span>{item.star}</span>

                  <span>({item.reviewCount})</span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default LatestRecipeSlider;
