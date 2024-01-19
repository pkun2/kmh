import React, { createContext, useContext, useState } from 'react';
import { postData } from "./";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트 생성
export const AuthProvider = ({ children }) => {
    const [uid, setUid] = useState(null);
    const [token, setToken] = useState(null);

    const login = async (items) => {
        console.log("items: ", items);
        const response = await postData(items, "api/auth/login");
        console.log("response: ", response);
        const combinedToken = response.data.grantType + " " + response.data.accessToken;
        setUid("임시 uid"); // uid를 쓸 지 몰라서 일단 이렇게 해둔
        setToken(combinedToken);
        console.log(combinedToken);
    };

    const logout = async () => {
        // 서버로 로그아웃 통보 과정 필요할듯
        setUid(null);
        setToken(null);
    };

    const getToken = () => {

        return (token);
    }

    return (
        <AuthContext.Provider value={{ uid, token, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// useAuth Hook 생성
export const useAuth = () => {
    return useContext(AuthContext);
};