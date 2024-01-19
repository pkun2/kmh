import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { getData } from "../../services";
import {CommonButton, PageNameBox, SearchResultBox} from "../../components";

const PostPage = () => {
    const [searchList, setSearchList] = useState([]);
    const [channelInfo, setChannelInfo] = useState({
        channel_id: 1,
        channel_name: "test",
        user_id: 3,
    })
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData({}, 'api/posts/latest');
            const data = response.map(item => ({
                number: item.postId,
                tag: item.categoryTag,
                title: item.title,
                nickname: item.nickname,
                view: item.viewCount,
                like: item.goodCount
            }));
            setSearchList(data);
        };
        fetchData();
    }, []);

    const handlePost = (index) => {
        navigate(`/postdetail?post_id=${encodeURIComponent(searchList[index].number)}`)
    }

    const handleWrite = () => {
        navigate('/write');
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
