import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import ConstructorPage from '../ConstructorPage/ConstructorPage';
import { getIngredients } from '../../utils/apiBackend';
import Style from './App.module.css'
import { ApiContext } from '../../utils/apiContext';

function App() {

  const [state, setState] = React.useState([]);

  React.useEffect(()=> {
    getIngredients()
    .then(data => {
      if (data.success) {
        setState(data.data)
      } else {
        return Promise.reject(data.error)
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    });
    }
  ,[])

    return (
      <>
      {state.length && (
        <div className={`${Style.App} pt-10`}>
          <ApiContext.Provider value={{state}} >
            <AppHeader />
            <ConstructorPage/>
          </ApiContext.Provider>
        </div>
      )}
      </>
  );
  
}

export default App;


