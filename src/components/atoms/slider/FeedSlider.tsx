import React, { useRef } from 'react';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface IFeedSliderProps {
  imageList: Array<string>;
}

const FeedSlider = ({ imageList }: IFeedSliderProps) => {
  const paginationRef = useRef<HTMLDivElement | null>(null);

  return (
    imageList && (
      <div className="min-h-64">
        <Swiper
          className="border-grey08 aspect-[3/2] w-full overflow-hidden rounded-[10px] border"
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: paginationRef.current!,
          }}
          onSwiper={(swiper) => {
            if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
              swiper.params.pagination.el = paginationRef.current;
              swiper.pagination.init();
              swiper.pagination.update();
            }
          }}
        >
          {imageList.map((image) => (
            <SwiperSlide key={image}>
              <div>
                <Image
                  src={image}
                  className="image-cover w-full"
                  alt={`sample${image}`}
                  width={375}
                  height={375}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 커스텀 페이지네이션 */}
        <div
          ref={paginationRef}
          className="custom-pagination mt-2 flex justify-center gap-1.5"
        ></div>
      </div>
    )
  );
};

export default FeedSlider;
