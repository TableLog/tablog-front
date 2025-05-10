// components/BottomSheet.tsx
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer';

import Backdrop from '@/components/atoms/backdrop/Backdrop';
import { Text } from '@/components/atoms/text/Text';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  showHandlebar?: boolean;
  showBackdrop?: boolean;
  children: React.ReactNode;
  title?: string;
  buttons?: React.ReactNode;
}

export default function BottomSheet({
  isOpen,
  onClose,
  showHandlebar = true,
  showBackdrop = true,
  children,
  title,
  buttons,
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
                'bg-white01 pointer-events-auto relative flex h-fit w-full flex-col justify-between rounded-tl-[20px] rounded-tr-[20px] pb-6 shadow-lg',
                showBackdrop ? 'max-h-[80%] min-h-1/2' : 'min-h-full',
              )}
              initial={{ y: '100%' }}
              animate={{ y: isClosing ? '100%' : 0 }}
              exit={{ y: '100%' }}
              transition={
                showHandlebar ? { type: 'spring', stiffness: 300, damping: 30 } : { duration: 0 }
              }
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              // TODO: 내부의 컨텐츠에 스크롤할 일이 있으면 닫힘
              // onDragEnd={(e, info) => {
              //   if (info.point.y > 100) {
              //     setIsClosing(true);
              //   }
              // }}
              onAnimationComplete={() => {
                if (isClosing) onClose();
              }}
            >
              <div>
                {showHandlebar && (
                  <div className="flex justify-center pt-4 pb-3">
                    <div className={clsx('bg-grey07 h-1.5 w-[150px] rounded-full')} />
                  </div>
                )}

                {title && (
                  <Text fontSize={20} fontWeight="semiBold" className="text-center">
                    {title}
                  </Text>
                )}
              </div>

              <div className="flex-1 overflow-y-auto pt-9 pb-5">{children}</div>

              {buttons && <div className="mt-5 px-5">{buttons}</div>}
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body,
      )
    : null;
}
