import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './HomePage.css'; // 스타일 파일 추가
import { getData } from "../../services";
import PostCard from "../../components/PostCard"

function HomePage() {
  const channelId = 2
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      let response;

      setIsLoading(true);
      try {
        response = await getData({limit: 10}, `api/posts/latest/${channelId}`);
        setPosts(response.data.content);
      } catch (error) {
        console.error('fetchPosts 과정중 오류 발생:', error);
      } finally {
        setIsLoading(false); //로딩 완료
      }
    };

    fetchPosts();
  }, [channelId]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  return (
      <div>
        <h2>{channelId} 채널</h2>
        {posts.length > 0 ? (
            <ul>
              {posts.map(post => (
                  <PostCard key={post.id} title={post.title} onClick={() => alert(`게시글 ${post.title} 선택됨`)} />
              ))}
            </ul>
        ) : (
            <p>이 채널에는 게시글이 없습니다.</p>
        )}
      </div>
  );
}

export default HomePage;
