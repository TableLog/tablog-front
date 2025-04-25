import { useRef, useState } from 'react';
import Image from 'next/image';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import Toast from '@/components/atoms/toast/Toast';

interface IProfileImage {
  imageSrc: string;
  setImageSrc: React.Dispatch<React.SetStateAction<string>>;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function ProfileImage({ imageSrc, setImageSrc, setImageFile }: IProfileImage) {
  const imgRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeImageFile = () => {
    const file = imgRef?.current?.files?.[0] || null; // 첫 번째 파일만 사용

    setImageFile(file);

    if (!file) return;

    const validImageExtensions = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!validImageExtensions.includes(file.type)) {
      setErrorMessage('jpg, jpeg, png 파일만 업로드 가능합니다.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageSrc(reader.result as string);
      // 여기서 File 객체도 넘겨야 하면 setImageFile(file) 같은 것도 같이 실행 가능
    };
  };

  return (
    <div>
      {errorMessage && (
        <Toast type="error" message={errorMessage} clearErrorMessage={() => setErrorMessage('')} />
      )}

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
                src={imageSrc}
                className="image-cover z-10 w-full brightness-70"
                alt={`sample${imageSrc}`}
                width={100}
                height={100}
              />
            )}
          </div>
        </div>
      </label>
    </div>
  );
}
