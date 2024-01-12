import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ChannelPage.css';

function ChannelPage() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/channels')
      .then(response => {
        console.log(response);
        setChannels(response.data);
      });
  }, []);

  return (
    <div className="home-container">
      <div className="post-list">
        <table>
          <tbody>
            {channels.map((channel, index) => (
              <tr key={index}>
                <td>{channel.channel_id}</td>
                <td>{channel.channel_name}</td>
                <td>{channel.user_id}</td>
                <td><button>채널 구독하기</button></td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChannelPage;
