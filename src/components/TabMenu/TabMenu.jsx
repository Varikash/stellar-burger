import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function TabMenu () {
  const [current, setCurrent] = React.useState('one')
  return (
    <div style={{ display: 'flex' }}>
      <a href='/#Булки'>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
      </a>
      <a href='/#Соусы'>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
      </a>
      <a href='/#Начинки'>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </a>
    </div>
  )
}

export default TabMenu;