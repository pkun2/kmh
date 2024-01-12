import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 고정된 user_id값. 나중에 바뀌어야 함.
    const userId = 3;

    axios.get(`/api/user/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log('데이터 fetch 에러: ', error);
      })
  }, []); //처음 1회만 실행
  return (
    <div>
      <p>사용자 프로필</p>
      {user && (
        <div>
          <p>사용자 ID: {user.user_id}</p>
          <p>이메일: {user.email}</p>
          <p>닉네임: {user.nickname}</p>
        </div>
      )}
    </div>
  )
}

export default ProfilePage;