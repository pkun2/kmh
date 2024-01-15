import axios from 'axios';

const getData = async (items, endpoint) => {
    const url = `http://localhost:8080/${endpoint}`;
    const config = {
        header: {
            'Content-Type': 'application/json'
        },
        params: items
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
