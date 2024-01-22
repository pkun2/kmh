import React from "react";
import axios from "axios";
import { postData, getData } from "./"

export const callLogin = async (items) => {
    let ok = true;
    const response = await postData(items, "api/auth/login");
    if(response.status === true) {
        const combinedToken = response.data.grantType + " " + response.data.accessToken;
        sessionStorage.setItem('userToken', combinedToken);
    } else {
        ok = !ok;
    }

    return { status : ok }
}

export const getToken = () => {
    let ok = true;
    let text = ''
    const userToken = sessionStorage.getItem('userToken');
    if(userToken) {
        text = "load userToken success!";
    } else {
        ok = !ok;
        text = "load userToken fail!";
    }

    return { status : ok, data : text};
}

export const callLogout = () => {
    sessionStorage.removeItem('userToken');
}