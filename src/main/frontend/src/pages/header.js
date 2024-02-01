import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DropDownBox, SearchBox, CommonButton } from "../components";
import axios from "axios"; // 드롭다운 메뉴, 검색 박스, 일반 버튼
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const [isLogin, setLogin] = useState(true);
    const [channels, setChannels] = useState([]); // DB 에서 가져올 채널 map
    const [searchInput, setSearchInput] = useState(''); // 검색어
    const [notifications, setNotifications] = useState(0); // 알림 갯수를 상태로 관리
    const [token, setToken] = useState(sessionStorage.getItem('accessToken')); // 토큰을 상태로 관리
    const navigate = useNavigate();

    // 로그인 상태를 확인하는 함수
    function checkLogin() {
        return token !== null;
    }

    // 알림 갯수를 불러오는 함수(구현 필요)

    useEffect(() => {
        // token 값이 변경될 때마다 sessionStorage 업데이트
        if (checkLogin()) {
            fetchChannels();
        }

        // fetchNotifications(); 알림용 함수, 구현 필요
    }, [token]);

    const fetchChannels = async () => {
        try {
            // 전체 채널 목록 가져오기
            const channelResponse = await axios.get('http://localhost:8080/api/channel/header/subscribed', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const channelList = Object.entries(channelResponse.data).map(([key, value]) => {
                return { channelId: key, channelName: value };
            });
            setChannels(channelList);
        } catch (error) {
            console.error("채널 정보를 불러오는 데 실패했습니다.", error);
        }
    };

    const handleSearch = () => { // 검색어 검색 페이지로 전송 및 이동 함수
        console.log("검색어 : ", searchInput);
        navigate(`./search?searchInput=${encodeURIComponent(searchInput)}`);
    }

    const handleChannel = (selectedChannel) => { // 채널 선택시 선택된 채널 콘솔에 표시, 채널 이동
        console.log(`선택된 채널: ${channels[selectedChannel].channelId}`);
        window.location.href = `/${encodeURIComponent(channels[selectedChannel].channelId)}/post`;
    }

    const channelList = channels.map(channel => ({
        key: channel.channelId,
        value: channel.channelName
    }));

    const handleTRPG = () => { // TRPG 페이지로 이동
        navigate("./trpg");
    }

    const handleGotoChannel = () => {
        navigate("/channel");
    }

    return (
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
                <SearchBox
                    handleChange={setSearchInput}
                    handleClick={handleSearch}
                    styles={{
                        width: "50vw",
                        height: "4vh",
                        border: "2px solid #000099",
                        borderRadius: 5,
                    }}
                    styles2={{
                        borderLeft: "2px solid #000099",
                        backgroundColor: "#000099"
                    }}
                />
                <div>
                    {checkLogin() ? ( // 로그인 상태에 따라 다른 컴포넌트 렌더링
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '20%', margin: '20' }}>
                            <Link to="./notice" style={{ color: 'blue', textDecoration: 'none' }}>
                                <FontAwesomeIcon icon={faBell} size='2x' style={{ marginRight: '10px' }} /> {/* marginRight로 간격 조절 */}
                                {notifications > 0 && <span>{notifications}</span>}
                            </Link>
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
                {checkLogin() && channelList.length > 0 ? (
                    <DropDownBox
                        items={{ title: "채널", list: channelList }}
                        boxStyles={{ height: "5vh", backgroundColor: "#000099" }}
                        boxFonts={{ color: "white", fontSize: "100%" }}
                        handleClick={handleChannel}
                    />
                ) : (
                    <CommonButton
                        handleClick={() => handleGotoChannel()}
                        items={{ title: "채널 바로가기" }}
                        styles={{ backgroundColor: '#000099', height: "5vh" }}
                        fonts={{ color: "white", fontSize: '100%' }}
                    />
                )}
                <div style={{ width: "1vw" }}></div>
                <CommonButton
                    handleClick={() => handleTRPG()}
                    items={{ title: "TRPG" }}
                    styles={{ backgroundColor: '#000099', height: "5vh" }}
                    fonts={{ color: "white", fontSize: '100%' }}
                />
            </div>
            <nav>
            </nav>
        </>
    );
}