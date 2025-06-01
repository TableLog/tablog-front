'use client';

import React, { useEffect, useRef, useState } from 'react';

import { BoxIcon } from '@/components/atoms/icon/BoxIcon';
import { cn } from '@/utils/cn';

const ChatInput = () => {
  const [chatValue, setChatValue] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialHeight = useRef<number>(typeof window !== 'undefined' ? window.innerHeight : 0);

  useEffect(() => {
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDiff = initialHeight.current - currentHeight;

      if (heightDiff > 100) {
        setIsKeyboardOpen(true);
        document.body.style.overflow = 'hidden';
      } else {
        setIsKeyboardOpen(false);
        document.body.style.overflow = '';
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, []);

  const positionClass = isKeyboardOpen ? 'fixed bottom-0' : 'sticky bottom-0';
  const paddingClass = isKeyboardOpen ? 'env(safe-area-inset-bottom)' : '0px';

  return (
    <div className={cn(positionClass, paddingClass, 'bg-white01 z-50 transition-all')}>
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          className="border-grey07 flex-1 rounded-full border px-4 py-2"
          placeholder="댓글 입력..."
          value={chatValue}
          onChange={(e) => {
            setChatValue(e.target.value);
          }}
        />

        <BoxIcon name="navigation" size={24} />
      </div>
    </div>
  );
};

export default ChatInput;
