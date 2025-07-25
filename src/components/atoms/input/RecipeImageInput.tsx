'use client';

import { ChangeEvent, ComponentProps, useEffect, useState } from 'react';
import { Control, FieldValues, Path, PathValue, useController } from 'react-hook-form';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { cn } from '@/utils/cn';
import { showToast } from '@/utils/functions';

import { BoxIcon } from '../icon/BoxIcon';
import { Text } from '../text/Text';

interface IRecipeImageInputProps<T extends FieldValues> extends ComponentProps<'input'> {
  className?: string;
  half?: boolean;
  error?: boolean;
  maxImage?: number;
  label?: string;
  name: Path<T>;
  control: Control<T>;
  defaultImages?: IImageList['src'][];
}

interface IImageList {
  id: string;
  src: string;
  file?: File;
  input?: boolean;
}

const RecipeImageInput = <T extends FieldValues>({
  className,
  half,
  maxImage = 3,
  error,
  label = '이미지 업로드',
  name,
  control,
  defaultImages,
  ...props
}: IRecipeImageInputProps<T>) => {
  const [imageList, setImageList] = useState<IImageList[]>([]);

  useEffect(() => {
    setImageList(defaultImages?.map((src) => ({ id: `${Math.random()}`, src })) ?? []);
  }, [defaultImages]);

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: [] as PathValue<T, Path<T>>,
  });

  const onChangeImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    // 유효한 이미지 확장자 체크 (jpg, jpeg, png)
    const validImageExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
    for (const file of files) {
      if (!validImageExtensions.includes(file.type)) {
        showToast({ message: 'jpg, jpeg, png 파일만 업로드 가능합니다.', type: 'error' });
        return; // 유효하지 않은 파일이면 더 이상 진행하지 않음
      }

      if (files.length > maxImage) {
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
          setImageList((prev) => [
            ...prev,
            {
              id: `${reader.result}${Math.random()}`,
              src: reader.result as string,
              file,
            },
          ]);
          onChange([...value, file]);
        }
      };
    }
  };

  const onClickRemoveImageFile = (id: string) => {
    const newImage = imageList.filter((image) => image.id !== id);
    setImageList(newImage);
    onChange(newImage.map((image) => image.file ?? image.src));
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
                    className="absolute right-3 top-3 z-10 rounded-full bg-white01 px-4 py-1 font-medium"
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
