import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import axios from 'axios';
import {
  ChannelPage,
  SearchPage,
  ProfilePage,
  NoticePage,
  WritePage,
} from '../../pages';

import './HomePage.css'; // 스타일 파일 추가

function HomePage() {
  const [isNoticeModalOpen, setNoticeModalOpen] = useState(false);

  const handleCloseNoticeModal = () => {
    setNoticeModalOpen(false);
  };

//   useEffect(() => {
//     const fetchPosts = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/posts');
//             setPosts(response.data);
//         } catch (error) {
//             console.error('Error fetching posts:', error);
//         }
//     };

//     fetchPosts();
// }, []);

  return (
    <div className="home-container">
      <Routes>
        <Route path="/channel" element={<ChannelPage />} />
        <Route path="/trpg" element={<ChannelPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/write" element={<WritePage />} />
      </Routes>

      <div className="post-list">
        {/* 중앙에 글 리스트를 출력하는 부분 (DB로부터 데이터를 불러와서 표시) */}
        {/* 아래는 예시로 더미 데이터를 사용하였습니다. */}
        <table>
          <thead>
            <tr>
              <th>글 번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>추천</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3</td>
              <td>아 집에 가고 싶다 근데 이미 집이네</td>
              <td>장호열</td>
              <td>2024-01-10</td>
              <td>10</td>
              <td>8</td>
            </tr>
            <tr>
              <td>2</td>
              <td>ㅋㅋ루삥뽕</td>
              <td>박기량</td>
              <td>2024-01-11</td>
              <td>15</td>
              <td>10</td>
            </tr>
            <tr>
              <td>1</td>
              <td>위에 틀딱</td>
              <td>박민주</td>
              <td>2024-01-12</td>
              <td>8</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="write-button">
        {/* 오른쪽 아래 '글쓰기' 버튼 */}
        <Link to="/write">
          <button>글쓰기</button>
        </Link>
      </div>

      {/* 알림 모달*/}
      {isNoticeModalOpen && <NoticePage onClose={handleCloseNoticeModal} />}
    </div>
  );
}

export default HomePage;
