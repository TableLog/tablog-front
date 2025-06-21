import React from 'react';

interface IPopupProps {
  id: string;
  title: string;
  closeButtonName?: string;
  activeButtonComponent: React.ReactElement;
  children: React.ReactElement;
}
const Popup = ({
  id,
  title,
  closeButtonName = '닫기',
  activeButtonComponent,
  children,
}: IPopupProps) => {
  return (
    <>
      <dialog id={id} className="modal">
        <div className="modal-box max-w-[calc(100%-4rem)] rounded-[20px] pt-8 pb-6">
          <h3 className="text-center text-xl font-medium">{title}</h3>

          <div className="py-6 text-center text-sm">{children}</div>

          <div className="modal-action mt-3 flex justify-center">
            <form method="dialog" className="flex justify-center gap-3">
              <button className="btn bg-grey06 rounded-full border-none px-4 font-medium shadow-none">
                {closeButtonName}
              </button>

              {activeButtonComponent}
            </form>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Popup;
