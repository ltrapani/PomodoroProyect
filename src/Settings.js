import ReactSlider from 'react-slider';
import './Slider.css';
import { useContext } from 'react';
import SettingsContext from './SettingsContext';
import BackButton from './BackButton';


function Settings (){
    const settingsInfo = useContext(SettingsContext);

    return(
        <div style={{textAlign:'center'}}>

            <label>Tiempo de estudio: {settingsInfo.workMinutes} min</label>
            <ReactSlider 
            className={'slider'} 
            thumbClassName={'thumb'} 
            trackClassName={'track'}
            value={settingsInfo.workMinutes}
            onChange = {newValue => settingsInfo.setWorkMinutes(newValue)}
            min={'1'}
            max={'120'}
            />

            <label>Tiempo libre: {settingsInfo.breakMinutes} min</label>
            <ReactSlider 
            className={'slider green'} 
            thumbClassName={'thumb'} 
            trackClassName={'track'}
            value={settingsInfo.breakMinutes}
            onChange = {newValue => settingsInfo.setbreakMinutes(newValue)}
            min={'1'}
            max={'120'}
            />

            <div style={{textAlign:'center', marginTop:'20px'}}> 
                <BackButton onClick={() => settingsInfo.setShowSettings(false)}/>
            </div>
        </div>
        
    )
}

export default Settings