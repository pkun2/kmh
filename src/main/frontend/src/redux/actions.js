// src/actions/sessionActions.js
export const startSession = (user) => {
    return {
        type: 'START_SESSION',
        payload: {
            user,
            timeoutId: setTimeout(() => {
                // 타임아웃 시 로그아웃 액션을 디스패치
                store.dispatch(logout());
            }, 600000), // 10분 (단위: 밀리초)
        },
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT',
    };
};
