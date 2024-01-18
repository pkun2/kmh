import React, { useState, useEffect } from "react";
import { PageNameBox, CommonButton, PagingBox, TextInput } from "./";
import styles from "../styles/styles";

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

const CommentBox = ({id}) => {
    const [items, setItems] = useState(tempComment);
    const [page, setPage] = useState(1);
    const [importNumber, setImportNumber] = useState([
        30, 50, 100
    ]);
    const [currentNumber, setCurrentNumber] = useState(0);
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("post_id: ", id);

        const fetchItems = async () => {
            console.log("데이터 채우기 작업");
        }

        fetchItems();
    },[])

    const handleAddComment = () => {
        console.log("댓글 추가 버튼");
    }

    const handleEmote = () => {
        console.log("이모티콘 버튼");
    }

    return (
        <>
            <div>
                <PageNameBox
                    items = {{title : "전체 댓글"}}
                    styles={{
                        paddingTop: "5vh",
                        paddingBottom: 5,
                        borderBottom: "2px solid #000099",
                        fontWeight: "bold",
                        fontSize: 14
                    }}
                />
                <div style={{
                    alignItems: "center",
                    paddingTop: 2,
                    paddingBottom: 2,
                    fontSize: 10,
                }}
                >
                    {items.map((item, index) => (
                        <div style = {{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: "1px solid #AAAAAA",
                            paddingTop: 2,
                            paddingBottom: 2,
                            fontSize: 11,
                        }}
                             key = {index}
                        >
                            <div style = {{
                                display: "flex",
                                width: "15%",
                                justifyContent:"center",
                                borderRight: "1px solid #AAAAAA",
                            }}
                            >
                                {item.nickname}
                            </div>
                            <div style = {{
                                display: "flex",
                                width: "65%",
                                paddingLeft: "1%",
                                borderRight: "1px solid #AAAAAA"
                            }}
                            >
                                {item.content}
                            </div>
                            <div style = {{
                                display: "flex",
                                width: "20%",
                                justifyContent:"center",
                            }}
                            >
                                {item.time}
                            </div>
                        </div>
                    ))}
                </div>
                <PagingBox />
                <div>
                    <div>
                        <TextInput
                            handleChange={setContent}
                            handleValue={content}
                            items = {{
                                type: "text",
                                title: "내용"
                            }}
                            styles = {{

                            }}
                            fonts = {{

                            }}
                        />
                    </div>
                    <div>
                        <CommonButton
                            handleClick={handleEmote}
                            items = {{
                                title: "이모티콘"
                            }}
                            styles = {{

                            }}
                            fonts = {styles.middleFont("black", "none")}
                        />
                        <CommonButton
                            handleClick={handleAddComment}
                            items = {{
                                title: "추가"
                            }}
                            styles = {{

                            }}
                            fonts ={styles.middleFont("black", "light")}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
export default CommentBox;