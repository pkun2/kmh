import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DropDownBox } from "../components";
import axios from "axios"; // 드롭다운 메뉴, 검색 박스, 일반 버튼
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const [channels, setChannels] = useState([]); // DB 에서 가져올 채널 map
    const [token, setToken] = useState(sessionStorage.getItem('accessToken')); // 토큰을 상태로 관리
    const [channelPopular, setChannelPopular] = useState([]);

    const navigate = useNavigate();

    // 로그인 상태를 확인하는 함수
    function checkLogin() {
        return token !== null;
    }

    // 알림 갯수를 불러오는 함수(구현 필요)

    useEffect(() => {
        // token 값이 변경될 때마다 sessionStorage 업데이트
        if (checkLogin()) {
            fetchChannelLogin();
        }
        fetchChannels();

        // fetchNotifications(); 알림용 함수, 구현 필요
    }, []);

    const fetchChannelLogin = async () => {
        try {
            // 로그인한 사용자가 구독한 채널 불러오기
            const channelResponse = await axios.get('http://localhost:8080/api/channel/header/subscribed', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('channelResponse(헤더): ', channelResponse);
            const channelList = Object.entries(channelResponse.data).map(([key, value]) => {
                return { channelId: key, channelName: value };
            });
            setChannels(channelList);
        } catch (error) {
            console.error("채널 정보를 불러오는 데 실패했습니다.", error);
        }
    };

    const fetchChannels = async () => {
        try {
            const channelResponse = await axios.get('http://localhost:8080/api/channel/getChannelName');
            console.log('channelResponse인데, 전체임', channelResponse);

            if (channelResponse.status === 200) {
                const channelData = channelResponse.data.map(item => ({ id: item.id, name: item.name, subscribers: item.subscribers, value: item.name }));
                setChannelPopular(channelData);
            }
        } catch (error) {
            console.error("채널 정보를 불러오는 데 실패했습니다.", error);
        }
    }

    const handleChannel = (selectedChannel) => { // 채널 선택시 선택된 채널 콘솔에 표시, 채널 이동
        console.log(`선택된 채널: ${channels[selectedChannel].channelId}`);
        window.location.href = `/${encodeURIComponent(channels[selectedChannel].channelName)}`;
    }

    const handleChannelAll = (selectedChannel) => { // 채널 선택시 선택된 채널 콘솔에 표시, 채널 이동
        console.log(`선택된 채널: ${selectedChannel.name}`);
        window.location.href = `/${encodeURIComponent(selectedChannel.name)}`;
    }

    const channelList = channels.map(channel => ({
        key: channel.channelId,
        value: channel.channelName
    }));

    const handleGotoChannel = () => {
        navigate("/channel");
    }

    if (window.location.pathname === "/login" || window.location.pathname === "/SignUp") return null;
    else return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "98vw",
                    height: "5vh",
                }}
            >
                <Link
                    style={{
                        color: "black",
                        minWidth: 120,
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "4vh"
                    }}
                    to="./home">KMH HOME</Link>
                <div>
                    {checkLogin() ? ( // 로그인 상태에 따라 다른 컴포넌트 렌더링
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '20%', margin: '20' }}>
                            <Link to="./profile" style={{ color: 'blue', textDecoration: 'none' }}>
                                <FontAwesomeIcon icon={faUser} size='2x' style={{ marginLeft: '10px' }} /> {/* marginLeft로 간격 조절 */}
                            </Link>
                        </div>
                    ) : (
                        <Link
                            style={{
                                color: "black",
                                textDecoration: "none",
                                fontSize: "3vh"
                            }}
                            to="./login">LOGIN</Link>
                    )}
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "98vw",
                    height: "5vh",
                    backgroundColor: "#000099",
                    paddingRight: "1vw",
                    paddingLeft: "1vw",
                    borderTop: "1px Solid #AAAAAA",
                    borderBottom: "1px Solid #AAAAAA",
                }}
            >
                <>
                    <DropDownBox
                        items={{ title: "구독 채널", list: channelList }}
                        boxStyles={{ height: "5vh", backgroundColor: "#000099" }}
                        boxFonts={{ color: "white", fontSize: "100%" }}
                        handleClick={handleChannel}
                    />
                    <DropDownBox
                        items={{ title: "채널 목록", list: channelPopular }}
                        boxStyles={{ height: "5vh", backgroundColor: "#000099" }}
                        boxFonts={{ color: "white", fontSize: "100%" }}
                        handleClick={handleChannelAll}
                        handleGotoChannel={handleGotoChannel}
                    />


                </>
            </div>
            <nav>
            </nav>
        </>
    );
}