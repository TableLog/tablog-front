import React from 'react';

import { BoxIcon } from '../icon/BoxIcon';
import { Text } from '../text/Text';

interface IMoreOptionsProps {
  options: Array<{ id: number; title: string; alert?: boolean }>;
}

const MoreOptions = ({ options }: IMoreOptionsProps) => {
  return (
    <div>
      <div className="dropdown dropdown-end">
        <button tabIndex={0}>
          <BoxIcon name="dots-vertical-rounded" size={24} />
        </button>

        <ul tabIndex={0} className="dropdown-content bg-base-100 menu rounded-box z-1 shadow-sm">
          {options.map((option) => {
            return (
              <li key={option.id}>
                <Text color={option.alert ? 'red01' : 'black01'}>{option.title}</Text>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MoreOptions;
