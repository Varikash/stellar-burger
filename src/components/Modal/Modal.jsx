import ModalOverlay from '../ModalOverlay/ModalOvelay';
import Style from './Modal.module.css';
import { createPortal } from "react-dom";

const modals = document.querySelector('#modals');

export default function Modal({onClose, children}) {
  return createPortal(
    <>
    <div className={`${Style.modal} pt-10 pl-10 pr-10 pb-15`}>{children}</div>
    <ModalOverlay onClick={onClose} />
    </>,
    modals
  )
}