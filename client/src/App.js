import React, { useEffect, useState } from 'react';
import './app.css';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Pages/Home.jsx'
import Sidebar from './components/Sidebar';
import Tasks from './components/Pages/Tasks';
import Pi from './components/Pages/Pi';
const App = () => {
  const [theme, setTheme] = useState('light');
  const [themeText, setThemeText] = useState('light')

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      setThemeText('dark')
    } else {
      setTheme('light');
      setThemeText('light')
    }
  };
  useEffect(() => {
    document.body.className = theme
  },[theme])
return (
  <div className={`App-${theme}`}>
      <div className={`AppGlass-${theme}`}>
        <Sidebar toggleTheme={toggleTheme} setTheme={setTheme} setThemeText={setThemeText} themeText={themeText} theme={theme}/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/tasks" element={<Tasks  />}></Route>
          <Route path="/pi" element={<Pi />}></Route>
      </Routes>
      </div>
    </div>
  );
};
export default App;