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
      <Image
        src={src || '/images/tablog-512x512.png'}
        alt={src || 'no-image'}
        width={size}
        height={size}
        className="image-cover"
        priority
      />
    </figure>
  );
};

export default ProfileImage;
