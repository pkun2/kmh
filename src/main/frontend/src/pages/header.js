import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DropDownBox, SearchBox, CommonButton } from "../components"; // 드롭다운 메뉴, 검색 박스, 일반 버튼

export default function Header() {
    const [isLogin, setLogin] = useState(true);
    const [channelList, setChannelList] = useState([
      {key: "channel1", value: "민주킹만만세"},
      {key: "channel2", value: "vvZI존호열vv"},
      {key: "chennel3", value: "박기량변태"}
    ]); // DB 에서 가져올 채널 리스트
    const [searchInput, setSearchInput] = useState(''); // 검색어
    const navigate = useNavigate();

    const handleSearch = () => { // 검색어 검색 페이지로 전송 및 이동 함수
        console.log("검색어 : ", searchInput);
        navigate(`./search?${searchInput}`);
    }

    const handleChannel = (e) => { // 채널 선택시 선택된 채널 콘솔에 표시, 채널 이동
        console.log(`채널 눌림, key: ${channelList[e].key}, value: ${channelList[e].value}`);
        navigate(channelList[e].key);
    }

  const handleTRPG = () => { // TRPG 페이지로 이동
    navigate("./trpg");
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
          <Link
            style = {{
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
              styles = {{
                  width: "50vw",
                  height: "4vh",
                  border: "2px solid #000099",
                  borderRadius: 5,
              }}
              styles2 = {{
                  borderLeft: "2px solid #000099",
                  backgroundColor: "#000099"
              }}
          />
            <Link
                style = {{
                    color: "black",
                    textDecoration: "none",
                    fontSize: "3vh"
                }}
                to="./login">LOGIN</Link>
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
                borderTop: "1px Solid #AAAAAA",
                borderBottom: "1px Solid #AAAAAA",
            }}
        >
            <DropDownBox
                items = {{title: "Channel", list: channelList}}
                boxStyles={{
                    height: "5vh",
                    backgroundColor: "#000099",
                }}
                boxFonts={{
                    color: "white",
                    fontSize: "100%"
                }}
                handleClick = {handleChannel}
            />
            <div style = {{width:"1vw"}}></div>
            <CommonButton
                handleClick = {() => handleTRPG()}
                items = {{title: "TRPG"}}
                styles={{backgroundColor: '#000099', height: "5vh"}}
                fonts={{color: "white", fontSize: '100%'}}
            />
        </div>
        <nav>
        </nav>
      </>
  );
}