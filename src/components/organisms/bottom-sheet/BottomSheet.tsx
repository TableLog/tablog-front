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
  initialHeight?: 'half' | 'header';
  children: React.ReactNode;
}

export default function BottomSheet({
  isOpen,
  onClose,
  showHandlebar = true,
  showBackdrop = true,
  initialHeight = 'half',
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
          <motion.div
            className={clsx('fixed inset-0 z-50 flex items-end justify-center')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={showBackdrop ? handleBackdropClick : undefined}
          >
            {/* Backdrop */}
            {showBackdrop && <Backdrop onClick={handleBackdropClick} />}

            {/* Bottom Sheet */}
            <motion.div
              className={clsx(
                'bg-white01 relative w-full rounded-t-2xl shadow-lg',
                '',
                initialHeight === 'half' ? 'h-1/3' : 'h-2/3',
              )}
              initial={{ y: '100%' }}
              animate={{ y: isClosing ? '100%' : 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag={showHandlebar ? 'y' : false}
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
              {/* Handlebar */}
              {showHandlebar && (
                <div className="flex justify-center py-2">
                  <div className="bg-grey01 h-1.5 w-12 rounded-full" />
                </div>
              )}
              {children}
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body,
      )
    : null;
}
