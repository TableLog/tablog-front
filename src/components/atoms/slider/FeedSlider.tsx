import React from 'react';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface IFeedSliderProps {
  imageList: Array<string>;
}
const FeedSlider = ({ imageList }: IFeedSliderProps) => {
  return (
    imageList && (
      <div className="min-h-64">
        <Swiper
          className="border-grey08 aspect-[3/2] w-full overflow-hidden rounded-[10px] border"
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: '.feed-pagination',
          }}
        >
          {imageList.map((image) => {
            return (
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
            );
          })}
        </Swiper>

        {/* 커스텀 페이지네이션 */}
        <div className="feed-pagination mt-2 flex justify-center gap-1.5"></div>

        <style jsx global>{`
          .feed-pagination .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background-color: #acacac;
            border-radius: 200px;
            opacity: 1;
            transition: width 0.3s;
            margin: 0 !important;
          }

          .feed-pagination .swiper-pagination-bullet-active {
            width: 24px;
            background-color: #0e0e0e;
          }
        `}</style>
      </div>
    )
  );
};

export default FeedSlider;
