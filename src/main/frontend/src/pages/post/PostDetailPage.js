import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getData } from "../../services";
import { CommonButton, PageNameBox, PostInfoBox, CommentBox } from "../../components";

const PostDetailPage = () => {
    const location = useLocation();
    const postReference = new URLSearchParams(location.search).get('post_id');
    const [items, setItems] = useState(null);
    const [comments, setComments] = useState([]);

    const navigate = useNavigate();

    const handleReMain = () => { // 채널 명 누를 시 자기 자신으로 이동
        navigate(`/post${postReference}`);
        // 추후 수정 필요!!!!!!!!!!!!!!
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(postReference);
                const response = await getData({}, `api/posts/${postReference}`);
                console.log("API Response:", response);

                if (response.status && response.data) {
                    setItems(response.data);
                } else {
                    console.error("게시글 정보를 가져오는데 실패했습니다.");
                }
            } catch (error) {
                console.error("데이터를 불러오는 중 에러가 발생했습니다.", error);
            }
        };

        fetchData();
    }, [postReference]);

    return (
        <>
            <div style={{
                marginRight: 5,
                marginLeft: 5,
            }}>
                {items && (
                    <>
                        <PageNameBox
                            items={{ title: `${items.channel.name} 채널` }}
                            styles={{
                                paddingTop: 7,
                                paddingBottom: 7,
                                borderBottom: "2px solid #000099",
                                fontWeight: "bold",
                                fontSize: 18
                            }}
                            handleClick={handleReMain}
                        />
                        <PostInfoBox
                            items={items}
                        />
                        <div
                            style={{
                                borderBottom: "2px solid #AAAAAA",
                                minHeight: 300
                            }}
                        >
                            <div dangerouslySetInnerHTML={{ __html: items.content }} />

                            <div>
                                {/* 임시 이미지 */}
                            </div>
                        </div>
                        <div>
                            <CommentBox
                                items={comments}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default PostDetailPage;
