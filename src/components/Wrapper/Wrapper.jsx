import React from 'react';
import Style from './Wrapper.module.css'

function Wrapper(props) {
  return(
    <div className={Style.wrapper}>
      {props.children}
    </div>
  )
}

export default Wrapper;