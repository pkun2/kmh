import React from 'react';

const TrpgStep1 = ({ userInfo, handleUserInfoChange, handleNextStep, isNextStepAllowed }) => (
  <div>
    <label>
      아이콘 선택:
      <select name="icon" value={userInfo.icon} onChange={handleUserInfoChange}>
        {/* 아이콘 옵션은 여기에 추가하세요 */}
      </select>
    </label>
    <br />
    <label>
      플레이어 이름:
      <input type="text" name="playerName" value={userInfo.playerName} onChange={handleUserInfoChange} />
    </label>
    <br />
    <label>
      소개:
      <textarea name="introduction" value={userInfo.introduction} onChange={handleUserInfoChange} />
    </label>
    <br />
    <button onClick={handleNextStep} disabled={!isNextStepAllowed}>
      다음
    </button>
  </div>
);

export default TrpgStep1;
