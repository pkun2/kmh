import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../../services";
import { CommonButton, PageNameBox, SearchResultBox } from "../../components";

const PostPage = () => {
    const [searchList, setSearchList] = useState([]);
    const [channelInfo, setChannelInfo] = useState({
        channel_id: 7,
        channel_name: "test",
        user_id: 2,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 30개까지만 요청
                const response = await getData({ limit: 30 }, 'api/posts/latest');

                // 응답 데이터가 객체이고 data 속성이 배열인 경우에만 처리
                if (response.status && Array.isArray(response.data)) {
                    const data = response.data.map(item => ({
                        number: item.postId,
                        tag: item.categoryTag,
                        title: item.title || "",
                        nickname: item.user.nickname || "",
                        view: item.viewCount,
                        like: item.goodCount
                    }));
                    setSearchList(data);

                    if (response.data.length > 0 && response.data[0].channel) {
                        setChannelInfo(response.data[0].channel);
                    }
                } else {
                    console.error("API 응답 구조가 예상과 다릅니다:", response);
                }
            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
            }
        };

        fetchData();
    }, []);

    const handlePost = (index) => {
        navigate(`/postdetail?post_id=${encodeURIComponent(searchList[index].number)}`);
    };

    const handleWrite = () => {
        navigate('/write');
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
                        <option>추천순</option>
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
                        handleClick={handleWrite}
                    />
                </div>
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
