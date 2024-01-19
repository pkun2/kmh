import React, { createContext, useContext, useState } from 'react';
import { postData } from "./";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트 생성
export const AuthProvider = ({ children }) => {
    const [uid, setUid] = useState(null);
    const [token, setToken] = useState(null);

    const login = async (items) => {
        console.log(items);
        const response = await postData(items, "/api/auth/register");
        console.log(response);
        setUid();
        setToken();
    };

    const logout = async () => {
        // 서버로 로그아웃 통보 과정 필요할듯
        setUid(null);
        setToken(null);
    };

    const getAuth = () => {

        return {

        }
    }

    return (
        <AuthContext.Provider value={{ uid, token, login, logout, getAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// useAuth Hook 생성
export const useAuth = () => {
    return useContext(AuthContext);
};