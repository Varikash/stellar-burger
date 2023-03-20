import ModalOverlay from '../ModalOverlay/ModalOvelay';
import Style from './Modal.module.css';
import { createPortal } from "react-dom";
import { useEffect } from 'react';

const modals = document.querySelector('#modals');

export default function Modal({onClose, children}) {

  const closeModalOnEsc = (evt) => {
    if(evt.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeModalOnEsc);

    return () => {
      document.removeEventListener('keydown', closeModalOnEsc);
    }
  }, [])

  return createPortal(
    <>
    <div className={`${Style.modal} pt-10 pl-10 pr-10 pb-15`}>{children}</div>
    <ModalOverlay onClick={onClose} />
    </>,
    modals
  )
}