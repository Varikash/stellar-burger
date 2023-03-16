import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import ConstructorPage from '../ConstructorPage/ConstructorPage';
import {data} from '../utils/data';

import Style from './App.module.css'

function App() {

  const [state, setState] = React.useState([]);

  React.useEffect(()=> {
    const getIngredients = async () => {
      const res = await fetch(
        'https://norma.nomoreparties.space/api/ingredients'
      );
      const data = await res.json();
      setState(data.data);
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


