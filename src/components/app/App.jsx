import AppHeader from '../AppHeader/AppHeader';
import ConstructorPage from '../ConstructorPage/ConstructorPage';
import Style from './App.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/actions/fetchIngredients';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRouteElement } from '../ProtectedRouteElement/ProtectedRouteElement';
import LoginPage from '../../pages/Login/Login';
import RegisterPage from '../../pages/Register/Register';
import ForgotPage from '../../pages/ForgotPage/ForgotPage';
import ResetPage from '../../pages/ResetPage/ResetPage';
import NotFound404 from '../../pages/NotFound404/NotFound404';
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import ProfileForm from '../../pages/ProfileForm/ProfileForm';
import GuestRouteElement from '../GuestRouteElement/GuestRouteElement';
import { checkUser } from '../../services/reducers/handleUserSlice';

function App() {

  const dispatch = useDispatch();
  const getIngredientsState = state => state.ingredients;
  const ingredientsState = useSelector(getIngredientsState);
  const { loadingIngredients, errorLoadingIngredients} = ingredientsState;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkUser());
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
                <Route path="/login" element={<GuestRouteElement element={<LoginPage />} />} />
                <Route path="/register" element={<GuestRouteElement element={<RegisterPage />} /> } />
                <Route path="/forgot-password" element={<GuestRouteElement element={<ForgotPage />} />} />
                <Route path="/reset-password" element={<GuestRouteElement element={<ResetPage />} />} />
                <Route path="/ingredients/:id" element={<IngredientPage/>} />
                <Route path="/profile/*" element={<ProtectedRouteElement element={<ProfilePage />}/>}> 
                  <Route index element={<ProfileForm />} />
                  {/* <Route path="/order-history" element={<OrderHistory />} /> */}
                  {/* <Route path="/logout" element={<Logout />} /> */}
                </Route>
                <Route path='*' element={<NotFound404 />} />
              </Routes>
            </Router>
        </div>
      </>
  );
  
}

export default App;


