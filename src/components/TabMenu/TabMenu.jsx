import { forwardRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Style from './TabMenu.module.css'

const TabMenu = forwardRef((props, ref) => {

  const handleClick = (ref) => {
    const parentContainer = ref.current.parentNode;
    const categoryTop = ref.current.offsetTop;
    const parentContainerTop = parentContainer.getBoundingClientRect().top;
    const offsetTop = categoryTop - parentContainerTop - parentContainer.scrollTop;

    parentContainer.scroll({
      behavior: 'smooth',
      top: parentContainer.scrollTop + offsetTop
    })
  };
  
    return (
      <div style={{ display: 'flex' }}>
        <a className={Style.link} href='/#Булки'>
          <Tab value="one" active={props.current === 'one'} onClick={() => {
          if (props.bunRef.current) {
            handleClick(props.bunRef);
          }
        }}>
            Булки
          </Tab>
        </a>
        <a className={Style.link}>
          <Tab value="two" active={props.current === 'two'} onClick={() => {
          if (props.sauceRef.current) {
            handleClick(props.sauceRef);
          }
        }}>
            Соусы
          </Tab>
        </a>
        <a className={Style.link}>
          <Tab value="three" active={props.current === 'three'} onClick={() => {
          if (props.mainRef.current) {
            handleClick(props.mainRef);
          }
        }}>
            Начинки
          </Tab>
        </a>
      </div>
    )
})

export default TabMenu;