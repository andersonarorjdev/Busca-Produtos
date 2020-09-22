import React, {Component} from 'react';
import Header from './components/header/index';
import './styleglobal.css';
import Main from './pages/main';
import Routes from './routes';

const App = () =>(
  <div id="principal"> 
    <Header />
    <Routes />
  </div>
)

export default App;
