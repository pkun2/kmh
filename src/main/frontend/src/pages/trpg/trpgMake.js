import React, { useState } from 'react';
import TrpgStep1 from './trpgStep1';
import TrpgStep2 from './trpgStep2';
import TrpgStep3 from './trpgStep3';
import TrpgStep4 from './trpgStep4';
import TrpgStepShow from './trpgStepShow';
//import './trpg.css';

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

  // Function to handle moving to the next step
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Function to handle moving to the previous step
  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

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
    <div className="trpg-container"> {/* 클래스 추가 */}
      <TrpgStepShow step={step} userInfo={userInfo} content={content} prompt={prompt} />
      {step === 1 && (
        <TrpgStep1
          userInfo={userInfo}
          handleUserInfoChange={handleUserInfoChange}
          handleNextStep={handleNextStep}
          isNextStepAllowed={isUserInfoValid()} // Add validation function
        />
      )}
      {step === 2 && (
        <TrpgStep2
          content={content}
          handleContentChange={handleContentChange}
          handleExampleQuestionChange={handleExampleQuestionChange}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
      {step === 3 && (
        <TrpgStep3
          prompt={prompt}
          handlePromptChange={handlePromptChange}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
        />
      )}
      {step === 4 && (
        <TrpgStep4
          handlePrevStep={handlePrevStep}
        />
      )}
    </div>
  );
};

export default TrpgMake;
