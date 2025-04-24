import React, { useContext, useEffect, useRef, useState } from "react";
import SettingsContext from "./SettingsContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from './SettingsButton';
import ThemeContext  from "./ThemeContext";



function Timer() {
    const { darkMode } = useContext(ThemeContext);
    const settingsInfo = useContext(SettingsContext);
    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState("work"); // work / break
    const [secondsLeft, setSecondsLeft] = useState(0);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
    }

    function switchMode() {
        const nextMode = modeRef.current === "work" ? "break" : "work";
        const nextSeconds =
            (nextMode === "work"
            ? settingsInfo.workMinutes
            : settingsInfo.breakMinutes) * 60;

        setMode(nextMode);
        modeRef.current = nextMode;

        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
        }

        useEffect(() => {
            const workSeconds = settingsInfo.workMinutes * 60;
            setSecondsLeft(workSeconds);
            secondsLeftRef.current = workSeconds;
        }, [settingsInfo.workMinutes, settingsInfo.breakMinutes]);

        useEffect(() => {
            const interval = setInterval(() => {
                if (isPausedRef.current) return;
                if (secondsLeftRef.current === 0) return switchMode();

            tick();
        }, 1000);

        return () => clearInterval(interval);
        }, []);

        function togglePause() {
            setIsPaused((prev) => {
                isPausedRef.current = !prev;
                return !prev;
            });
        }

        const totalSeconds =
        mode === "work"
            ? settingsInfo.workMinutes * 60
            : settingsInfo.breakMinutes * 60;

        const percentage = Math.round((secondsLeft / totalSeconds) * 100);
        const minutes = Math.floor(secondsLeft / 60);
        let seconds = secondsLeft % 60;
        if (seconds < 10) seconds = "0" + seconds;

        return (
            <div>
                <CircularProgressbar
                value={percentage}
                text={`${minutes}:${seconds}`}
                styles={buildStyles({
                    textColor: darkMode ? "#1c2833" : "#eef",
                    pathColor: darkMode ? "#f54e4e" : "#3498db",
                    trailColor: darkMode ? "rgba(255,255,255,.2)" : "rgba(0,0,0,.1)",   
                })}
                />

                <div style={{ marginTop: "20px" }}>
                {isPaused ? (
                    <PlayButton onClick={togglePause}/>
                ) : (
                    <PauseButton onClick={togglePause} />
                )}
                </div>

                <div style={{ marginTop: "20px" }}>
                <SettingsButton onClick={() => settingsInfo.setShowSettings(true)}/>
                </div>
            </div>
        );
    }

export default Timer;
