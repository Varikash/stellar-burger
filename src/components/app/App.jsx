import AppHeader from '../AppHeader/AppHeader';
import ConstructorPage from '../ConstructorPage/ConstructorPage';
import Style from './App.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/actions/fetchIngredients';

function App() {

  const dispatch = useDispatch();

  const { loadingIngredients, errorLoadingIngredients, ingredientsLoaded} = useSelector(store => store.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch])

    return (
      <>
        <div className={`${Style.App} pt-10`}>
            <AppHeader />
            {loadingIngredients && <p>...Загрузка</p>}
            {errorLoadingIngredients && <p className={`${Style.error}`}>Ошибка загрузки</p>}
            {ingredientsLoaded && <ConstructorPage/>}
        </div>
      </>
  );
  
}

export default App;


