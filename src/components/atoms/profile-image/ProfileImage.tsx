import React from 'react';
import Image from 'next/image';

interface IProfileImageProps {
  src: string;
  size: number;
}
const ProfileImage = ({ src, size }: IProfileImageProps) => {
  return (
    <figure
      className="image-figure aspect-square rounded-full"
      style={{ width: size, height: size }}
    >
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
