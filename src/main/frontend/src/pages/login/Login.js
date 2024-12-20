import React, {useState} from "react";
import { CommonButton, TextInput } from "../../components";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles from "../../styles/styles";
import { callLogin, useSession } from "../../services";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { startTimer } = useSession();

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log(`버튼 눌림\nEmail : ${email}\nPassword : ${password}`);

        const items = {
            email: email,
            password: password
        }

        const response = await callLogin(items);
        if(response.status === true) {
            startTimer();
            window.location.href = "/home"
        } else {
            // 로그인 실패 로직
        }
        console.log(response);
    }

    const handleSignUp = () => {
        console.log("회원가입");
        navigate("/SignUp");
    }

    return (
        <>
            <div style = {{display:"flex", alignItems:"center", justifyContent:"center", height: "100vh"}}>
                <div style={{display: "flex", width: 600, height: 400, border: "2px solid #000099", borderRadius: 2}}>
                    <div style={{width: "55%", paddingLeft: "5%"}}>
                        <h2>LOGIN</h2>
                        <div style={{marginTop: 10, marginBottom: 10}}>
                            <input
                                type="text"
                                style={{
                                    border: 'none',
                                    backgroundColor: "#DDDDDD",
                                    width: 300,
                                    height: 50,
                                    fontSize: 18
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder=" E-Mail"
                            />
                        </div>
                        <div style={{marginTop: 10, marginBottom: 10}}>
                            <input
                                type="password"
                                style={{
                                    border: 'none',
                                    backgroundColor: "#DDDDDD",
                                    width: 300,
                                    height: 50,
                                    fontSize: 18
                                }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=" Password"
                            />
                        </div>
                        <CommonButton
                            handleClick={handleLogin}
                            items={{title: "로그인"}}
                            styles={{width: 304, height: 50, backgroundColor: '#000099'}}
                            fonts={{color: "white", fontSize: '25px', fontWeight: 'bold'}}
                        />
                        <div style={{marginTop: 10, width: 304, height: 1, backgroundColor: "black"}}>
                        </div>
                        <div style={{marginTop: 10, width: 304, display: "flex", justifyContent: "space-between"}}>
                            <div onClick={handleSignUp}>
                                회원가입
                            </div>
                        </div>
                    </div>
                    <div style={{backgroundColor: "#CCCCCC", width: "40%", height: "100%"}}>
                    </div>
                </div>
            </div>
        </>
    );
}
export default LoginPage;
