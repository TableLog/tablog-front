'use client';

import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/utils/cn';

interface IClampedTextsProps {
  children: React.ReactNode;
  maxHeight?: number;
  clamp?: number;
}
const ClampedTexts = ({ children, maxHeight = 40, clamp = 2 }: IClampedTextsProps) => {
  const contentRefs = useRef<HTMLDivElement>(null);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (contentRefs.current) {
      const height = contentRefs.current.scrollHeight;

      if (height > maxHeight) {
        setShowMoreButton(true);
      } else {
        setShowMoreButton(false);
      }
    }
  }, [contentRefs, maxHeight]);

  const clampClass = isExpanded ? '' : `line-clamp-${clamp}`;

  return (
    <div>
      <div className={cn(clampClass)} ref={contentRefs}>
        {children}
      </div>

      {showMoreButton && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-1 text-sm font-medium text-grey02"
        >
          {isExpanded ? '접기' : '더보기'}
        </button>
      )}
    </div>
  );
};

export default ClampedTexts;
