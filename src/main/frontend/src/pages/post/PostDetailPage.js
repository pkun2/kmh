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

const tempComment = [
    {'comment_id': 1,
        'user_id': 78,
        'post_id': 20,
        'content': 'Content of comment 1',
        'double_comment': 0,
        'nickname': 'User1',
        'time': "2024-01-17 14:34:00"},
    {'comment_id': 2,
        'user_id': 24,
        'post_id': 10,
        'content': 'Content of comment 2',
        'double_comment': 0,
        'nickname': 'User2',
        'time': "2024-01-17 14:34:00"},
    {'comment_id': 3,
        'user_id': 56,
        'post_id': 21,
        'content': 'Content of comment 3',
        'double_comment': 0,
        'nickname': 'User3',
        'time': "2024-01-17 14:34:00"},
    {'comment_id': 4,
        'user_id': 39,
        'post_id': 32,
        'content': 'Content of comment 4',
        'double_comment': 1,
        'nickname': 'User4',
        'time': "2024-01-17 14:34:00"},
    {'comment_id': 5,
        'user_id': 68,
        'post_id': 24,
        'content': 'Content of comment 5',
        'double_comment': 0,
        'nickname': 'User5',
        'time': "2024-01-17 14:34:00"},
    {'comment_id': 6,
        'user_id': 40,
        'post_id': 32,
        'content': 'Content of comment 6',
        'double_comment': 0,
        'nickname': 'User6',
        'time': "2024-01-17 14:34:00"},
    {'comment_id': 7,
        'user_id': 14,
        'post_id': 1,
        'content': 'Content of comment 7',
        'double_comment': 0,
        'nickname': 'User7',
        'time': "2024-01-17 14:34:00"},
    {'comment_id': 8,
        'user_id': 20,
        'post_id': 3,
        'content': 'Content of comment 8',
        'double_comment': 1,
        'nickname': 'User8',
        'time': "2024-01-17 14:34:00"},
    {'comment_id': 9,
        'user_id': 40,
        'post_id': 13,
        'content': 'Content of comment 9',
        'double_comment': 1,
        'nickname': 'User9',
        'time': "2024-01-17 14:34:00"},
    {'comment_id': 10,
        'user_id': 57,
        'post_id': 46,
        'content': 'Content of comment 10',
        'double_comment': 1,
        'nickname': 'User10',
        'time': "2024-01-17 14:34:00"
    }
];

const PostDetailPage = () => {
    const location = useLocation();
    const postReference = new URLSearchParams(location.search).get('post_id');
    const [items, setItems] = useState(tempItems);
    const [comments,setComments] = useState(tempComment);

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
                        이미지 출력이나 게시글 폰트크기에 따른 출력 같은것 때매 DB나 작성 양식을 봐야할듯
                    </div>
                </div>
                <div>
                    <CommentBox
                        items = {comments}
                    />
                </div>
            </div>
        </>
    )
}

export default PostDetailPage;