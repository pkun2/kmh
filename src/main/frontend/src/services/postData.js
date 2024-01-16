import axios from "axios";

const postData = async (items, endpoint) => {
    const url = `http://localhost:8080/${endpoint}`;
    const config = {
        header : {
            'Content-Type': 'application/json'
        }
    }

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
