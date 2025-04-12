import { useState } from 'react';
import type { Meta } from '@storybook/react';

import { Checkboxes } from './Checkbox';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkboxes,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => <CheckboxesWithState {...args} />,
} satisfies Meta<typeof Checkboxes>;

export default meta;

interface ICheckboxesPros {
  label: string;
  name: string;
  content: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}
export const CheckboxesWithState = (props: ICheckboxesPros) => {
  const [checkValue, setCheckValue] = useState(false);

  return (
    <div className="w-[420px]">
      <Checkboxes
        {...props}
        name="useterm"
        label="서비스 이용약관"
        value={checkValue}
        content={`공무원의 직무상 불법행위로 손해를 받은 국민은 법률이 정하는 바에 의하여 국가 또는
        공공단체에 정당한 배상을 청구할 수 있다. 이 경우 공무원 자신의 책임은 면제되지 아니한다.
        사법권은 법관으로 구성된 법원에 속한다. 한 회계연도를 넘어 계속하여 지출할 필요가 있을
        때에는 정부는 연한을 정하여 계속비로서 국회의 의결을 얻어야 한다. 공무원의 직무상
        불법행위로 손해를 받은 국민은 법률이 정하는 바에 의하여 국가 또는 공공단체에 정당한
        배상을 청구할 수 있다. 이 경우 공무원 자신의 책임은 면제되지 아니한다. 사법권은 법관으로
        구성된 법원에 속한다. 한 회계연도를 넘어 계속하여 지출할 필요가 있을 때에는 정부는
        연한을 정하여 계속비로서 국회의 의결을 얻어야 한다.`}
        onChange={(e) => setCheckValue(e.target.checked)}
      />
    </div>
  );
};
