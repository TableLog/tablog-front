import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/atoms/button/Button';
import { HandleOpenModal } from '@/utils/functions';

import Popup from './Popup';

const meta: Meta<typeof Popup> = {
  title: 'molecules/Popup',
  component: Popup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <div className="max-w-[420px]">
      <Button onClick={() => HandleOpenModal('my_modal_2')}>open modal</Button>

      <Popup {...args}>
        <>
          <p>입력하신 휴대폰 번호로 가입된 계정이 없습니다.</p>

          <p>정보를 다시 확인 후 입력해주세요.</p>
        </>
      </Popup>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof Popup>;

export const Body01: Story = {
  args: {
    children: (
      <>
        <p>입력하신 휴대폰 번호로 가입된 계정이 없습니다.</p>

        <p>정보를 다시 확인 후 입력해주세요.</p>
      </>
    ),
    title: '가입된 계정이 없습니다',
    closeButtonComponent: (
      <Button buttonColor="grey06" size="medium">
        닫기
      </Button>
    ),
    activeButtonComponent: (
      <Button buttonColor="primary" size="medium">
        로그인
      </Button>
    ),
  },
};
