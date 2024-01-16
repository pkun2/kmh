import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getData } from "../../services";
import { CommonButton } from "../../components";

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
];

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
        'like': 95}];

const PostPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search).get('searchInput');
    const [searchList, setSearchList] = useState(tempList);
    const navigate = useNavigate();


    const handleSearch = async (event) => {
        event.preventDefault();
        console.log("데이터 가져옴:");
        console.log("API : http://localhost:8080/api/posts/latest");
        console.log("검색어 : ");

        const items = {}

        const response = await getData(items, 'api/posts/latest');
        console.log(response);
    }

    const handlePost = (index) => {
        console.log(`${index}번째 글 클릭함`);
        console.log(`${index}번째 글 정보 :\n`, searchList[index]);
        navigate(`/postdetail?post_id=${searchList[index].post_id}`)
    }


    return (
        <>
            <div style={{
                marginRight: 5,
                marginLeft: 5,
            }}
            >
                <div style={{
                    padding: 8,
                    borderBottom: "2px solid #000099",
                    fontWeight: "bold",
                    fontSize: 18
                }}
                >
                    전체 채널 검색 : {searchParams}
                </div>
                <div style={{
                    display: "flex",
                    borderBottom: "2px solid #000099",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 5,
                    paddingBottom: 5,
                }}
                >
                    <div style={{
                        display: "flex",
                        width: "30vw",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                    >
                        <CommonButton
                            styles={{border: "1px solid GRAY", backgroundColor: "white"}}
                            items={{title: "전체글"}}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        width: "35vw",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                    >
                        <select style={{
                            borderRadius: 0,
                            padding: 2,
                            outline: "none"
                        }}
                        >
                            <option>조회순</option>
                        </select>
                        <select style={{
                            borderRadius: 0,
                            padding: 2,
                            outline: "none"
                        }}
                        >
                            <option>30개</option>
                        </select>
                        <CommonButton
                            styles={{border: "1px solid gray", backgroundColor: "white"}}
                            items={{title: "글 쓰기"}}
                        />
                    </div>
                </div>
                <div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #000099",
                        paddingTop: 2,
                        paddingBottom: 2,
                        fontSize: 10,
                        fontWeight: "bold"
                    }}
                    >
                        <div style={{
                            display: "flex",
                            width: "10%",
                            justifyContent: "center",
                        }}
                        >
                            번호
                        </div>
                        <div style={{
                            display: "flex",
                            width: "5%",
                            justifyContent: "center",
                        }}
                        >
                            태그
                        </div>
                        <div style={{
                            display: "flex",
                            width: "55%",
                            justifyContent: "center",
                        }}
                        >
                            제목
                        </div>
                        <div style={{
                            display: "flex",
                            width: "15%",
                            justifyContent: "center",
                        }}
                        >
                            닉네임
                        </div>
                        <div style={{
                            display: "flex",
                            width: "7.5%",
                            justifyContent: "center",
                        }}
                        >
                            방문
                        </div>
                        <div style={{
                            display: "flex",
                            width: "7.5%",
                            justifyContent: "center",
                        }}
                        >
                            추천
                        </div>
                    </div>
                    <div>
                        {searchList.map((item, index) => (
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderBottom: "1px solid #AAAAAA",
                                paddingTop: 2,
                                paddingBottom: 2,
                                fontSize: 10,
                                cursor: "pointer"
                            }}
                                 key={index}
                                 onClick={() => handlePost(index)}
                            >
                                <div style={{
                                    display: "flex",
                                    width: "10%",
                                    justifyContent: "center",
                                }}
                                >
                                    {item.number}
                                </div>
                                <div style={{
                                    display: "flex",
                                    width: "5%",
                                    justifyContent: "center",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}
                                >
                                    {item.tag}
                                </div>
                                <div style={{
                                    display: "flex",
                                    width: "55%",
                                    justifyContent: "center",
                                }}
                                >
                                    {item.title}
                                </div>
                                <div style={{
                                    display: "flex",
                                    width: "15%",
                                    justifyContent: "center",
                                }}
                                >
                                    {item.nickname}
                                </div>
                                <div style={{
                                    display: "flex",
                                    width: "7.5%",
                                    justifyContent: "center",
                                }}
                                >
                                    {item.view}
                                </div>
                                <div style={{
                                    display: "flex",
                                    width: "7.5%",
                                    justifyContent: "center",
                                }}
                                >
                                    {item.like}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
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