import { useState } from 'react';
import type { Meta } from '@storybook/react';

import ProfileImage from './ProfileImage';

const meta = {
  title: 'molecules/ProfileImage',
  component: ProfileImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => <ProfileImage {...args} />,
} satisfies Meta<typeof ProfileImage>;

export default meta;

export const ProfileImageExample = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  console.log(imageFile);

  return (
    <div className="flex items-center justify-center">
      <ProfileImage imageSrc={imageSrc} setImageSrc={setImageSrc} setImageFile={setImageFile} />
    </div>
  );
};
