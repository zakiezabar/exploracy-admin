'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Button } from './button';


interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  onSubmit?: () => void;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  fullscreen?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  // footer,
  // actionLabel,
  disabled,
  // onSubmit,
  // secondaryAction,
  // secondaryActionLabel,
  fullscreen,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(onClose, 300); // Use a timeout to allow for a closing animation
  }, [disabled, onClose]);

  // const handleSubmit = useCallback(() => {
  //   if (disabled || !onSubmit) {
  //     return;
  //   }
  //   onSubmit();
  // }, [disabled, onSubmit]);

  // const handleSecondaryAction = useCallback(() => {
  //   if (disabled || !secondaryAction) {
  //     return;
  //   }
  //   secondaryAction();
  // }, [disabled, secondaryAction]);

  if (!showModal) {
    return null;
  }

  return (
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
    >
      <div
        className={`relative 
        ${fullscreen ? 'w-[90%] mt-auto' : 'md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto lg:h-auto md:h-auto'}
        `}
      >
        <div
          className="translate duration-300 h-full opacity-100 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <div className="flex items-center p-6 rounded-t justify-between relative border-b">
            <div className="text-lg font-semibold">{title}</div>
            <Button
              onClick={handleClose}
              className="p-1 border-0 hover:opacity-70 transition absolute right-4"
            >
              <IoMdClose size={18} />
            </Button>
          </div>
          <div className="relative p-6 flex-auto overflow-y-auto max-h-[70vh]">{body}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
