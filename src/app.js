import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timerType, setTimerType] = useState("Session");
    const [play, setPlay] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1500);
    const [playbtn, setPlaybtn] = useState(<i class="fa-solid fa-play"></i>)

    const timeout = setTimeout(() => {
        if (timeLeft && play) {
            setTimeLeft(timeLeft - 1);
        }
    }, 1000);

    const breakIncrease = () => {
        if (breakLength < 60) {
            setBreakLength(breakLength + 1);
        }
    };

    const breakDecrease = () => {
        if (breakLength > 1) {
            setBreakLength(breakLength - 1);
        }
    };

    const sessionIncrease = () => {
        if (sessionLength < 60) {
            setSessionLength(sessionLength + 1);
            setTimeLeft(timeLeft + 60);
        }
    };

    const sessionDecrease = () => {
        if (sessionLength > 1) {
            setSessionLength(sessionLength - 1);
            setTimeLeft(timeLeft - 60);
        }
    };

    const title = timerType === "Session" ? "Session" : "Break";

    const timeFormatter = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft - minutes * 60;
        const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const handlePlay = () => {
        clearTimeout(timeout);
        
        if (play) {
            setPlay(false);
            setPlaybtn(<i class="fa-solid fa-play"></i>);
        } else {
            setPlay(true);
            setPlaybtn(<i class="fa-solid fa-pause"></i>);
        }
    }

    const handleReset = () => {
        clearTimeout(timeout);
        setPlay(false);
        setPlaybtn(<i class="fa-solid fa-play"></i>);
        setTimeLeft(1500);
        setBreakLength(5);
        setSessionLength(25);
        setTimerType("Session");
        const audio = document.getElementById("beep");
        audio.pause()
        audio.currentTime = 0;
    };

    const reset = () => {
        const audio = document.getElementById("beep");
        
        if (!timeLeft && timerType === "Session") {
            setTimeLeft(breakLength * 60);
            setTimerType("Break")
            audio.play();
        }

        if (!timeLeft && timerType === "Break") {
            setTimeLeft(sessionLength * 60);
            setTimerType("Session")
            audio.pause();
            audio.currentTime = 0;
        }
    };

    const clock = () => {
        if (play) {
            timeout;
            reset();
        } else {
            clearTimeout(timeout);
        }
    }

    useEffect(() => {
        clock()
    }, [play, timeLeft, timeout])

    return (<div className="wrapper">
        <div className="section">
            <h1>25 + 5 Clock</h1>
        </div>
        <div className="section two">
            <div className="label">
                <h2 id="break-label">Break Length</h2>
                <div className="inc-dec">
                    <button onClick={breakDecrease} id="break-decrement">
                        <i class="fa-solid fa-arrow-down"></i>
                    </button>
                    <div id="break-length">{breakLength}</div>
                    <button onClick={breakIncrease} id="break-increment">
                        <i class="fa-solid fa-arrow-up"></i>
                    </button>
                </div>
            </div>
            <div className="label">
                <h2 id="session-label">Session Length</h2>
                <div className="inc-dec">
                    <button onClick={sessionDecrease} id="session-decrement">
                        <i class="fa-solid fa-arrow-down"></i>
                    </button>
                    <div id="session-length">{sessionLength}</div>
                    <button onClick={sessionIncrease} id="session-increment">
                        <i class="fa-solid fa-arrow-up"></i>
                    </button>
                </div>
            </div>
        </div>
        <div className="section three">
            <div id="timer-label"><h2>{title}</h2></div>
            <div id="time-left">{timeFormatter()}</div>
            <div className="buttons">
                <button onClick={handlePlay} id="start_stop">
                    {playbtn}
                </button>
                <button onClick={handleReset} id="reset">
                    <i class="fa-solid fa-square"></i>
                </button>
            </div>
        </div>
        <audio 
          id="beep" 
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" 
        />
    </div>)
}

ReactDOM.render(<App />, document.getElementById('root'));