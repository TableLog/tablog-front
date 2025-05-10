// TextInput.stories.tsx

import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import { TERMS_OPTIONS } from '@/constants/options.constants';

import CheckAll from './CheckAll';

export default {
  title: 'Atoms/CheckAll',
  component: CheckAll,
} as Meta;

export const CheckAllExample = () => {
  const [values, setValues] = useState<Record<string, boolean>>();

  return (
    <div>
      <CheckAll options={TERMS_OPTIONS} values={values} setValues={setValues} />
    </div>
  );
};
