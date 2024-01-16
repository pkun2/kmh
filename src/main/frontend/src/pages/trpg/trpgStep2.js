import React from 'react';

const TrpgStep2 = ({ content, handleContentChange, handleExampleQuestionChange, handlePrevStep, handleNextStep }) => (
    <div>
        <label>
            첫 메시지:
            <textarea name="firstMessage" value={content.firstMessage} onChange={handleContentChange} />
        </label>
        <br />
        <label>
            예시 질문:
            <ul>
                {content.exampleQuestions.map((question, index) => (
                    <li key={index}>
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => handleExampleQuestionChange(index, e.target.value)}
                        />
                    </li>
                ))}
            </ul>
        </label>
    </div>
);

export default TrpgStep2;
