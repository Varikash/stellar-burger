import AppHeader from '../AppHeader/AppHeader';
import ConstructorPage from '../ConstructorPage/ConstructorPage';
import Style from './App.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/actions/fetchIngredients';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/Login/Login';
import RegisterPage from '../../pages/Register/Register';
import ForgotPage from '../../pages/ForgotPage/ForgotPage';
import ResetPage from '../../pages/ResetPage/ResetPage';

function App() {

  const dispatch = useDispatch();
  const getIngredientsState = state => state.ingredients;
  const ingredientsState = useSelector(getIngredientsState);
  const { loadingIngredients, errorLoadingIngredients} = ingredientsState;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch])

  const content = loadingIngredients 
  ? <p>...Загрузка</p>
  : errorLoadingIngredients
    ? <p className={`${Style.error}`}>Ошибка загрузки</p>
    : <ConstructorPage />;

    return (
      <>
        <div className={`${Style.App} pt-10`}>
            <Router>
              <AppHeader />
              <Routes>
                <Route path="/" element={content}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPage />} />
                <Route path="/reset-password" element={<ResetPage />} />
              </Routes>
            </Router>
        </div>
      </>
  );
  
}

export default App;


