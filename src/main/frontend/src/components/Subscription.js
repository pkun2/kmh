import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Subscription = ( name ) => {

    const [channel, setChannel] = useState([]);
    const [hover, setHover] = useState(false);

    // 구독 버튼
    const buttonStyle = {
        border: '1px solid black',
        backgroundColor: 'white',
        padding: '5px 7px',
        color: 'black',
        fontSize: '14px',
        cursor: 'pointer',
        outline: 'none',
        marginLeft: 'auto',
    };

    // 구독 취소 버튼
    const subscribedButtonStyle = {
        ...buttonStyle,
        backgroundColor: hover ? 'red' : 'white',
        color: hover ? 'white' : 'black',
    };

    // 구독 버튼에 마우스 갖다대기
    const handleMouseEnter = () => {
        setHover(true);
    };

    // 구독 버튼에서 마우스 떼기
    const handleMouseLeave = () => {
        setHover(false);
    };

    const navigate = useNavigate()

    const token = sessionStorage.getItem('accessToken');
    let headers = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const fetchChannel = async () => {
        try {
            // 특정 채널 구독 여부 불러오기
            const channelName = name.name;
            const channelResponse = await axios.get(`http://localhost:8080/api/channel/get/${channelName}`, {
                    headers: headers
            });
            setChannel(channelResponse.data);
        } catch (error) {
            console.error("채널 정보를 불러오는 데 실패했습니다.", error);
        }
    };

    useEffect(() => {
        fetchChannel();
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
                setChannel(response.data);
            });
            fetchChannel();
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
            fetchChannel();
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
        <div>
            {channel && (
                <button 
                    style={channel.subscribed ? subscribedButtonStyle : buttonStyle} 
                    onClick={() => handleSubscription(channel)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {channel.subscribed ? (hover ? '구독 취소' : '구독 중') : '구독'}
                </button>
            )}
        </div>
    );
}
export default Subscription;