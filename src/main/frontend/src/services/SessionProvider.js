import React, { createContext, useContext, useState, useEffect } from 'react';
import { callLogout } from "./AuthProvider";
import { postData } from "./";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [timerId, setTimerId] = useState(null);

    useEffect(() => {
        const time = sessionStorage.getItem('time'); // 세션 스토리지에서 남은 시간 불러오기
        const tokenTime = sessionStorage.getItem('tokenTime');

        if((time != null) && (tokenTime != null)) { // 이게 로그인 상태로, 시간 값이 있을경우
            const nowTime = new Date();
            const duration = new Date(tokenTime) - nowTime;
            setTimer({duration : duration});

        } else {
            console.log("두 번째 경우");
            // 에러 핸들링
        }
    }, [])

    const resetTokenTime = async () => {
        console.log("타이머 만료");
        const response = await postData({}, "api/auth/refresh");
        if(response.status === true) {
            const tokenTime = calculateTokenTime();
            sessionStorage.setItem('tokenTime', tokenTime.toString());
            sessionStorage.setItem('accessToken', response.data.accessToken);
            sessionStorage.setItem('refreshToken', response.data.refreshToken);
        } else {
            console.log("오류");
            console.log(response.data);
        }
    }

    const setTimer = ({duration}) => {
        console.log("duration : ", duration);
        setTimerId(setTimeout(() => {
            const time = new Date(sessionStorage.getItem('time'));
            const nowTime = new Date();
            if(time > nowTime) {
                const nowTime = new Date();
                const tokenTime = calculateTokenTime()
                resetTokenTime();
                setTimer({duration : tokenTime - nowTime});
            } else {
                console.log("시간 초과, 토큰 및 시간 삭제");
                // 과정
            }
        }, duration));
    }

    const calculateTime = () => {
        const currentTime = new Date();
        return new Date(currentTime.getTime() + 15 * 60 * 1000);
    }

    const calculateTokenTime = () => {
        const currentTime = new Date();
        return new Date(currentTime.getTime() + 14 * 60 * 1000);
    }

    const startTimer = () => {
        const nowTime = new Date();
        const time = calculateTime();
        const tokenTime = calculateTokenTime();
        sessionStorage.setItem('time', time.toString());
        sessionStorage.setItem('tokenTime', tokenTime.toString());
        setTimer({duration : tokenTime - nowTime})
    };

    const resetTimer = () => {
        const remainTime = localStorage.getItem('time');
        // if(localStorage.getItem('time') < 현재 시간)
        const t = calculateTime();
        console.log("시간 리셋 : \n", t);
        localStorage.setItem('time', t.toString());
    };

    const getTimeout = () => {
        const currentTime = new Date();
        // if(currentTime < time) {
        //     // 로그아웃 로직
        //     console.log("시간 만료");
        //     return false;
        // } else {
        //     resetTimer();
        //     return true;
        // }
    };

    const deleteTimer = ({route}) => {
        console.log("로그 아웃 시 호출");
        // setTime(null);
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
