import { ComponentProps } from 'react';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { cn } from '@/utils/cn';

interface CarouselProps extends ComponentProps<'div'> {
  imageList: { src: string; alt: string }[];
  half?: boolean;
}

const Carousel = ({ className, imageList, half = false }: CarouselProps) => {
  const aspectClass = half ? 'aspect-[3/2]' : 'aspect-square';

  return (
    <div className={cn('min-h-64', aspectClass, className)}>
      <Swiper
        className={cn(aspectClass, 'overflow-hidden rounded-[10px] border')}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
        }}
      >
        {imageList.map((image) => (
          <SwiperSlide key={image.alt}>
            <div id={image.alt} className={cn(aspectClass, 'image-figure w-full')}>
              <div>
                <Image
                  src={image.src}
                  className="image-cover w-full"
                  alt={image.alt}
                  width={375}
                  height={375}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 커스텀 페이지네이션 */}
      <div className="custom-pagination mt-2 flex justify-center gap-1.5"></div>

      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background-color: #acacac;
          border-radius: 200px;
          opacity: 1;
          transition: width 0.3s;
          margin: 0 !important;
        }

        .custom-pagination .swiper-pagination-bullet-active {
          width: 24px;
          background-color: #0e0e0e;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
