import { useRef } from 'react';
import Image from 'next/image';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { Text } from '@/components/atoms/text/Text';
import { showToast } from '@/utils/functions';

interface IProfileImage {
  imageSrc: string;
  setImageSrc: React.Dispatch<React.SetStateAction<string>>;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function ProfileImageInput({ imageSrc, setImageSrc, setImageFile }: IProfileImage) {
  const imgRef = useRef<HTMLInputElement>(null);

  const onChangeImageFile = () => {
    const file = imgRef?.current?.files?.[0] || null; // 첫 번째 파일만 사용

    setImageFile(file);

    if (!file) return;

    const validImageExtensions = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!validImageExtensions.includes(file.type)) {
      showToast({
        message: 'jpg, jpeg, png 파일만 업로드 가능합니다.',
        type: 'error',
      });
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageSrc(reader.result as string);
    };
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="inline">
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          className="hidden"
          onChange={onChangeImageFile}
          ref={imgRef}
        />

        <div className="image-figure bg-grey06 h-[100px] w-[100px] rounded-full">
          <div className="absolute flex h-full w-full items-center justify-center">
            <BoxIcon name="image" color="white01" size={30} class="absolute z-20" />

            {imageSrc && (
              <Image
                priority
                src={imageSrc}
                className="image-cover z-10 w-full brightness-70"
                alt={imageSrc}
                width={100}
                height={100}
                unoptimized
              />
            )}
          </div>
        </div>
      </label>

      <div className="min-h-6">
        {imageSrc && (
          <Text
            fontSize={14}
            color="red01"
            className="text-center"
            onClick={() => {
              setImageSrc('');
              setImageFile(null);
            }}
          >
            이미지 삭제
          </Text>
        )}
      </div>
    </div>
  );
}
