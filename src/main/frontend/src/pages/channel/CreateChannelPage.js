import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from "../../services";

const CreateChannelPage = () => {
    const [channelName, setChannelName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const token = getToken().data; // 유저 ID를 가져오는 로직
        const userId = token.userId; // 예시로 token 객체에 userId가 있다고 가정

        try {
            // 채널 생성 API 요청
            await axios.post('/api/channels/post', {
                name: channelName,
                createdBy: userId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('채널이 성공적으로 생성되었습니다.');
        } catch (error) {
            console.error('Error creating channel', error);
            setMessage('채널 생성에 실패했습니다.');
        }

        setIsSubmitting(false);
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
                <button type="submit" disabled={isSubmitting}>
                    채널 만들기
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateChannelPage;
