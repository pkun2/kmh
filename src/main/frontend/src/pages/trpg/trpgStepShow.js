import React from 'react';
import './trpg.css';

const TrpgStepShow = ({ step, userInfo, content, prompt }) => (
  <div className="stepShow">
    {/* ... */}
    <div>
      <h3>전체 입력 내용:</h3>
      <div>
        <h4>기본 정보:</h4>
        <p>선택한 아이콘: {userInfo.icon}</p>
        <p>플레이어 이름: {userInfo.playerName}</p>
        <p>소개: {userInfo.introduction}</p>
      </div>
      <div>
        <h4>콘텐츠:</h4>
        <p>첫 메시지: {content.firstMessage}</p>
        <p>예시 질문:</p>
        <ul>
          {content.exampleQuestions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>프롬프트:</h4>
        <p>규칙: {prompt.role}</p>
        <p>성격: {prompt.personality}</p>
        <p>요구사항: {prompt.requirements}</p>
      </div>
    </div>
  </div>
);

export default TrpgStepShow;
