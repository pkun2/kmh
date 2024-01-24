import { createContext, useContext, useState, useEffect } from 'react';

const TimeoutContext = createContext();

export const TimeoutProvider = ({children}) => {
    const [timer, setTimer] = useState(null);
    const [isTimeout, setIsTimeout] = useState(false);

    const startTimer = () => {
        const newTimer = setTimeout(() => {
            setIsTimeout(true);
            console.log("타이머 만료");
        }, 5 * 1000);

        setTimer(newTimer);
        setIsTimeout(false);
    };

    const resetTimer = () => {
        clearTimeout(timer);
        setTimer(null);

        const newTimer = setTimeout(() => {
            setIsTimeout(true);
            console.log("타이머 만료");
        }, 5 * 1000);

        setTimer(newTimer);
        setIsTimeout(false);
    };
}