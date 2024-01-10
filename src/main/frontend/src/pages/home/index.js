import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  ChannelPage,
  SearchPage,
  ProfilePage,
  NoticePage,
  WritePage,
} from '../../pages';

function HomePage() {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = () => {
    // TODO: Implement search functionality with the 'searchInput' value
    console.log(`Searching for: ${searchInput}`);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/channel">채널</Link>
          </li>
          <li>
            <Link to="/trpg">trpg</Link>
          </li>
          <li>
            <input
              type="text"
              placeholder="검색"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <button onClick={handleSearchSubmit}>검색</button>
          </li>
          <li>
            <Link to="/profile">프로필</Link>
          </li>
          <li>
            <Link to="/notice">알림</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/channels" element={<ChannelPage />} />
        <Route path="/trpg" element={<ChannelPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/write" element={<WritePage />} />
      </Routes>

      <div>
        {/* 중앙에 글 리스트를 출력하는 부분 (DB로부터 데이터를 불러와서 표시) */}
        {/* 아래는 예시로 더미 데이터를 사용하였습니다. */}
        <ul>
          <li>글 1</li>
          <li>글 2</li>
          <li>글 3</li>
        </ul>
      </div>

      <div>
        {/* 오른쪽 아래 '글쓰기' 버튼 */}
        <Link to="/write">
          <button>글쓰기</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
