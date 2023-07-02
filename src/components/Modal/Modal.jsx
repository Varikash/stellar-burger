import ModalOverlay from '../ModalOverlay/ModalOvelay';
import { createPortal } from "react-dom";
import { useEffect } from 'react';


const modals = document.querySelector('#modals');

export default function Modal({onClose, children}) {

  useEffect(() => {
    const closeModalOnEsc = (evt) => {
      if(evt.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', closeModalOnEsc);

    return () => {
      document.removeEventListener('keydown', closeModalOnEsc);
    }
  }, )

  return createPortal(
    <>
    <div>
        {children}
    </div>
    <ModalOverlay onClick={onClose} />
    </>,
    modals
  )
}