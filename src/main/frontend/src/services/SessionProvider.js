import React, { createContext, useContext, useState, useEffect } from 'react';
import { callLogout } from "./AuthProvider";
import { postData } from "./";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [timerId, setTimerId] = useState(null);

    useEffect(() => {
        const time = sessionStorage.getItem('time'); // 세션 스토리지에서 남은 시간 불러오기
        const tokenTime = sessionStorage.getItem('tokenTime');

        if((time != null) && (tokenTime != null)) { // 로그인 상태(시간 값이 있을경우)
            const nowTime = new Date();
            const duration = new Date(tokenTime) - nowTime;
            setTimer({duration : duration});
        }
    }, [])

    const resetTokenTime = async () => {
        const response = await postData({}, "api/auth/refresh");
        if(response.status === true) {
            const tokenTime = calculateTokenTime();
            sessionStorage.setItem('tokenTime', tokenTime.toString());
            sessionStorage.setItem('accessToken', response.data.accessToken);
            sessionStorage.setItem('refreshToken', response.data.refreshToken);
        } else {
            console.log(response.data);
        }
    }

    const setTimer = ({duration}) => {
        console.log("duration : ", duration / 1000);
        setTimerId(setTimeout(() => {
            const time = new Date(sessionStorage.getItem('time'));
            const nowTime = new Date();
            if(time > nowTime) { // 유효 시간이 현재 시간보다 길 때
                const nowTime = new Date();
                const tokenTime = calculateTokenTime()
                resetTokenTime();
                setTimer({duration : tokenTime - nowTime});
            } else { // 시간이 만료되었을 경우, 토큰 삭제
                sessionStorage.removeItem('time');
                sessionStorage.removeItem('tokenTime');
                sessionStorage.removeItem('accessToken');
                sessionStorage.removeItem('refreshToken');
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

    const getTimeout_ExpirePage = () => {
        // 페이지 이동 시 유효 시간 검사, 만료 시 인증 정보 제거
        // 페이지 이동 시 사용하며, 로그인이 유효하면 true, 유효하지 않거나 로그인 상태가 아니면 false를 반환함
        // 로그인 하지 않으면 이동할 수 없는 페이지 이동시 사용
        const time = sessionStorage.getItem('time'); // 시간 가져옴
        const tokenTime = sessionStorage.getItem('tokenTime');

        if((time != null) && (tokenTime != null)) { // 유효 시간이 있을 경우 -> 로그인은 한경우
            console.log("로그인은 함");
            const nowTime = new Date();

            if(new Date(time) > nowTime) { // 시간 유효
                console.log("시간 유효");
                sessionStorage.setItem('time', calculateTime().toString()); // 갱신
                return true;
            } else { // 시간 만료
                clearTimeout(timerId);
                callLogout();
                return false;
            }
        } else {
            console.log("로그인도 안함");
            if((sessionStorage.getItem('accessToken') == null) && (sessionStorage.getItem('refreshToken') == null)) {
                // 토큰도 없고 시간도 없을 경우 -> 로그인 상태가 아닌경우
                return false;
            }
        }
    };

    const getTimeout_KeepPage = () => {
        // 페이지 이동 시 유효 시간 검사, 만료 시 인증 정보 제거
        // 반환 값이 없으며 활동을 감지하여 토큰을 갱신하기 위함
        // 로그인 하지 않아도 활동이 가능한 페이지 이동시 사용
        const time = sessionStorage.getItem('time'); // 시간 가져옴
        const tokenTime = sessionStorage.getItem('tokenTime');

        if((time != null) && (tokenTime != null)) { // 유효 시간이 있을 경우 -> 로그인은 한경우
            const nowTime = new Date();
            if(new Date(time) > nowTime) { // 시간 유효
                sessionStorage.setItem('time', calculateTime().toString()); // 갱신
            } else { // 시간 만료
                clearTimeout(timerId);
                callLogout();
            }
        }
    }

    return (
        <SessionContext.Provider value={{ startTimer, getTimeout_ExpirePage, getTimeout_KeepPage}}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    return useContext(SessionContext);
};
