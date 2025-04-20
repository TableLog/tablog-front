import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  hasBackdrop?: boolean;
  hasHandleBar?: boolean;
};

export default function BottomSheet({
  isOpen,
  onClose,
  children,
  hasBackdrop = true,
  hasHandleBar,
}: Props) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          {hasBackdrop && (
            <motion.div
              className="bg-black01/40 fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
          )}

          {/* BottomSheet */}
          <motion.div
            className="bg-white01 fixed right-0 bottom-0 left-0 z-50 rounded-t-2xl p-4"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Handlebar */}
            {hasHandleBar && <div className="bg-grey01 mx-auto mb-4 h-1.5 w-12 rounded-full" />}

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
