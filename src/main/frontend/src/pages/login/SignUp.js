import React, {useState} from "react";
import { CommonButton, SignUpMenu } from "../../components";
import { postData } from "../../services";
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [currentMenu, setCurrentMenu] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const handleSignUp = async (event) => {
        event.preventDefault();
        console.log(`버튼 눌림\nID : ${email}\nPassword : ${password}`);

        const items = {
            email: email,
            nickname: nickname,
            password: password
        }

        const response = await postData(items, 'api/auth/register');
        console.log(response);
    }

    const handleClick = () => {
        setCurrentMenu(currentMenu + 1);
    }

    return (
        <>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                회원가입
                <SignUpMenu
                    currentMenu={currentMenu}
                />
                    <div style={{marginTop: 10, marginBottom: 10}}>
                        <input
                            type="text"
                            style={{border: 'none', backgroundColor: "#DDDDDD", width: 300, height: 50, fontSize: 18}}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=" ID"
                        />
                    </div>
                    <div style={{marginTop: 10, marginBottom: 10}}>
                        <input
                            type="text"
                            style={{border: 'none', backgroundColor: "#DDDDDD", width: 300, height: 50, fontSize: 18}}
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder=" Nickname"
                        />
                    </div>
                    <div style={{marginTop: 10, marginBottom: 10}}>
                        <input
                            type="text"
                            style={{border: 'none', backgroundColor: "#DDDDDD", width: 300, height: 50, fontSize: 18}}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=" Password"
                        />
                    </div>
                    <CommonButton
                        handleClick={handleSignUp}
                        items={{title: "회원가입"}}
                        styles={{width: 304, height: 50, backgroundColor: '#000099', color: 'white', border: 'none'}}
                        fonts={{fontSize: '25px', fontWeight: 'bold'}}
                    />
                    <div style={{marginTop: 10, width: 304, height: 1, backgroundColor: "black"}}>
                    </div>
                <button onClick={handleClick}>
                    +
                </button>
            </div>
        </>
    );

}
export default SignUpPage;