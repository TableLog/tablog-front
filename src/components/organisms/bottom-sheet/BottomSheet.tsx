// components/BottomSheet.tsx
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer';

import Backdrop from '@/components/atoms/backdrop/Backdrop';
import { Text } from '@/components/atoms/text/Text';
import { cn } from '@/utils/cn';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  showHandlebar?: boolean;
  showBackdrop?: boolean;
  children: React.ReactNode;
  title?: string;
  buttons?: React.ReactNode;
  sheetClassName?: string;
}

export default function BottomSheet({
  isOpen,
  onClose,
  showHandlebar = true,
  showBackdrop = true,
  children,
  title,
  buttons,
  sheetClassName,
}: BottomSheetProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="bottom-sheet"
          className={clsx(
            'fixed z-[10000] flex items-end justify-center',
            showBackdrop ? 'inset-0' : 'bottom-0 left-0 right-0 top-[60px]',
          )}
        >
          {/* Backdrop */}
          {showBackdrop && <Backdrop onClick={onClose} />}

          {/* Bottom Sheet */}
          <motion.div
            className={clsx(
              'pointer-events-auto relative flex h-fit max-h-[calc(100%-60px)] w-full flex-col justify-between rounded-tl-[20px] rounded-tr-[20px] bg-white01 pb-6 shadow-lg duration-300',
              showBackdrop ? 'min-h-1/2 max-h-[80%]' : 'min-h-full',
            )}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.1, ease: 'linear' }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose();
            }}
          >
            <div>
              {showHandlebar && (
                <div className="flex justify-center pb-3 pt-4">
                  <div className={clsx('h-1.5 w-[150px] rounded-full bg-grey07')} />
                </div>
              )}

              {title && (
                <Text fontSize={20} fontWeight="semiBold" className="text-center">
                  {title}
                </Text>
              )}
            </div>

            <div className={cn('overflow-y-auto pb-5 pt-9', sheetClassName)}>{children}</div>

            {buttons && <div className="mt-5 px-5">{buttons}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
