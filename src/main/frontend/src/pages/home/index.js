import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import './HomePage.css'; // 스타일 파일 추가
import { getData } from "../../services";
import PostCard from "../../components/PostCard"

const channelContainer = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "10px", /* 컨테이너 사이의 간격 */
}

const channel = {
  maxWidth: "250px",
  border: "1px solid #ddd", // 외곽선 추가
  borderRadius: "5px", // 외곽선의 모서리를 둥글게 처리
  padding: "20px", // 내부 여백 추가
  margin: "20px 0", // 상하 여백 추가
  backgroundColor: "#f9f9f9", // 배경색 설정
};


function HomePage() {
  const navigate = useNavigate()
  const [channels, setChannels] = useState([]);
  const [postsByChannel, setPostsByChannel] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 채널 정보 가져오기
    const fetchChannels = async () => {
      try {
        const response = await axios.get('/api/channel/getChannelName');
        setChannels(response.data.map(channel => channel.name));
      } catch (error) {
        console.error('fetchChannels 과정중 오류 발생:', error);
      }
    };

    fetchChannels();
  }, []);

  useEffect(() => {
    const fetchPostsByChannel = async () => {
      let newPostsByChannel = {};

      setIsLoading(true);
      try {
        await Promise.all(channels.map(async (channelName) => {
          // 각 채널별로 게시글 요청
          const response = await getData({limit: 10}, `api/posts/latest/${channelName}`);
          newPostsByChannel[channelName] = response.data.content;
        }));

        setPostsByChannel(newPostsByChannel);
      } catch (error) {
        console.error('fetchPostsByChannel 과정중 오류 발생:', error);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    fetchPostsByChannel();
  }, [channels]);

  const renderChannelRows = () => {
    const rows = [];
    for (let i = 0; i < channels.length; i += 3) {
      rows.push(
          <div key={`row-${i}`} style={channelContainer}>
            {channels.slice(i, i + 3).map(channelName => (
                <div key={channelName} style={channel}>
                  <h2>{channelName}</h2>
                  {/* 채널별 게시물 렌더링 로직 */}
                  {postsByChannel[channelName] && postsByChannel[channelName].length > 0 ? (
                      <ul>
                        {postsByChannel[channelName].map(post => (
                            <PostCard key={post.id} title={post.title} onClick={() => navigate(`/${channelName}/${post.id}`)}/>
                        ))}
                      </ul>
                  ) : <p>이 채널에는 게시글이 없습니다.</p>}
                </div>
            ))}
          </div>
      );
    }
    return rows;
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  return (
      <div>
        {renderChannelRows()}
      </div>
  );
}

export default HomePage;
