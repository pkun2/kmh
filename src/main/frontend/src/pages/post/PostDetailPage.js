import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getData } from "../../services";
import { CommonButton, PageNameBox, PostInfoBox, CommentBox } from "../../components";

const tempItems = {
    post_id: 1,
    user_id: 1,
    nickname: "닉네임",
    title: "때려치우고 최애의 아이 보고싶다 ㅅㅂ",
    content: "다레모 가 메 우바와레테쿠 키미와 깐페키데 큐코쿠노 아이도루!!",
    create_at: "2024-01-17 14:34:00",
    view_count: 1,
    category_tag: "태그",
    channel_id: 1,
    channel_name: "채널 명",
    good_count: 1,
    bad_count: 1
}

const PostDetailPage = () => {
    const location = useLocation();
    const postReference = new URLSearchParams(location.search).get('post_id');
    const [items, setItems] = useState(tempItems);

    useEffect(() => {
        console.log("정보 업데이트 함수 실행"); // 화면 첫 로딩시

        // const fetchData = async () => {
        //     const item = {
        //         //보낼 객체
        //     }
        //
        //     const response = await getData(items, "api");
        //     if(response.status === false) {
        //
        //     } else {
        //         setItems(response.data);
        //     }
        // }
        //
        // fetchData()
    }, [])

    return (
        <>
            <div style={{
                marginRight: 5,
                marginLeft: 5,
            }}
            >
                <PageNameBox
                    items={{title: `${items.channel_name} 채널`}}
                    styles={{
                        paddingTop : 7,
                        paddingBottom: 7,
                        borderBottom: "2px solid #000099",
                        fontWeight: "bold",
                        fontSize: 18
                    }}
                />
                <PostInfoBox
                    items={items}
                />
                <div
                    style = {{
                        borderBottom: "2px solid #AAAAAA",
                        minHeight: 300
                    }}
                >
                    <div>
                        {items.content}
                    </div>
                    <div>
                        임시 이미지
                    </div>
                </div>
                <div>
                    <CommentBox
                        id = {items.post_id}
                    />
                </div>
            </div>
        </>
    )
}

export default PostDetailPage;