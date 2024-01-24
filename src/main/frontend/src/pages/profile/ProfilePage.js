import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getData, isLogin, useSession } from "../../services";

function ProfilePage() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const { getTimeout, deleteTimer } = useSession();

    useEffect(() => {
        if(isLogin()) {
            console.log("로그인 상태 체크");
            console.log("현재 로그인 상태");
            if(getTimeout()) {

            } else {
                console.log("세션 만료, 로그인 창으로 이동");
                deleteTimer({route: () => navigate("/login")});
            }
        } else {
            console.log("현재 로그인 상태x");
            navigate("/login");
        }
        const fetchProfile = async () => {
            const response = await getData({}, "api/auth/profile")
            if(response.status === true) {
                setUser(response.data);
            } else {
                // 정보 불러오기 실패, 처리 과정 필요
            }
        };

        fetchProfile();
    }, []); // useEffect는 컴포넌트 마운트 시에 한 번만 실행

    const handleCreateChannel = () => {
        navigate("/createChannel");

    }

    const test = () => {
        deleteTimer({route: () => navigate("/login")})
    }

    return (
        <div>
            <p>사용자 프로필</p>
            {user && (
                <div>
                    <p>사용자 ID: {user.id}</p>
                    <p>이메일: {user.email}</p>
                    <p>닉네임: {user.nickname}</p>
                </div>
            )}
            <button onClick={handleCreateChannel}>채널 만들기</button>
            <button onClick={test}>로그아웃 테스트</button>
        </div>
    );
}

export default ProfilePage;