import './App.css';
import {createGlobalStyle} from 'styled-components';
import Timer from './Timer';
import Settings from './Settings';
import {useState} from 'react';
import SettingsContext from './SettingsContext';
import Toggler from './Toggler';
import ThemeContext from './ThemeContext';

const GlobalStyles = createGlobalStyle`
  body{
    background-color: ${props => props.darkMode ? '#1c2833':'#eef'};
    color: ${props => props.darkMode ? '#eee': '#222'};
  }
`;


function App() {
  const [showSettings, setShowSettings] = useState (false);
  const [workMinutes, setWorkMinutes] = useState (45);
  const [breakMinutes, setbreakMinutes] = useState (15);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main>

      <ThemeContext.Provider value={{darkMode,setDarkMode}}>
        <GlobalStyles darkMode={darkMode} />
        <div className='header'>
          <h2>Dark Mode</h2>
        <Toggler/>
        </div>
      </ThemeContext.Provider>
      
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setbreakMinutes,
      }}>
        {showSettings ? <Settings/> : <Timer/>}
      </SettingsContext.Provider>
      
    </main>
  );
}

export default App;
