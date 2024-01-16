import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getData } from "../../services";

const MainSearchPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search).get('searchInput');
    const [searchList, setSearchList] = useState('');

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


    return (
        <>
            <div style = {{
                marginRight : 5,
                marginLeft: 5,
            }}
            >
                <div style = {{
                        padding: 10,
                        borderBottom : "2px solid #000099",
                        fontWeight: "bold",
                        fontSize: 18
                    }}
                >
                    전체 채널 검색
                </div>
                <div style = {{

                    }}
                >
                    조회순 드롭다운, 출력할 갯수 드롭다운, 글 쓰기 버튼
                </div>
                <div>
                    <div>
                        번호 태그 제목 닉네임 작성일 조회수 추천
                    </div>
                    <div>
                        리스트
                    </div>
                </div>
                <div>
                    페이지
                </div>
            </div>
        </>
    )
}

export default MainSearchPage;