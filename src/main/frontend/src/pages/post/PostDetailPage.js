import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getData } from "../../services";
import { CommonButton } from "../../components";

const PostDetailPage = () => {
    const location = useLocation();
    const postReference = new URLSearchParams(location.search).get('post_id');

    return (
        <>
            <div>
                게시글 상세 페이지
            </div>
        </>
    )
}

export default PostDetailPage;