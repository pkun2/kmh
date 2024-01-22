import React from "react";
import axios from "axios";

export const callLogin = async (items) => {
    let ok = true;
    let info = "";
    let data = {};
    const url = "http://localhost:8080/api/auth/login";
    const config = {
        header : {
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await axios.post(url, items, config);
        const userToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        const jsonToken = JSON.stringify({
            userToken : userToken,
            refreshToken : refreshToken
        });
        sessionStorage.setItem('auth', jsonToken);
        info = "login succeed!";
    } catch (error) {
        ok = !ok;
        info = "login failed!";
        data = error;
    }

    return { status : ok, info : info, data : data }
}

export const callSingUp = () => {
    const url = "http://localhost:8080/api/auth/register";
}

export const getToken = () => {
    let ok = true;
    let text = ''
    let data = {};
    const userToken = sessionStorage.getItem('auth');
    if(userToken) {
        text = "load userToken succeed!!";
        data = JSON.parse(userToken);
    } else {
        ok = !ok;
        text = "load userToken failed!";
    }

    return { status : ok, info : text, data : data};
}

export const callLogout = () => {
    sessionStorage.removeItem('userToken');
}