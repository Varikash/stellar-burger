import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import ConstructorPage from '../ConstructorPage/ConstructorPage';
import {data} from '../utils/data';

import Style from './App.module.css'

class App extends React.Component {
  render() {
    return (
    <div className={`${Style.App} pt-10`}>
      <AppHeader />
      <ConstructorPage data={data}/>
    </div>
  );
  }
}

export default App;


