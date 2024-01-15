import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TrpgMain() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // API 호출을 통해 게임 데이터 가져오기
    fetch('/api/trpg')
      .then(response => response.json())
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching TRPG games:', error);
        setLoading(false);
      });
  }, []);

  const handleNewGameClick = () => {
    navigate('/trpg/make');
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : games.length === 0 ? (
        <div>
          <p>현재 게임이 하나도 없네요. 새로운 게임을 만드시겠어요?</p>
          <button onClick={handleNewGameClick}>새 게임 만들기</button>
        </div>
      ) : (
        <div>
          <p>게임 목록:</p>
          <ul>
            {games.map(game => (
              <li key={game.user_id + game.trpg_name}>{`${game.user_id} - ${game.trpg_name}`}</li>
            ))}
          </ul>
          <button onClick={handleNewGameClick}>새 게임 만들기</button>
        </div>
      )}
    </div>
  );
}

export default TrpgMain;
