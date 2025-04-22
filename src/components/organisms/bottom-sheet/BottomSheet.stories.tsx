import { useState } from 'react';
import { Meta } from '@storybook/react';

import BottomSheet from './BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'organisms/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)}>Open BottomSheet</button>
        <BottomSheet {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="text-center">Hello from BottomSheet 👋</div>
          <div></div>
        </BottomSheet>
      </div>
    );
  },
};

export default meta;

export const Default = {
  args: {},
};

export const NoneBackdrop = {
  args: {
    showBackdrop: false,
  },
};

export const NoneHandleBar = {
  args: {
    showHandlebar: false,
  },
};

export const initialHeight = {
  args: {
    initialHeight: 'header',
  },
};
