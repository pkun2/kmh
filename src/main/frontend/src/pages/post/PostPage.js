import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getData } from "../../services";
import { CommonButton, PageNameBox, SearchResultBox, SearchBox, Pagination } from "../../components";

const PostPage = () => {
    const { channelId } = useParams();
    const [searchList, setSearchList] = useState([]);
    const [channelName, setChannelName] = useState();
    const navigate = useNavigate(); // 페이지 이동
    const location = useLocation(); // ?post=2 같이 이동하기 위해 사용
    const searchKeyword = new URLSearchParams(location.search).get('keyword');
    const page = Number(new URLSearchParams(location.search).get('p')) || 1; // 페이지 번호를 URL에서 가져옴

    const [searchInput, setSearchInput] = useState(''); // 검색어
    const [totalPostCount, setTotalPostCount] = useState(0); // 총 게시글 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호, 기본은 1페이지
    const [selectedSort, setSelectedSort] = useState('등록순'); // 페이지 정렬 기준
    const [postPage, setPostPage] = useState(30); // 한 페이지 당 로딩할 게시글 수

    const handleSearch = () => { // 검색어 입력 시 이동 함수
        console.log("검색어 : ", searchInput);
        navigate(`/post?keyword=${searchInput}`);
    }

    const handleKeyPress = (e) => { // 엔터 누를 시 handleSearch, 즉 검색어로 이동
        if (e.key === "Enter") {
            handleSearch(searchInput);
        }
    };

    const handleReMain = () => { // 채널 명 누를 시 자기 자신으로 이동
        navigate(`/${channelId}/post`);
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
                if (searchKeyword) {
                    response = await getData({ p: p, limit: postPage, keyword: searchKeyword }, 'api/posts/search');
                    console.log(response);
                }
                else if (sort) {
                    switch (sort) {
                        case 'hitAll':
                            const sortHit = 'viewCount';
                            response = await getData({ p: p, limit: postPage, sort: sortHit, ...sortCondition }, `api/posts/latest/${channelId}`);
                            console.log('hitAll: ', response);
                            break;
                        case 'ratingAll':
                            const sortRating = 'goodCount';
                            response = await getData({ p: p, limit: postPage, sort: sortRating, ...sortCondition }, `api/posts/latest/${channelId}`);
                            console.log('ratingAll: ', response);
                            break;
                        default:
                            const sortRecent = 'createdAt';
                            response = await getData({ p: p, limit: postPage, sort: sortRecent, ...sortCondition }, `api/posts/latest/${channelId}`);
                            break;
                    }
                }
                // 얘는 초기화면용
                else {
                    response = await getData({ limit: postPage, ...sortCondition }, `api/posts/latest/${channelId}`);
                    console.log('기본', response);
                }
                console.log(response.data)
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
                    if (response.data.content.length > 0 && response.data.content[0].channelName) {
                        setChannelName(response.data.content[0].channelName);
                    }
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
        navigate(`/${channelId}/postdetail?post_id=${encodeURIComponent(searchList[index].number)}`);
    };

    const handleWrite = () => {
        navigate(`/${channelId}/write`);
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
