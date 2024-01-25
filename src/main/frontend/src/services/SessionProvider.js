import React, { createContext, useContext, useState, useEffect } from 'react';
import { callLogout } from "./AuthProvider";
import { postData } from "./";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [time, setTime] = useState(null);
    const [tokenTime, setTokenTime] = useState(null);

    useEffect(() => {
        // 타이머 초기화 함수
        const resetTimer = () => {

            // 이전 타이머가 있으면 종료
            if (timerId) {
                clearTimeout(timerId);
            }

            // 10초마다 실행
            timerId = setTimeout(() => {
                resetTokenTime();
                resetTimer(); // 새로운 타이머 생성
            }, 5 * 1000);
        };
        let timerId;

        if(tokenTime !== null) {
            console.log("토큰 타이머 설정");
            resetTimer();
        } else {
            clearTimeout(timerId);
        }

    }, [tokenTime]);

    const calculateTime = () => {
        const currentTime = new Date();
        return new Date(currentTime.getTime() + 15 * 60 * 1000);
    }

    const calculateTokenTime = () => {
        const currentTime = new Date();
        return new Date(currentTime.getTime() + 14 * 60 * 1000);
        const timeID = setTimeout(() => {
            console.log("타이머 만료");
        }, 10 * 1000)
    }

    const startTimer = () => {
        const t = calculateTime();
        const tt= calculateTokenTime();
        setTime(t);
        setTokenTime(tt);
        console.log("시간 설정 : \n", t);
    };

    const resetTimer = () => {
        const t = calculateTime();
        console.log("시간 리셋 : \n", t);
        setTime(t);
    };

    const resetTokenTime = async () => {
        console.log("타이머 만료");
        if(time > tokenTime) {
            const response = await postData({}, "api/auth/refresh");
            if(response.status === true) {
                console.log("토큰 갱신 :\n");
                const preA = sessionStorage.getItem('accessToken');
                const preR = sessionStorage.getItem('refreshToken');
                console.log("기존 access 토큰 :\n" + preA);
                console.log("기존 refresh 토큰 :\n" + preR);
                sessionStorage.setItem('accessToken', response.data.accessToken);
                sessionStorage.setItem('refreshToken', response.data.refreshToken);
                const curA = sessionStorage.getItem('accessToken');
                const curR = sessionStorage.getItem('refreshToken');
                console.log("변경된 access 토큰 :\n" + curA);
                console.log("변경된 refresh 토큰 :\n" + curR);
            } else {
                console.log("오류");
                console.log(response.data);
            }
        } else {
            console.log("토큰 갱신 안함");
        }
    }

    const getTimeout = () => {
        const currentTime = new Date();
        if(currentTime < time) {
            // 로그아웃 로직
            console.log("시간 만료");
            return false;
        } else {
            resetTimer();
            return true;
        }
    };

    const deleteTimer = ({route}) => {
        console.log("로그 아웃 시 호출");
        setTime(null);
        callLogout({route});
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
