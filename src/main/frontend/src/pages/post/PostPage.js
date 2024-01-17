import React, { useState, useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { getData } from "../../services";
import {CommonButton, PageNameBox, SearchResultBox} from "../../components";

const tempList = [{'number': 1,
    'tag': '태그1',
    'title': '제목1',
    'nickname': '닉네임1',
    'view': 0,
    'like': 0},
    {'number': 2,
        'tag': '태그2',
        'title': '제목2',
        'nickname': '닉네임2',
        'view': 10,
        'like': 5},
    {'number': 3,
        'tag': '태그3',
        'title': '제목3',
        'nickname': '닉네임3',
        'view': 20,
        'like': 10},
    {'number': 4,
        'tag': '태그4',
        'title': '제목4',
        'nickname': '닉네임4',
        'view': 30,
        'like': 15},
    {'number': 5,
        'tag': '태그5',
        'title': '제목5',
        'nickname': '닉네임5',
        'view': 40,
        'like': 20},
    {'number': 6,
        'tag': '태그6',
        'title': '제목6',
        'nickname': '닉네임6',
        'view': 50,
        'like': 25},
    {'number': 7,
        'tag': '태그7',
        'title': '제목7',
        'nickname': '닉네임7',
        'view': 60,
        'like': 30},
    {'number': 8,
        'tag': '태그8',
        'title': '제목8',
        'nickname': '닉네임8',
        'view': 70,
        'like': 35},
    {'number': 9,
        'tag': '태그9',
        'title': '제목9',
        'nickname': '닉네임9',
        'view': 80,
        'like': 40},
    {'number': 10,
        'tag': '태그1',
        'title': '제목10',
        'nickname': '닉네임10',
        'view': 90,
        'like': 45},
    {'number': 11,
        'tag': '태그1',
        'title': '제목11',
        'nickname': '닉네임11',
        'view': 100,
        'like': 50},
    {'number': 12,
        'tag': '태그2',
        'title': '제목12',
        'nickname': '닉네임12',
        'view': 110,
        'like': 55},
    {'number': 13,
        'tag': '태그3',
        'title': '제목13',
        'nickname': '닉네임13',
        'view': 120,
        'like': 60},
    {'number': 14,
        'tag': '태그4',
        'title': '제목14',
        'nickname': '닉네임14',
        'view': 130,
        'like': 65},
    {'number': 15,
        'tag': '태그5',
        'title': '제목15',
        'nickname': '닉네임15',
        'view': 140,
        'like': 70},
    {'number': 16,
        'tag': '태그6',
        'title': '제목16',
        'nickname': '닉네임16',
        'view': 150,
        'like': 75},
    {'number': 17,
        'tag': '태그7',
        'title': '제목17',
        'nickname': '닉네임17',
        'view': 160,
        'like': 80},
    {'number': 18,
        'tag': '태그8',
        'title': '제목18',
        'nickname': '닉네임18',
        'view': 170,
        'like': 85},
    {'number': 19,
        'tag': '태그9',
        'title': '제목19',
        'nickname': '닉네임19',
        'view': 180,
        'like': 90},
    {'number': 20,
        'tag': '태그1',
        'title': '제목20',
        'nickname': '닉네임20',
        'view': 190,
        'like': 95}
];

const tempChannel = {
    channel_id: 1,
    channel_name: "채널 명",
    user_id:1
}

const PostPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search).get('searchInput');
    const [searchList, setSearchList] = useState(tempList);
    const [channelInfo, setChannelInfo] = useState(tempChannel);
    const navigate = useNavigate();

    const handleSearch = async (event) => {
        event.preventDefault();
        console.log("데이터 가져옴:");
        console.log("API : http://localhost:8080/api/posts/latest");
        console.log("검색어 : ");

        const items = {

        }

        const response = await getData(items, 'api/posts/latest');
        console.log(response);
    }

    const handlePost = (index) => {
        console.log(`${index}번째 글 클릭함`);
        console.log(`${index}번째 글 정보 :\n`, searchList[index]);
        navigate(`/postdetail?post_id=${encodeURIComponent(searchList[index].number)}`)
    }

    return (
        <>
            <div style = {{
                marginRight : 5,
                marginLeft: 5,
            }}
            >
                <PageNameBox
                    items = {{title: `${channelInfo.channel_name} 채널`}}
                    styles = {{
                        padding: 8,
                        borderBottom: "2px solid #000099",
                        fontWeight: "bold",
                        fontSize: 18
                    }}
                />
                <div style = {{
                    display: "flex",
                    borderBottom: "2px solid #000099",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingTop : 5,
                    paddingBottom : 5,
                }}
                >
                    <select style={{
                        borderRadius: 0,
                        padding: 2,
                        marginLeft: 3,
                        outline: "none"
                    }}
                    >
                        <option>조회순</option>
                    </select>
                    <select style={{
                        borderRadius: 0,
                        padding: 2,
                        marginLeft: 3,
                        outline: "none"
                    }}
                    >
                        <option>30개</option>
                    </select>
                    <CommonButton
                        styles={{border: "1px solid gray", backgroundColor: "white", marginLeft: 3}}
                        items={{title: "글 쓰기"}}
                    />
                </div>
                <SearchResultBox
                    items = {searchList}
                    handleClick={handlePost}
                />
                <div style = {{
                    display: "flex",
                    justifyContent:"center",
                    fontSize: 12
                }}
                >
                    1
                </div>
            </div>
        </>
    )
}
export default PostPage