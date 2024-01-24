import React, { createContext, useContext, useState, useEffect } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [time, setTime] = useState(null);

    const calculateTime = () => {
        const currentTime = new Date();
        return new Date(currentTime.getTime() + 15 * 60 * 1000);
    }

    const startTimer = () => {
        const t = calculateTime();
        setTime(t);
        console.log("시간 설정 : \n", t);
    };

    const resetTimer = () => {
        const t = calculateTime();
        console.log("시간 리셋 : \n", t);
        setTime(t);
    };

    const getTimeout = () => {
        const currentTime = new Date();
        if(currentTime > time) {
            // 로그아웃 로직
            console.log("시간 만료");
            return false;
        } else {
            resetTimer();
            return true;
        }
    };

    const deleteTimer = () => {
        console.log("로그 아웃 시 호출");
        setTime(null);
    }

    return (
        <SessionContext.Provider value={{ startTimer, getTimeout, deleteTimer}}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    return useContext(SessionContext);
};
