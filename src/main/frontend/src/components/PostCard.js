import React from 'react';
import '../styles/styles';

const PostCard = ({ title, onClick }) => {
    return (
        <div className="postCard" onClick={onClick}>
            <p>{title || '제목 없음'}</p>
        </div>
    );
};

export default PostCard;
