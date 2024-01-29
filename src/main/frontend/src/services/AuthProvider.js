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
        sessionStorage.setItem('accessToken', response.data.accessToken);
        sessionStorage.setItem('refreshToken', response.data.refreshToken);
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
    let data = "";
    let token = sessionStorage.getItem('accessToken');
    if(token) {
        text = "load accessToken succeed!!";
        data = token
    } else {
        ok = !ok;
        text = "load accessToken failed!";
    }

    return { status : ok, info : text, data : data };
}

export const getRefreshToken = () => {
    let ok = true;
    let text = ''
    let data = "";
    let token = sessionStorage.getItem('refreshToken');
    if(token) {
        text = "load refreshToken succeed!!";
        data = token
    } else {
        ok = !ok;
        text = "load refreshToken failed!";
    }

    return { status : ok, info : text, data : data };
}

export const callLogout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('time');
    sessionStorage.removeItem('tokenTime');
}