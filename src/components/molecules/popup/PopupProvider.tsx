'use client';
import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import Popup, { IPopupProps } from './Popup';

type PopupType = IPopupProps;
type PopupControls = {
  closeModal: () => void;
};
type OpenModalPayload = Omit<IPopupProps, 'activeButtonComponent'> & {
  activeButtonComponent: ReactElement | ((controls: PopupControls) => ReactElement);
};

type PopupContextType = {
  openModal: (modal: OpenModalPayload) => void;
  closeModal: () => void;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function PopupProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<PopupType | null>(null);
  const popupRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!popupRef.current) return;
    if (modal) popupRef.current.showModal();
  }, [modal]);

  const closeModal = useCallback(() => {
    popupRef.current?.close();
    setModal(null);
  }, []);

  const openModal = useCallback(
    (modal: OpenModalPayload) => {
      const activeButtonComponent =
        typeof modal.activeButtonComponent === 'function'
          ? modal.activeButtonComponent({ closeModal })
          : modal.activeButtonComponent;

      setModal({ ...modal, activeButtonComponent });
    },
    [closeModal],
  );

  return (
    <PopupContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal && <Popup ref={popupRef} {...modal} />}
    </PopupContext.Provider>
  );
}

export function usePopupContext() {
  const context = useContext(PopupContext);

  if (!context) throw new Error('usePopupContext must be used within a PopupProvider');

  return context;
}
