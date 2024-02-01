import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ChannelPage.css';
import {useNavigate} from "react-router-dom";

const ChannelPage = () => {
    const [channels, setChannels] = useState([]);

    const navigate = useNavigate()

    const token = sessionStorage.getItem('accessToken');
    let headers = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const fetchChannels = async () => {
        try {
            // 전체 채널 목록 가져오기
            const channelResponse = await axios.get('http://localhost:8080/api/channel/get', {
                    headers: headers
            });
            setChannels(channelResponse.data);
        } catch (error) {
            console.error("채널 정보를 불러오는 데 실패했습니다.", error);
        }
    };

    useEffect(() => {
        fetchChannels();
    }, []);

    const subscribeToChannel = async (channelId) => {
        try {
            const token = sessionStorage.getItem('accessToken'); // JWT 토큰이 여기에 저장
            await axios.post(`http://localhost:8080/api/channel/subscribe/${channelId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // 구독 성공 후 구독 목록 갱신
            axios.get('http://localhost:8080/api/channel/get', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setChannels(response.data);
            });

            alert('채널 구독 성공!');
        } catch (error) {
            console.error('채널 구독 실패', error);
            alert('채널 구독에 실패했습니다.');
        }
    };

    const unsubscribeFromChannel = async (channelId) => {
        try {
            const token = sessionStorage.getItem('accessToken');
            await axios.delete(`http://localhost:8080/api/channel/cancelSub/${channelId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchChannels();
            alert('채널 구독 취소 성공!');
        } catch (error) {
            console.error('채널 구독 취소 실패', error);
            alert('채널 구독 취소에 실패했습니다.');
        }
    };

    const handleSubscription = (channel) => {
        if (!token) {
            alert("로그인이 필요합니다.")
            navigate("/login")
        }
        else {
            if (channel.subscribed) {
                unsubscribeFromChannel(channel.channelId);
            } else {
                subscribeToChannel(channel.channelId);
            }
        }
    };


    return (
        <div className="home-container">
            <div className="post-list">
                <table>
                    <tbody>
                    {channels.map((channel, index) => (
                        <tr key={index}>
                            <td>{channel.channelName}</td>
                            <td>
                                <button onClick={() => handleSubscription(channel)}>
                                    {channel.subscribed ? '구독중입니다' : '채널 구독하기'}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ChannelPage;
