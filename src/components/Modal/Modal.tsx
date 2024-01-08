import ModalOverlay from '../ModalOverlay/ModalOvelay';
import { createPortal } from "react-dom";
import { useEffect } from 'react';

type TModalProps = {
  onClose: () => void;
  children: React.ReactNode;
}


const modals = document.querySelector('#modals');

export default function Modal({onClose, children}: TModalProps): JSX.Element | null {

  useEffect(() => {
    const closeModalOnEsc = (evt: KeyboardEvent) => {
      if(evt.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', closeModalOnEsc);

    return () => {
      document.removeEventListener('keydown', closeModalOnEsc);
    }
  }, [onClose])

  return modals? createPortal(
    <>
    <div>
        {children}
    </div>
    <ModalOverlay onClick={onClose} />
    </>,
    modals
  ) : null;
}