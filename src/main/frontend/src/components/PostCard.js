import React from 'react';
import '../styles/styles';

const postCard = ({
    flex: "0 1 calc(50% - 20px)",
    marginBottom: 1,
    cursor: "pointer", // 마우스 오버 시 포인터 변경
});

const titleStyle = {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#333',
    whiteSpace: 'nowrap', // 공백 처리 방식
    overflow: 'hidden', // 내용이 넘칠 경우 숨김
    textOverflow: 'ellipsis', // 넘칠 경우 "..."으로 표시
    marginBottom: '5px', // 제목과 내용 사이의 여백
};

const PostCard = ({ title, onClick }) => {
    return (
        <div style={postCard} onClick={onClick}>
            <p style={titleStyle}>{title || '제목 없음'}</p>
        </div>
    );
};

export default PostCard;
