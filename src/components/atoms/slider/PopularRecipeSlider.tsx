import React, { useCallback, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IRecipe } from '@/types/api';
import { ECookTime, EPrice } from '@/types/enum';

import { BoxIcon } from '../icon/BoxIcon';

interface IPopularRecipeSliderProps {
  list?: Array<IRecipe>;
}

const PopularRecipeSlider = ({ list }: IPopularRecipeSliderProps) => {
  const paginationRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const handleClickRecipe = useCallback(
    (recipeId: number) => {
      router.push(`/recipe/${recipeId}`);
    },
    [router],
  );

  return (
    list && (
      <div className="relative">
        {/* 커스텀 페이지네이션 */}
        <div
          ref={paginationRef}
          className="custom-pagination-popular absolute top-[20px] right-[20px] z-20 mt-2 flex justify-center gap-1.5"
        ></div>

        <Swiper
          slidesPerView={1}
          modules={[Pagination]}
          onSwiper={(swiper) => {
            if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
              swiper.params.pagination.el = paginationRef.current;
              swiper.params.pagination.clickable = true;
              swiper.pagination.init();
              swiper.pagination.update();
            }
          }}
        >
          {list?.map((item, idx) => {
            return (
              <SwiperSlide
                key={item.id}
                className="relative aspect-2/3 w-full overflow-hidden"
                onClick={() => handleClickRecipe(item.id)}
              >
                <div>
                  <div className="bg-black01/45 text-white01 absolute inset-0 z-10 flex h-full w-full flex-col justify-between px-5 py-10">
                    <div>
                      <header className="font-gyeonggi-batang text-2xl">{item.title}</header>

                      <div className="font-extraLight mt-5 line-clamp-2">{item.intro}</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        {EPrice[item.price]}원 | {ECookTime[item.cookingTime]} | {item.totalCal}kcal
                      </div>

                      <div className="mt-5 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <BoxIcon name="star" type="solid" size={16} color="primary01" />

                          <span>{item.star}</span>

                          <span>({item.reviewCount})</span>
                        </div>

                        <div>by {item.user}</div>
                      </div>
                    </div>
                  </div>

                  <Image
                    src={item.imageUrl || `/images/dummy-recipe-image${idx + 1}.jpg`}
                    alt={item.title}
                    className="image-cover w-full"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <style jsx>{`
          .custom-pagination-popular .swiper-pagination-bullet {
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 200px;
            opacity: 1;
            transition: width 0.3s;
            margin: 0 !important;
          }

          .custom-pagination-popular .swiper-pagination-bullet-active {
            width: 16px;
            background-color: #fff;
          }
        `}</style>
      </div>
    )
  );
};

export default PopularRecipeSlider;
