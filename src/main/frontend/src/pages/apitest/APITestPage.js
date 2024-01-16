import React, { useState, useEffect } from "react";
import { postData, getData } from "../../services";

const APITestPage= () => {
    const [post, setPost] = useState(true);
    const [items, setItems] = useState([]);
    const [endpoint, setEndpoint] = useState('');

    useEffect(() => {
        if(post === true) {
            console.log("현재 타입 : Post");
        } else {
            console.log("현재 타입 : Get");
        }
    }, [post])

    const toggleType = () => {
        setPost(!post);
    }

    const addItem = () => {
        setItems(items.concat({key : '', value : ''}));
    }

    const removeItem = index => {
        const newInputs = items.filter((input, i) => i !== index);
        setItems(newInputs); // 특정 인덱스의 입력 필드 제거
    };

    const handleClick = async () => {
        const convertedItems = items.reduce((obj, item) => {
            obj[item.key] = item.value;
            return obj;
        }, {});

        console.log("보내는 객체 :\n", convertedItems);
        console.log("엔드포인트 :\n", endpoint);
        if(post === true) {
            console.log("보내는 타입 : Post");
        } else {
            console.log("보내는 타입 : Get");
        }

        if(post) {
            const result = await postData(convertedItems, endpoint);
            console.log(result);
        } else {
            const result = await getData(convertedItems, endpoint);
            console.log(result);
        }
    }

    return (
        <>
            <div>
                API 테스트 페이지
            </div>
            <div>
                타입 :
                {(post === true) ?
                    <button style = {{marginLeft: 7, width:45}}
                        onClick = {() => toggleType()}>Post</button>
                    : <button style = {{marginLeft: 7, width:45}}
                        onClick = {() => toggleType()}>Get</button>}
            </div>
            <div>
            엔드포인트 :
            <input style = {{marginLeft : 7}}
                type = "text" value = {endpoint} onChange = {(e) => setEndpoint(e.target.value)} />
            </div>
            <div>
                {items.map((input, index) => (
                    <div key={index}>
                        key :
                        <input style = {{margin: 7}}
                            type="text" value={input.key} onChange={e => {
                            const newInputs = [...items];
                            newInputs[index] = {key: e.target.value, value: newInputs[index].value};
                            setItems(newInputs);
                        }}/>
                        value :
                        <input style = {{margin: 7}}
                            type="text" value={input.value} onChange={e => {
                            const newInputs = [...items];
                            newInputs[index] = {key: newInputs[index].key, value: e.target.value}
                            setItems(newInputs);
                        }}/>
                        <button onClick={() => removeItem(index)}>-</button>
                    </div>
                ))}
                <button style = {{marginRight: 7}}
                    onClick={addItem}>+</button>
                <button onClick={handleClick}>submit</button>
            </div>
        </>
    )
}

export default APITestPage