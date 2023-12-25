import Style from './ModalOverlay.module.css';

type TModalOverlayProps = {
  onClick: () => void;
}

export default function ModalOverlay({onClick}: TModalOverlayProps): JSX.Element {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick();
  }
  return(
    <div 
      className={Style.overlay}
      onClick={handleClick}
    />
  )
}