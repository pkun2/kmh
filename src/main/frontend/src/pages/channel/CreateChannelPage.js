import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from "../../services";

const CreateChannelPage = () => {
    const [channelName, setChannelName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!channelName.trim()) {
            setMessage('채널 이름을 입력해주세요.');
            return;
        }

        const token = getToken().data; // 사용자 ID를 포함하고 있다고 가정

        try {
            // 채널 생성 API 요청
            const response = await axios.post('/api/channel/post', {
                channelName: channelName,
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // JWT 토큰을 사용하는 경우
                }
            });

            setMessage('채널이 성공적으로 생성되었습니다.');
        } catch (error) {
            console.error('Error creating channel', error);
            setMessage('채널 생성에 실패했습니다.');
        }
    };

    return (
        <div>
            <h1>채널 만들기</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    채널 이름:
                    <input
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">채널 만들기</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateChannelPage;
