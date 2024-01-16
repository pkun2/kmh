import React, { useState, useEffect } from "react";
import { getData } from "../../services";

const MainSearchPage = () => {
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
            <div>
                전체 채널 검색
            </div>
            <div>
                조회순 드롭다운, 출력할 갯수 드롭다운, 글 쓰기 버튼
            </div>
        </>
    )
}

export default MainSearchPage;