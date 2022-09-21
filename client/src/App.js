import React from 'react';
import './app.css';

import MainDash from './components/MAIN-DASH/MainDash';

const App = () => {
  return (
    <div className='Home'>
      <div className='home-content'>
        <MainDash />
      </div>
    </div>
  );
};
export default App;