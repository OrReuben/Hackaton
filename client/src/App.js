import React from 'react';
import './app.css';
import MainDash from './components/MainDash/MainDash';
import Sidebar  from './components/Sidebar'
const App = () => {
  return (
    <div className="App">
      <div className="AppGlass">
      <Sidebar />
      <MainDash />
        <h1>test</h1>
      </div>
    </div>
  );
};
export default App;