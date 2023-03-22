import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import ConstructorPage from '../ConstructorPage/ConstructorPage';

import Style from './App.module.css'

function App() {

  const [state, setState] = React.useState([]);

  React.useEffect(()=> {
    const getIngredients = async () => {
      try {
        const res = await fetch(
        'https://norma.nomoreparties.space/api/ingredients'
      );
      if (!res.ok) {
        throw new Error('Ошибка запроса API')
      }
      const data = await res.json();
      setState(data.data);
      } catch (error) {
        console.error(error);
      }
    }

    getIngredients();
  },[])

    return (
    <div className={`${Style.App} pt-10`}>
      <AppHeader />
      <ConstructorPage data={state}/>
    </div>
  );
  
}

export default App;


