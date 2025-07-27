import { MouseEvent } from 'react';

import { BoxIcon } from '../icon/BoxIcon';
import { Text } from '../text/Text';

interface IMoreOptionsProps {
  options: Array<{ id: number; title: string; alert?: boolean }>;
  buttonEvent: (type: string, e: MouseEvent<HTMLButtonElement>) => void;
  iconColor?: string;
}

const MoreOptions = ({ options, buttonEvent, iconColor }: IMoreOptionsProps) => {
  return (
    <div>
      <div
        className="dropdown dropdown-end"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <button tabIndex={0}>
          <BoxIcon name="dots-vertical-rounded" size={24} color={iconColor} />
        </button>

        <ul tabIndex={0} className="z-1 menu dropdown-content rounded-box bg-base-100 shadow-sm">
          {options.map((option) => {
            return (
              <li key={option.id}>
                <button
                  onClick={(e) => {
                    buttonEvent?.(option.title, e);
                  }}
                >
                  <Text
                    className="flex justify-center whitespace-nowrap"
                    color={option.alert ? 'red01' : 'black01'}
                  >
                    {option.title}
                  </Text>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MoreOptions;
