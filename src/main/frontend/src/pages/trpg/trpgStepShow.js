import React from 'react';
import { FaHeart, FaStar, FaSmile, FaGamepad, FaCoffee, FaCode, FaMusic, FaMoon, FaSun, FaLeaf, FaSnowflake, FaUmbrella, FaPlane, FaShip, FaTrain, FaCar, FaBicycle, FaBook, FaCamera, FaPalette } from 'react-icons/fa';
import './trpg.css'; // 스타일 파일 추가

const TrpgStepShow = ({ step, userInfo, content, prompt }) => (
    <div className="trpg-stepShow">
        <div>
            <h3>전체 입력 내용:</h3>
            <div>
                <h4>기본 정보:</h4>
                {/* 아이콘이 있는 경우에만 표시 */}
                {userInfo.icon && (
                    <p>
                        선택한 아이콘: {userInfo.icon === 'none' ? '없음' : getIconComponent(userInfo.icon)}
                    </p>
                )}
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

const getIconComponent = (icon) => {
    switch (icon) {
        case 'nope':
            return;
        case 'heart':
            return <FaHeart />;
        case 'star':
            return <FaStar />;
        case 'smile':
            return <FaSmile />;
        case 'gamepad':
            return <FaGamepad />;
        case 'coffee':
            return <FaCoffee />;
        case 'code':
            return <FaCode />;
        case 'music':
            return <FaMusic />;
        case 'moon':
            return <FaMoon />;
        case 'sun':
            return <FaSun />;
        case 'leaf':
            return <FaLeaf />;
        case 'snowflake':
            return <FaSnowflake />;
        case 'umbrella':
            return <FaUmbrella />;
        case 'plane':
            return <FaPlane />;
        case 'ship':
            return <FaShip />;
        case 'train':
            return <FaTrain />;
        case 'car':
            return <FaCar />;
        case 'bicycle':
            return <FaBicycle />;
        case 'book':
            return <FaBook />;
        case 'camera':
            return <FaCamera />;
        case 'palette':
            return <FaPalette />;

        default:
            return null;
    }
};

export default TrpgStepShow;