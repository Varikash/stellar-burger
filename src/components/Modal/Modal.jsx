import ModalOverlay from '../ModalOverlay/ModalOvelay';
import Style from './Modal.module.css';
import { createPortal } from "react-dom";
import { useEffect } from 'react';
import PopupIngredient from '../PopupIngredient/PopupIngredient';

const modals = document.querySelector('#modals');
const ingredient = 'pt-10 pl-10 pr-10 pb-15';
const order = 'pt-30 pb-30';

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