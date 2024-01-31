import React, { useEffect, useState } from "react";
import { PageNameBox, Pagination, CommonButton, TextInput } from "./";
import { getData } from "../services";
import styles from "../styles/styles";
import axios from "axios";

const CommentBox = ({ postId, userId, nickname }) => {
    const [content, setContent] = useState('');
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [importNumber, setImportNumber] = useState([
        30, 50, 100
    ]);
    const [currentNumber, setCurrentNumber] = useState(0);
    const [refreshComments, setRefreshComments] = useState(true); // 댓글 작성 시 새로고침
    const commentsPage = 3; // 한 페이지 당 댓글 수

    useEffect(() => {
        console.log("comments", comments);
        setItems(comments);
    }, [comments]);

    useEffect(() => {
        const startIndex = (page - 1) * commentsPage;
        const selectedComments = comments.slice(startIndex, startIndex + commentsPage);
        setItems(selectedComments);
    }, [comments, page]);

    useEffect(() => {
        if (!refreshComments) {
            return;
        }
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await getData({}, `api/posts/${postId}/comments`);
                console.log('responseComments: ', response);
                if (response.status && response.data) {
                    setComments(response.data);
                    setIsLoading(false);
                } else {
                    console.error("댓글 정보를 가져오는데 실패했습니다.");
                }
            } catch (error) {
                console.error("데이터를 불러오는 중 에러 발생", error);
            }
        };

        fetchData();
        setRefreshComments(false);
    }, [refreshComments]);

    // 로딩 중에 뜨는 메시지
    if (isLoading) {
        console.log("로딩중...");
        return <div>댓글 로딩중...</div>;
    }

    const noCommentMessage = !items.length ? <div>댓글이 없습니다. 새로 작성해보세요</div> : null;

    // 이모티콘 추가 버튼
    const handleEmote = () => {
        console.log("이모티콘 버튼");
    }

    // 댓글 추가 버튼
    const handleAddComment = async () => {
        try {
            const response = await axios.post("/api/add/comment", {
                userId: userId,
                postId: postId,
                content: content,
                nickname: nickname
            });

            console.log(response);

            if (response.status === 200) {
                console.log("댓글 추가 성공");
                setContent("");
                setRefreshComments(true);
            } else {
                console.error("댓글 추가 실패");
            }
        } catch (error) {
            console.error("댓글 추가 중 에러 발생", error);
        }
    }

    return (
        <>
            <PageNameBox
                items={{ title: "전체 댓글" }}
                styles={styles.pageNameBox(14)}
            />
            {noCommentMessage}
            {items.map((item, index) => (
                <div style={styles.commentBox(10)}
                    key={index}
                >
                    <div style={styles.commentContent("15%", "none", "right", "1px", "#AAAAAA")}
                    >
                        {item.nickname}
                    </div>
                    <div style={styles.commentContent("65%", "none", "right", "1px", "#AAAAAA")}
                    >
                        {item.content}
                    </div>
                    <div style={styles.commentContent("20%", "none", "none", "1px", "#AAAAAA")}
                    >
                        {item.time}
                    </div>
                </div>
            ))}
            <Pagination
                currentPage={page}
                totalPage={Math.ceil(comments.length / commentsPage)}
                onPageChange={setPage}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
                <TextInput
                    handleChange={setContent}
                    handleValue={content}
                    items={{
                        type: "text",
                        title: "댓글 작성"
                    }}
                    styles={styles.commentInputBox}
                    fonts={styles.smallFont("black", "none")}
                />
            </div>
            <div style={{
                marginTop: 10,
                marginBottom: 10,
                justifyContent: "flex-end"
            }}
            >
                <CommonButton
                    handleClick={handleEmote}
                    items={{
                        title: "이모티콘"
                    }}
                    styles={styles.defaultButton}
                    fonts={styles.middleFont("black", "light")}
                />
                <CommonButton
                    handleClick={handleAddComment}
                    items={{
                        title: "추가"
                    }}
                    styles={styles.defaultButton}
                    fonts={styles.middleFont("black", "light")}
                />
            </div>
        </>
    )
}

export default CommentBox;
