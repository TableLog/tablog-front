import React, { useRef, useState } from 'react';

import { cn } from '@/utils/cn';
import { useClickOutsideClose } from '@/utils/functions';

import { BoxIcon } from '../icon/BoxIcon';
import { Text } from '../text/Text';

interface ITooltip {
  children: React.ReactNode;
}
const Tooltip = ({ children }: ITooltip) => {
  const tooltipRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const onClickOpenTooltip = () => {
    setIsOpen((prev) => !prev);
  };

  const onClickCloseTooltip = () => {
    setIsOpen(false);
  };

  useClickOutsideClose(tooltipRef, onClickCloseTooltip);

  const opacityClass = isOpen ? 'opacity-100' : 'opacity-0';

  return (
    <div className="relative z-40 w-full max-w-[200px]" ref={tooltipRef}>
      <div className="flex h-6 w-full items-center" onClick={onClickOpenTooltip}>
        <BoxIcon name="info-circle" size={18} />
      </div>

      <div
        className={cn(
          opacityClass,
          'pointer-events-none absolute left-0 top-6 rounded-[10px] bg-grey08 p-2.5 transition-all duration-150',
        )}
      >
        <Text fontSize={12}>{children}</Text>
      </div>
    </div>
  );
};

export default Tooltip;
