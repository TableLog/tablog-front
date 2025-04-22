// components/BottomSheet.tsx
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer';

import Backdrop from '@/components/atoms/backdrop/Backdrop';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  showHandlebar?: boolean;
  showBackdrop?: boolean;
  children: React.ReactNode;
}

export default function BottomSheet({
  isOpen,
  onClose,
  showHandlebar = true,
  showBackdrop = true,
  children,
}: BottomSheetProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    return () => {
      setIsClosing(false);
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setIsClosing(true);
  };

  return isOpen
    ? createPortal(
        <AnimatePresence>
          <div
            className={clsx(
              'fixed z-50 flex items-end justify-center',
              showBackdrop ? 'inset-0' : 'top-[60px] right-0 bottom-0 left-0',
            )}
            onClick={showBackdrop ? handleBackdropClick : undefined}
          >
            {/* Backdrop */}
            {showBackdrop && <Backdrop onClick={handleBackdropClick} />}

            {/* Bottom Sheet */}
            <motion.div
              className={clsx(
                'bg-white01 pointer-events-auto relative w-full rounded-tl-[20px] rounded-tr-[20px] shadow-lg',
                showBackdrop ? 'h-1/2' : 'h-full',
              )}
              initial={{ y: '100%' }}
              animate={{ y: isClosing ? '100%' : 0 }}
              exit={{ y: '100%' }}
              transition={
                showHandlebar ? { type: 'spring', stiffness: 300, damping: 30 } : { duration: 0 }
              }
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(e, info) => {
                if (info.point.y > 100) {
                  setIsClosing(true);
                }
              }}
              onAnimationComplete={() => {
                if (isClosing) onClose();
              }}
            >
              {showHandlebar && (
                <div className="flex justify-center py-2">
                  <div className={clsx('bg-grey01 h-1.5 w-12 rounded-full')} />
                </div>
              )}
              {children}
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body,
      )
    : null;
}
