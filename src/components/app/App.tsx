import React from 'react';
import AppHeader from '../app-header/AppHeader';
import ConstructorPage from '../constructor-page/ConstructorPage';


import Style from './App.module.css'

class App extends React.Component {
  render() {
    return (
    <div className={Style.App}>
      <AppHeader />
      <ConstructorPage />
    </div>
  );
  }
}

export default App;


