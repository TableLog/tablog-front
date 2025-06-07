'use client';

import React, { ChangeEvent, ComponentProps, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IImageList } from '@/app/(services)/feed/add-log/@form/log-form';
import { cn } from '@/utils/cn';
import { showToast } from '@/utils/functions';

import { BoxIcon } from '../icon/BoxIcon';
import { Text } from '../text/Text';

interface IRecipeImageInputProps extends ComponentProps<'input'> {
  className?: string;
  half?: boolean;
  imageList: IImageList[];
  setImageList: Dispatch<SetStateAction<IImageList[]>>;
  error?: boolean;
  maxImage?: number;
  label?: string;
}
const RecipeImageInput = ({
  className,
  half,
  imageList,
  setImageList,
  maxImage = 3,
  error,
  label = '이미지 업로드',
  ...props
}: IRecipeImageInputProps) => {
  const onChangeImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    // 유효한 이미지 확장자 체크 (jpg, jpeg, png)
    const validImageExtensions = ['image/jpeg', 'image/png', 'image/jpg'];

    files.forEach((file) => {
      if (!validImageExtensions.includes(file.type)) {
        showToast({ message: 'jpg, jpeg, png 파일만 업로드 가능합니다.', type: 'error' });
        return; // 유효하지 않은 파일이면 더 이상 진행하지 않음
      }

      if (imageList.length === maxImage) {
        showToast({
          message: `이미지는 최대 ${maxImage}개까지 업로드하실 수 있습니다.`,
          type: 'error',
        });
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        if (reader.result) {
          setImageList((prev) => {
            return [
              ...prev,
              {
                id: `${reader.result as string}${Math.random()}`,
                src: reader.result as string,
                file,
              },
            ];
          });
        }
      };
    });
  };

  const onClickRemoveImageFile = (id: string) => {
    setImageList((prev) => prev.filter((el) => el.id !== id));
  };

  // 실제 렌더링될 이미지 목록에 업로드 input 포함 조건 처리
  const renderImageList =
    imageList.length < maxImage ? [...imageList, { id: '-1', src: '', input: true }] : imageList;

  const aspectClass = half ? 'aspect-[3/2]' : 'aspect-square';
  const borderClass = error ? 'border-red01' : 'border-grey07';

  return (
    <div className={cn('min-h-64', className)}>
      <Swiper
        className={cn(aspectClass, borderClass, 'overflow-hidden rounded-[10px] border')}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
        }}
      >
        {renderImageList.map((image) => (
          <SwiperSlide key={image.id}>
            <div id={image.id} className={cn(aspectClass, 'image-figure w-full')}>
              {image.input ? (
                <div>
                  <label className={cn(aspectClass, 'block cursor-pointer')}>
                    <input
                      {...props}
                      type="file"
                      accept="image/jpeg, image/png, image/jpg"
                      className="hidden"
                      onChange={(e) => {
                        onChangeImageFile(e);
                        props.onChange?.(e);
                      }}
                      multiple
                    />
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center text-sm text-gray-500">
                      <BoxIcon name="image-add" size={32} color="grey01" />

                      <div className="flex flex-col">
                        <Text>{label}</Text>

                        <Text>(최대 {maxImage}장)</Text>
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

      {error && (
        <div className="validator-hint mt-1 whitespace-pre-line">
          <Text color="red01">이미지를 업로드해주세요.</Text>
        </div>
      )}

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

export default RecipeImageInput;
