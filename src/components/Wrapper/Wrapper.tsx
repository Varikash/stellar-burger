import React from 'react';
import Style from './Wrapper.module.css'

type TWrapperProps = {
  children: React.ReactNode;
}

function Wrapper(props: TWrapperProps): JSX.Element {
  return(
    <div className={Style.wrapper}>
      {props.children}
    </div>
  )
}

export default Wrapper;