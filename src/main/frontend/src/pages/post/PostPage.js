import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getData } from "../../services";
import { CommonButton, PageNameBox, SearchResultBox, SearchBox } from "../../components";

const PostPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search).get('searchInput');
    const [searchList, setSearchList] = useState([]);
    const [channelInfo, setChannelInfo] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            // 예제에서는 검색어를 items로 전달하고 있습니다. 필요에 따라 수정하세요.
            const items = {
                searchInput: searchParams,
            };

            const response = await getData(items, 'api/posts/latest');
            setSearchList(response);
        };

        const fetchChannelInfo = async () => {
            // 채널 정보 가져오는 API 호출
            const channelResponse = await getData({}, 'api/channel/get');
            setChannelInfo(channelResponse);
        };

        fetchData();
        fetchChannelInfo();
    }, [searchParams]);

    const handlePost = (index) => {
        navigate(`/postdetail?post_id=${encodeURIComponent(searchList[index].number)}`);
    };

    const handleSearch = async (searchInput) => {
        // 검색어 입력 시 호출할 함수
        const items = {
            searchInput,
        };

        const response = await getData(items, 'api/posts/latest');
        setSearchList(response);
    };

    return (
        <>
            <div style={{
                marginRight: 5,
                marginLeft: 5,
            }}>
                <PageNameBox
                    items={{ title: `${channelInfo.channel_name} 채널` }}
                    styles={{
                        padding: 8,
                        borderBottom: "2px solid #000099",
                        fontWeight: "bold",
                        fontSize: 18
                    }}
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
                    }}>
                        <option>조회순</option>
                    </select>
                    <select style={{
                        borderRadius: 0,
                        padding: 2,
                        marginLeft: 3,
                        outline: "none"
                    }}>
                        <option>30개</option>
                    </select>
                    <CommonButton
                        styles={{ border: "1px solid gray", backgroundColor: "white", marginLeft: 3 }}
                        items={{ title: "글 쓰기" }}
                    />
                </div>
                <SearchBox
                    handleChange={handleSearch}
                    styles={{ marginBottom: 10 }}
                />
                <SearchResultBox
                    items={searchList}
                    handleClick={handlePost}
                />
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: 12
                }}>
                    1
                </div>
            </div>
        </>
    );
};

export default PostPage;
