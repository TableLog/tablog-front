'use client';

import { CloseButtonProps, ToastContainer } from 'react-toastify';

import { BoxIcon } from '../icon/BoxIcon';

import 'react-toastify/dist/ReactToastify.css';

const CloseButton = ({ closeToast }: CloseButtonProps) => (
  <div className="ml-auto">
    <BoxIcon name="x" color="grey04" size={20} onClick={closeToast} />
  </div>
);

const Toast = () => {
  return (
    <ToastContainer
      style={{
        width: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      className="max-w-[calc(32rem-40px)]" // max-w-lg-40px
      autoClose={3000}
      toastClassName="custom-toast"
      closeButton={CloseButton}
      icon={({ type }) => {
        // theme is not used in this example but you could
        switch (type) {
          case 'info':
            return <BoxIcon name="info-circle" size={20} color="grey01" />;
          case 'error':
            return <BoxIcon name="error-circle" size={20} color="red01" />;
          case 'success':
            return <BoxIcon name="check" size={20} color="green01" />;
          case 'warning':
            return <BoxIcon name="error-circle" size={20} color="yellow01" />;
          default:
            return null;
        }
      }}
    />
  );
};

export default Toast;
