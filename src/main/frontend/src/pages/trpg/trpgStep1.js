import React from 'react';
import { FaHeart, FaStar, FaSmile, FaGamepad, FaCoffee, FaCode, FaMusic, FaMoon, FaSun, FaLeaf, FaSnowflake, FaUmbrella, FaPlane, FaShip, FaTrain, FaCar, FaBicycle, FaBook, FaCamera, FaPalette } from 'react-icons/fa';

const TrpgStep1 = ({ userInfo, handleUserInfoChange, handleNextStep, isNextStepAllowed }) => (
    <div>
        <label>
            아이콘 선택:
            <select name="icon" value={userInfo.icon} onChange={handleUserInfoChange}>
                <option value="nope">없음</option>
                <option value="heart"><FaHeart /> Heart</option>
                <option value="star"><FaStar /> Star</option>
                <option value="smile"><FaSmile /> Smile</option>
                <option value="gamepad"><FaGamepad /> Gamepad</option>
                <option value="coffee"><FaCoffee /> Coffee</option>
                <option value="code"><FaCode /> Code</option>
                <option value="music"><FaMusic /> Music</option>
                <option value="moon"><FaMoon /> Moon</option>
                <option value="sun"><FaSun /> Sun</option>
                <option value="leaf"><FaLeaf /> Leaf</option>
                <option value="snowflake"><FaSnowflake /> Snowflake</option>
                <option value="umbrella"><FaUmbrella /> Umbrella</option>
                <option value="plane"><FaPlane /> Plane</option>
                <option value="ship"><FaShip /> Ship</option>
                <option value="train"><FaTrain /> Train</option>
                <option value="car"><FaCar /> Car</option>
                <option value="bicycle"><FaBicycle /> Bicycle</option>
                <option value="book"><FaBook /> Book</option>
                <option value="camera"><FaCamera /> Camera</option>
                <option value="palette"><FaPalette /> Palette</option>
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
    </div>
);

export default TrpgStep1;
