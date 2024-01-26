import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getToken } from "../../services";

function ProfilePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [subChannel, setSubChannel] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken().data;
      try {
        const responseUser = await axios.get('/api/auth/profile/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const responseChannelSub = await  axios.get('/api/auth/profile/subscribed', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(responseUser.data);
        setSubChannel(responseChannelSub.data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, []); // useEffect는 컴포넌트 마운트 시에 한 번만 실행

  const handleCreateChannel = () => {
    navigate("/createChannel");

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
        <div>
          <p>구독한 채널:</p>
          <ul>
            {subChannel.map((channel, index) => (
                <li key={index}>{channel}</li> // 채널 이름을 표시합니다.
            ))}
          </ul>
      </div>
</div>
)
  ;
}

export default ProfilePage;