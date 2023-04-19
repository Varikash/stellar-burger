import React, { forwardRef, useEffect, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Style from './TabMenu.module.css'

const TabMenu = forwardRef((props, ref) => {
  const [current, setCurrent] = React.useState('one');

    return (
      <div style={{ display: 'flex' }}>
        <a href='/#Булки' className={Style.link}>
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a href='/#Соусы' className={Style.link}>
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a href='/#Начинки'className={Style.link}>
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>
    )
})

export default TabMenu;