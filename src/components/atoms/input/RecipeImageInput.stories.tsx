import { useState } from 'react';
import type { Meta } from '@storybook/react';

import { IImageList } from '@/app/(services)/feed/add-log/@form/log-form';

import RecipeImageInput from './RecipeImageInput';

const meta = {
  title: 'Atoms/RecipeImageInput',
  component: RecipeImageInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: () => <RecipeImageInputWithState />,
} satisfies Meta<typeof RecipeImageInput>;

export default meta;

export const RecipeImageInputWithState = () => {
  const [imageList, setImageList] = useState<IImageList[]>([]);
  const [imageRequired, setImageRequired] = useState(false);

  return (
    <div className="h-100 w-100">
      <RecipeImageInput
        half
        imageList={imageList}
        setImageList={setImageList}
        error={imageRequired}
      />

      <button onClick={() => setImageRequired((prev) => !prev)}>에러 토글</button>
    </div>
  );
};
