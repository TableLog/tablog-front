import { ComponentProps, useRef } from 'react';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { cn } from '@/utils/cn';

interface CarouselProps extends ComponentProps<'div'> {
  imageList: { src: string; alt: string }[];
  half?: boolean;
}

const Carousel = ({ className, imageList, half = false }: CarouselProps) => {
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const aspectClass = half ? 'aspect-[3/2]' : 'aspect-square';

  return (
    <div className={cn(aspectClass, className, 'flex flex-col-reverse')}>
      <div ref={paginationRef} className="custom-pagination mt-2 flex justify-center gap-1.5"></div>

      <Swiper
        className={cn(aspectClass, 'w-full overflow-hidden rounded-[10px] border')}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: paginationRef.current,
        }}
        onSwiper={(swiper) => {
          if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
            swiper.params.pagination.el = paginationRef.current;
            swiper.pagination.init();
            swiper.pagination.render();
            swiper.pagination.update();
          }
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
    </div>
  );
};

export default Carousel;
