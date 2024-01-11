import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
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
          <input type="text" placeholder="검색" />
          <button>검색</button>
          <Link to="/profile">프로필</Link>
          <span>알림</span>
        </li>
      </ul>
    </nav>
  );
}
