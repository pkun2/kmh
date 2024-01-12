import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isLogin, setLogin] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // 검색어를 가지고 검색 페이지로 이동
    navigate(`./search?q=${searchInput}`);
  };

  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to="/channel">채널</Link>
        </li>
        <li>
          <Link to="/trpg">trpg</Link>
        </li>
        <li className="search-profile-notice">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="검색"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">검색</button>
          </form>
          {isLogin ? (
            // 로그인 상태일 경우
            <React.Fragment>
              <Link to="/profile">프로필</Link>
              <Link to="/notice">알림</Link>
            </React.Fragment>
          ) : (
            // 로그인 상태가 아닐 경우
            <Link to="/login">로그인</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}