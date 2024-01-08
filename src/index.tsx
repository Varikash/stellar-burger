import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { BrowserRouter as Router} from 'react-router-dom';
import { FeedOrderMiddleware } from './services/webSocket/utils';
import type {} from "redux-thunk/extend-redux"


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, FeedOrderMiddleware),
  devTools: true, 
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
