import { useState } from 'react';
import { Meta } from '@storybook/react';

import BottomSheet from './BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'organisms/BottomSheet',
  component: BottomSheet,
  // 👇 render에서 부모 상태를 직접 제어
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)}>Open BottomSheet</button>

        <BottomSheet {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="text-center">Hello from BottomSheet 👋</div>
        </BottomSheet>
      </div>
    );
  },
};

export default meta;

export const Default = {
  args: {
    hasBackdrop: true,
  },
};
