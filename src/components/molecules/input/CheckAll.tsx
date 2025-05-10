import React, { useEffect, useMemo, useState } from 'react';

import { Checkbox, Checkboxes } from '@/components/atoms/input/Checkbox';

interface ICheckAll {
  id: number;
  label: string;
  name: string;
  content: string;
}

interface ICheckAllProps {
  options: Array<ICheckAll>;
  values: Record<string, boolean> | undefined;
  setValues: React.Dispatch<React.SetStateAction<Record<string, boolean> | undefined>>;
}
const CheckAll = ({ values, setValues, options }: ICheckAllProps) => {
  const initialValue = useMemo(() => {
    return options.reduce(
      (acc, curr) => {
        acc[curr.name] = false; // 각 name을 키로 하고 false를 값으로 설정

        return acc;
      },
      {} as Record<string, boolean>,
    );
  }, [options]);

  useEffect(() => {
    if (!values) {
      setValues(initialValue);
    }
  }, [initialValue, setValues, values]);

  const [isCheckAll, setIsCheckAll] = useState(
    values && Object.values(values).every(Boolean) ? true : false,
  );

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckAll(e.target.checked);

    if (values) {
      const newValues = Object.keys(values).reduce(
        (acc, key) => {
          acc[key] = e.target.checked;
          return acc;
        },
        {} as Record<string, boolean>,
      );

      setValues(newValues);
    }
  };

  const onChangeCheckboxes = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const updatedValues = { ...values, [name]: e.target.checked };

    setValues(updatedValues);

    const allChecked = Object.values(updatedValues).every(Boolean);

    setIsCheckAll(allChecked);
  };

  return (
    <div>
      <Checkbox label="전체 동의합니다." value={isCheckAll} onChange={onChangeCheckbox} />

      <div className="bg-grey08 my-4.5 h-[1px] w-full"></div>

      <div className="flex flex-col gap-5">
        {options.map((item: ICheckAll) => {
          return (
            <Checkboxes
              key={item.id}
              name={item.name}
              label={item.label}
              value={values?.[item.name]}
              content={item.content}
              onChange={onChangeCheckboxes}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CheckAll;
