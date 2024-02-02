import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getData } from "../../services";
import { CommonButton, PageNameBox, SearchResultBox, SearchBox, Pagination } from "../../components";

const PostPage = () => {
    const { channelName } = useParams();
    const [searchList, setSearchList] = useState([]);
    const navigate = useNavigate(); // 페이지 이동
    const location = useLocation(); // ?p=4와 같이 페이지 이동 위해 사용
    const searchKeyword = new URLSearchParams(location.search).get('keyword');
    const page = Number(new URLSearchParams(location.search).get('p')) || 1; // 페이지 번호를 URL에서 가져옴

    const [searchInput, setSearchInput] = useState(''); // 검색어
    const [totalPostCount, setTotalPostCount] = useState(0); // 총 게시글 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호, 기본은 1페이지
    const [selectedSort, setSelectedSort] = useState('등록순'); // 페이지 정렬 기준
    const [postPage, setPostPage] = useState(5); // 한 페이지 당 로딩할 게시글 수

    const handleSearch = () => { // 검색어 입력 시 이동 함수
        console.log("검색어 : ", searchInput);
        navigate(`/${channelName}?keyword=${searchInput}`);
    }

    const handleKeyPress = (e) => { // 검색어를 입력하고 엔터 누를 시 handleSearch, 즉 검색어로 이동
        if (e.key === "Enter") {
            handleSearch(searchInput);
        }
    };

    const handleReMain = () => { // 채널 명 누를 시 현재 페이지의 초기 페이지로 이동
        navigate(`/${channelName}`);
    }

    // 최근, 조회, 추천순 정렬
    const handleSortChange = (selectedSort) => {
        setSelectedSort(selectedSort);
        let url = '';
        switch (selectedSort) {
            case '등록순':
                url += '?';
                break;
            case '조회순':
                url += '?sort=hitAll';
                break;
            case '추천순':
                url += '?sort=ratingAll';
                break;
            default:
                break;
        }
        navigate(url);
    };

    // 페이지 이동, p=5
    const handlePageChange = (page) => {
        let url = '';
        const params = new URLSearchParams(location.search);
        const sort = params.get('sort');
        const keyword = params.get('keyword');
        if (sort) {
            url += `?sort=${sort}`;
        }
        if (keyword) {
            url += sort ? `&keyword=${keyword}` : `?keyword=${keyword}`;
        }
        url += url.includes('?') ? `&p=${page}` : `?p=${page}`;
        navigate(url);
    };

    useEffect(() => {
        setCurrentPage(page); // 페이지 번호가 URL에서 변경되면 현재 페이지 번호를 업데이트
    }, [page]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 30개까지만 요청
                let response;
                // response 중 채우지 않은 값은 빈 값으로 보냄
                let sortCondition = {};

                const params = new URLSearchParams(location.search);
                const sort = params.get('sort') || 'createdAt'; // sort 값이 없으면 default로 인식
                const p = parseInt(params.get('p'), 10) || 1;
                const query = { p: p, limit: postPage, sort: sort, ...sortCondition };
                if (searchKeyword) {
                    query.keyword = searchKeyword;
                }
                switch (sort) {
                    case 'hitAll':
                        query.sort = 'viewCount';
                        break;
                    case 'ratingAll':
                        query.sort = 'goodCount';
                        break;
                    default:
                        query.sort = 'createdAt';
                        break;
                }

                response = await getData(query, `api/posts/latest/${channelName}`);
                console.log('response', response);
                // 응답 데이터가 객체이고 data 속성이 배열인 경우에만 처리
                if (response.status && response.data && response.data.content) {
                    // 총 게시글 수 가져오기
                    setTotalPostCount(response.data.totalElements);

                    const data = response.data.content.map(item => ({
                        number: item.id,
                        tag: item.categoryTag,
                        title: item.title || "",
                        nickname: item.nickname || "",
                        view: item.viewCount,
                        like: item.goodCount
                    }));
                    setSearchList(data);
                } else {
                    console.error("API 응답 구조가 예상과 다릅니다:", response);
                }
            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
            }
        };

        fetchData();
    }, [searchKeyword, location.search]);

    const handlePost = (index) => {
        navigate(`/${channelName}/${encodeURIComponent(searchList[index].number)}`);
    };

    const handleWrite = () => {
        navigate(`/${channelName}/write`);
    };

    return (
        <>
            <div style={{
                marginRight: 5,
                marginLeft: 5,
            }}>
                <PageNameBox
                    items={{ title: `${channelName} 채널` }}
                    styles={{
                        padding: 8,
                        borderBottom: "2px solid #000099",
                        fontWeight: "bold",
                        fontSize: 18
                    }}
                    handleClick={handleReMain}
                />
                <div style={{
                    display: "flex",
                    borderBottom: "2px solid #000099",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingTop: 5,
                    paddingBottom: 5,
                }}>
                    <select style={{
                        borderRadius: 0,
                        padding: 2,
                        marginLeft: 3,
                        outline: "none"
                    }}
                        value={selectedSort}
                        onChange={(e) => handleSortChange(e.target.value)}
                    >
                        <option>등록순</option>
                        <option>조회순</option>
                        <option>추천순</option>
                    </select>
                    <select style={{
                        borderRadius: 0,
                        padding: 2,
                        marginLeft: 3,
                        outline: "none"
                    }}
                        value={postPage}
                        onChange={(e) => setPostPage(e.target.value)}
                    >
                        <option>30개</option>
                    </select>
                    <CommonButton
                        styles={{ border: "1px solid gray", backgroundColor: "white", marginLeft: 3 }}
                        items={{ title: "글 쓰기" }}
                        handleClick={handleWrite}
                    />
                </div>
                <SearchResultBox
                    items={searchList}
                    handleClick={handlePost}
                />
                <SearchBox
                    onKeyPress={handleKeyPress}
                    handleChange={setSearchInput}
                    handleClick={handleSearch}

                    styles={{
                        width: "50vw",
                        height: "3vh",
                        border: "2px solid #000099",
                        borderRadius: 5,
                        marginLeft: "auto",
                    }}
                    styles2={{
                        borderLeft: "2px solid #000099",
                        backgroundColor: "#000099"
                    }}
                />
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: 12
                }}>
                    <Pagination currentPage={currentPage} totalPage={Math.ceil(totalPostCount / postPage)} onPageChange={handlePageChange} />
                </div>
            </div>
        </>
    );
};

export default PostPage;
