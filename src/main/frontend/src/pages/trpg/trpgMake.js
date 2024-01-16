import React, { useState } from 'react';
import TrpgStep1 from './trpgStep1';
import TrpgStep2 from './trpgStep2';
import TrpgStep3 from './trpgStep3';
import TrpgStep4 from './trpgStep4';
import TrpgStepShow from './trpgStepShow';
import './trpg.css';

const TrpgMake = () => {
  const [step, setStep] = useState(1);

  // State for each step
  const [userInfo, setUserInfo] = useState({
    icon: '',
    playerName: '',
    introduction: '',
    category: '',
    isPublic: false,
  });

  const [content, setContent] = useState({
    firstMessage: '',
    exampleQuestions: ['', '', ''],
  });

  const [prompt, setPrompt] = useState({
    role: '',
    personality: '',
    requirements: '',
  });

  // Functions to handle changes in each step
  const handleUserInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const isUserInfoValid = () => {
    // Add your validation logic here. For example:
    return userInfo.playerName !== '' && userInfo.introduction !== '';
  };

  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleExampleQuestionChange = (index, value) => {
    setContent((prevContent) => {
      const updatedQuestions = [...prevContent.exampleQuestions];
      updatedQuestions[index] = value;
      return {
        ...prevContent,
        exampleQuestions: updatedQuestions,
      };
    });
  };

  const handlePromptChange = (e) => {
    const { name, value } = e.target;
    setPrompt((prevPrompt) => ({
      ...prevPrompt,
      [name]: value,
    }));
  };

  return (
    <div className="trpg-container">
      <div className="trpg-main">
        <div className="trpg-stepShow">
          <TrpgStepShow step={step} userInfo={userInfo} content={content} prompt={prompt} />
        </div>
        <div className="trpg-steps">
          <div className="trpg-navigation">
            {/* 1. 위에 1~4번 버튼 추가 */}
            <button onClick={() => setStep(1)} disabled={step === 1}>Step 1</button>
            <button onClick={() => setStep(2)} disabled={step === 2}>Step 2</button>
            <button onClick={() => setStep(3)} disabled={step === 3}>Step 3</button>
            <button onClick={() => setStep(4)} disabled={step === 4}>Step 4</button>
          </div>
          {step === 1 && (
            <TrpgStep1
              userInfo={userInfo}
              handleUserInfoChange={handleUserInfoChange}
              isNextStepAllowed={isUserInfoValid()}
            />
          )}
          {step === 2 && (
            <TrpgStep2
              content={content}
              handleContentChange={handleContentChange}
              handleExampleQuestionChange={handleExampleQuestionChange}
            />
          )}
          {step === 3 && (
            <TrpgStep3
              prompt={prompt}
              handlePromptChange={handlePromptChange}
            />
          )}
          {step === 4 && (
            <TrpgStep4
              userInfo={userInfo}
              content={content}
              prompt={prompt}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default TrpgMake;