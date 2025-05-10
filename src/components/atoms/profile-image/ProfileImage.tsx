import React from 'react';
import Image from 'next/image';

import { cn } from '@/utils/cn';

interface IProfileImageProps {
  src: string;
  size: number;
}
const ProfileImage = ({ src, size }: IProfileImageProps) => {
  const widthClass = `w-[${size}px]`;

  return (
    <figure className={cn(widthClass, 'image-figure aspect-square w-[50px] rounded-full')}>
      <Image src={src} alt={src} width={size} height={size} className="image-cover" />
    </figure>
  );
};

export default ProfileImage;
