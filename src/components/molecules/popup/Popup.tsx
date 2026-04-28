import React, { forwardRef } from 'react';

import Button from '@/components/atoms/button/Button';

import { usePopupContext } from './PopupProvider';

export interface IPopupProps {
  title: string;
  closeButtonName?: string;
  activeButtonComponent: React.ReactElement;
  onClose?: () => void;
  children: React.ReactElement;
}

const Popup = forwardRef<HTMLDialogElement, IPopupProps>(
  ({ title, closeButtonName = '닫기', activeButtonComponent, onClose, children }, ref) => {
    const { closeModal } = usePopupContext();
    return (
      <dialog ref={ref} className="modal">
        {/* max-w-lg-40px */}
        <div className="modal-box max-w-[calc(32rem-4rem)] rounded-[20px] pb-6 pt-8">
          <h3 className="text-center text-lg font-semibold text-black01">{title}</h3>
          <div className="py-2.5 text-center text-base text-black01">{children}</div>
          <div className="modal-action mt-6 flex justify-center">
            <form method="dialog" className="flex justify-center gap-3">
              <Button
                buttonColor="grey06"
                size="medium"
                onClick={() => {
                  closeModal();
                  onClose?.();
                }}
              >
                {closeButtonName}
              </Button>

              {activeButtonComponent}
            </form>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
  },
);

Popup.displayName = 'Popup';

export default Popup;
