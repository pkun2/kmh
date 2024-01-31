/*import React, { useState } from "react";
import { CommonButton, TextInput } from "./";
import styles from "../styles/styles";
import axios from "axios";

const CommentWrite = ({ postId, userId, nickname }) => {
    const [content, setContent] = useState('');

    const handleEmote = () => {
        console.log("이모티콘 버튼");
    }

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
            } else {
                console.error("댓글 추가 실패");
            }
        } catch (error) {
            console.error("댓글 추가 중 에러 발생", error);
        }
    }


    return (
        <div>
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
        </div>
    )
}

export default CommentWrite;
*/