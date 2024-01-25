import axios from "axios";
import { getToken, getRefreshToken } from "./";

// axios.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if(error.response.status === 401) {
//             console.log("인터셉터 확인");
//             return error;
//         }
//
//         return error;
//     }
// )

const postData = async (items, endpoint) => {
    let ok = true;
    let info = "";
    let data;
    const url = `http://localhost:8080/${endpoint}`;
    const token = getToken().data;
    const config = {
        headers : {
            'Content-Type': 'application/json',
        }
    }
    if(token) {
        config.headers['Authorization'] = "Bearer " + token;
    } else {
        console.error("토큰 없음");
    }
    console.log("items : \n", items);
    console.log("headers : \n", config);


    try {
        const response = await axios.post(url, items, config);
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

export default postData;
