import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DropDownBox, SearchBox, CommonButton } from "../components"; // 드롭다운 메뉴, 검색 박스, 일반 버튼

export default function Header() {
  const [isLogin, setLogin] = useState(true);
  const [channelList, setChannelList] = useState([
      {key: "channel1", value: "민주킹만만세"},
      {key: "channel2", value: "vvZI존호열vv"},
      {key: "chennel3", value: "박기량변태"}
  ]); // DB 에서 가져올 채널 리스트
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // 검색어를 가지고 검색 페이지로 이동
    navigate(`./search?q=${searchInput}`);
  };

  const handleChannel = () => {
      console.log("채널 클릭함");
  }

  const handleTRPG = () => {
      console.log("TRPG 클릭함");
  }

  return (
      <>
        <div
            style = {{
              display: "flex",
              alignItems: "center",
              justifyContent:"space-between",
              width: "98vw",
              height: "5vh",
            }}
        >
          <Link to="./home">KMH 홈</Link>
          <SearchBox

          />
          <Link to="./login">로그인</Link>
        </div>
        <div
            style= {{
                display: "flex",
                alignItems: "center",
                width: "98vw",
                height: "5vh",
                backgroundColor: "#000099",
                paddingRight: "1vw",
                paddingLeft: "1vw",
            }}
        >
            <DropDownBox
                items = {{title: "Channel", list: channelList}}
                handleClick = {handleChannel}
            />
            <div style = {{width:"1vw"}}></div>
            <CommonButton
                handleClick = {() => handleTRPG()}
                items = {{title: "TRPG"}}
                styles={{backgroundColor: '#000099'}}
                fonts={{color: "white", fontSize: '100%'}}
            />
        </div>
        <nav>
          <ul className="nav-list">
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
      </>
  );
}