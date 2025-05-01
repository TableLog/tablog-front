'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { showToast } from '@/utils/functions';

import { BoxIcon } from '../icon/BoxIcon';
import { Text } from '../text/Text';

interface IImageList {
  id: string;
  src: string;
  input?: boolean;
}

const RecipeImageInput = () => {
  const imgRef = useRef<HTMLInputElement>(null);

  const [imageList, setImageList] = useState<IImageList[]>([]);

  const onChangeImageFile = () => {
    if (imgRef?.current?.files) {
      const files = Array.from(imgRef.current.files);

      // 유효한 이미지 확장자 체크 (jpg, jpeg, png)
      const validImageExtensions = ['image/jpeg', 'image/png', 'image/jpg'];

      files.forEach((file) => {
        if (!validImageExtensions.includes(file.type)) {
          showToast({ message: 'jpg, jpeg, png 파일만 업로드 가능합니다.', type: 'error' });

          return; // 유효하지 않은 파일이면 더 이상 진행하지 않음
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          if (reader.result) {
            setImageList((prev) => {
              if (prev.length >= 3) {
                showToast({
                  message: '이미지는 최대 3개까지 업로드하실 수 있습니다.',
                  type: 'error',
                });

                return prev;
              } // 최대 3개까지 제한

              return [
                ...prev,
                { id: `${reader.result as string}${Math.random()}`, src: reader.result as string },
              ];
            });
          }
        };
      });
    }
  };

  const onClickRemoveImageFile = (id: string) => {
    setImageList((prev) => prev.filter((el) => el.id !== id));
  };

  // 실제 렌더링될 이미지 목록에 업로드 input 포함 조건 처리
  const renderImageList =
    imageList.length < 3 ? [...imageList, { id: '-1', src: '', input: true }] : imageList;

  return (
    <div>
      <div>
        <Swiper
          className="border-grey07 aspect-square overflow-hidden rounded-[10px] border"
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
          }}
        >
          {renderImageList.map((image) => (
            <SwiperSlide key={image.id}>
              <div id={image.id} className="image-figure aspect-square w-full">
                {image.input ? (
                  <div>
                    <label className="block aspect-square cursor-pointer">
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/jpg"
                        className="hidden"
                        onChange={onChangeImageFile}
                        ref={imgRef}
                        multiple
                      />
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center text-sm text-gray-500">
                        <BoxIcon name="image-add" size={32} color="grey01" />

                        <div className="flex flex-col">
                          <Text>이미지 업로드</Text>

                          <Text>(최대 3장)</Text>
                        </div>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div>
                    <button
                      className="bg-white01 absolute top-3 right-3 z-10 rounded-full px-4 py-1 font-medium"
                      onClick={() => onClickRemoveImageFile(image.id)}
                    >
                      <Text fontSize={14}>삭제</Text>
                    </button>

                    <Image
                      src={image.src}
                      className="image-cover w-full"
                      alt={`sample${image.id}`}
                      width={375}
                      height={375}
                    />
                  </div>
                )}
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
    </div>
  );
};

export default RecipeImageInput;
