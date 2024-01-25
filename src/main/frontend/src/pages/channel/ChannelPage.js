import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ChannelPage.css';

const ChannelPage = () => {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/channel/get')
            .then(response => {
                setChannels(response.data);
            });
    }, []);

    const subscribeToChannel = async (channelId) => {
        try {
            const token = sessionStorage.getItem('accessToken'); // JWT 토큰이 여기에 저장되어 있다고 가정

            await axios.post(`http://localhost:8080/api/channel/subscribe/${channelId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert('채널 구독 성공!');
        } catch (error) {
            console.error('채널 구독 실패', error);
            alert('채널 구독에 실패했습니다.');
        }
    };

    return (
        <div className="home-container">
            <div className="post-list">
                <table>
                    <tbody>
                    {channels.map((channel, index) => (
                        <tr key={index}>
                            <td>{channel.channel_id}</td>
                            <td>{channel.channel_name}</td>
                            <td>{channel.user_id}</td>
                            <td><button onClick={() => subscribeToChannel(channel.channel_id)}>채널 구독하기</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ChannelPage;
