import React from 'react';

const TrpgStep3 = ({ prompt, handlePromptChange, handlePrevStep, handleNextStep }) => (
    <div>
        <label>
            규칙:
            <input type="text" name="role" value={prompt.role} onChange={handlePromptChange} />
        </label>
        <br />
        <label>
            성격:
            <input type="text" name="personality" value={prompt.personality} onChange={handlePromptChange} />
        </label>
        <br />
        <label>
            요구사항:
            <input type="text" name="requirements" value={prompt.requirements} onChange={handlePromptChange} />
        </label>
    </div>
);

export default TrpgStep3;
