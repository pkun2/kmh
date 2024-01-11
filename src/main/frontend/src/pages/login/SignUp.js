import React, {useState} from "react";
import { CommonButton, SignUpMenu } from "../../components";
import axios from "axios";
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

        try {
            const response = await axios.post('http://localhost:8080/register', items);
            console.log(response.data);
            navigate("/login");
        } catch (error) {
            console.error('Error sending data: ', error);
        }
    }

    return (
        <>
            <div style={{display: "flex", width: 600, height: 400, border: "2px solid #000099", borderRadius: 2}}>
                <div style={{width: "55%", paddingLeft: "5%"}}>
                    <h2>SIGN UP</h2>
                    <div style={{marginTop: 10, marginBottom: 10}}>
                        <input
                            type="text"
                            style={{border: 'none', backgroundColor: "#DDDDDD", width: 300, height: 50, fontSize: 18}}
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder=" ID"
                        />
                    </div>
                    <div style={{marginTop: 10, marginBottom: 10}}>
                        <input
                            type="text"
                            style={{border: 'none', backgroundColor: "#DDDDDD", width: 300, height: 50, fontSize: 18}}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                </div>
                <div style={{backgroundColor: "#CCCCCC", width: "40%", height: "100%"}}>
                </div>
            </div>
        </>
    );

}
export default SignUpPage;