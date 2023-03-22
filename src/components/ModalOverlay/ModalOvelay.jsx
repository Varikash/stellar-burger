import Style from './ModalOverlay.module.css'

export default function ModalOverlay({onClick}) {
  const handleClick = (e) => {
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