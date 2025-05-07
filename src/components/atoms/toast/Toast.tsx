'use client';

import React from 'react';
import { CloseButtonProps, ToastContainer } from 'react-toastify';

import { BoxIcon } from '../icon/BoxIcon';

const CloseButton = ({ closeToast }: CloseButtonProps) => (
  <div className="absolute right-2.5">
    <BoxIcon name="x" color="grey04" size={20} onClick={closeToast} />
  </div>
);

const Toast = () => {
  return (
    <ToastContainer
      toastClassName="custom-toast"
      autoClose={5000}
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
