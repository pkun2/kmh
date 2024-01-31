import axios from 'axios';
import { getToken } from "./";

const getData = async (items, endpoint) => {
    const url = `http://localhost:8080/${endpoint}`;
    const token = getToken().data;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        params: items
    }

    if(token) {
        config.headers['Authorization'] = "Bearer " + token;
    } else {
        console.error("토큰 없음");
    }

    try {
        const response = await axios.get(url, config);
        const loadData = response.data;
        const ok = true
        return {
            status: ok,
            data: loadData
        };
    } catch (error) {
        const notOk = false;
        return {
            status: notOk,
            data: error
        }
    }
}

export default getData;
