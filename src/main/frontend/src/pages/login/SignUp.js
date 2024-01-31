import React, {useState} from "react";
import { CommonButton, SignUpMenu } from "../../components";
import { postData } from "../../services";
import { useNavigate } from 'react-router-dom';
import { callSendCode } from "../../services";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [email, setEmail] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [emailAuthSequence, setEmailAuthSequence] = useState(false);
    const [emailCheck, setEmailCheck] = useState(false);
    const [nickname, setNickname] = useState('');
    const [nicknameCheck, setNicknameCheck] = useState(false);
    const [currentMenu, setCurrentMenu] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const handleSignUp = async (event) => {
        event.preventDefault();
        console.log(`버튼 눌림\nID : ${email}@${emailDomain}\nPassword : ${password}`);

        const items = {
            email: email + "@" + emailDomain,
            nickname: nickname,
            password: password
        }

        const response = await postData(items, 'api/auth/register');
        console.log(response);
    }

    const isCorrectEmail = () => {
        return true
    }

    const isSecurePassword = () => {
        return false;
    }

    const isSamePassword = () => {
        return false;
    }

    const handleSendCode = async () => {
        console.log("인증 메일 발송 버튼 눌림");
        // 이메일 유효 검증 과정 필요
        const items = {
            receiver: email + "@" + emailDomain
        }
        const response = await callSendCode(items);
        if(response.status === true) {
            setEmailAuthSequence(true);
        } else {
            console.log("에러남");
            alert("메일 안보내짐");
        }
    }

    const handleAuthenticationCode = () => {
        console.log("인증 버튼 눌림");
    }

    return (
        <>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <div style={{marginTop: 10, marginBottom: 10, display: "flex", flexDirection: "column"}}>
                    E-Mail
                    <div>
                        <input
                            type="text"
                            style={{
                                border: "1px solid black",
                                backgroundColor: "#DDDDDD",
                                width: "10vw",
                                minWidth: "100px",
                                height: 30,
                                fontSize: 18
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=" E-Mail"
                        />
                        <input
                            type="text"
                            style={{
                                border: "1px solid black",
                                marginLeft: "5px",
                                backgroundColor: "#DDDDDD",
                                minWidth: "100px",
                                width: "10vw",
                                height: 30,
                                fontSize: 18
                            }}
                            value={emailDomain}
                            onChange={(e) => setEmailDomain(e.target.value)}
                            placeholder=" 이메일 선택"
                        />
                        <input
                            type="text"
                            style={{
                                border: "1px solid black",
                                marginLeft: "5px",
                                backgroundColor: "#DDDDDD",
                                minWidth: "100px",
                                width: "10vw",
                                height: 30,
                                fontSize: 18
                            }}
                            value={emailDomain}
                            onChange={(e) => setEmailDomain(e.target.value)}
                            placeholder=" 직접 입력"
                        />
                    </div>
                </div>
                {(emailAuthSequence === true) ?
                    <div style={{marginTop: 10, marginBottom: 10, display: "flex", flexDirection: "column"}}>
                    인증 번호
                        <div style = {{display: "flex", alignItems: "center"}}>
                            <input
                                type="text"
                                style={{
                                    border: "1px solid black",
                                    backgroundColor: "#DDDDDD",
                                    minWidth: "216px",
                                    width: "20vw",
                                    height: 30,
                                    fontSize: 18
                                }}
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder=" Nickname"
                            />
                            <CommonButton
                                handleClick={handleAuthenticationCode}
                                items={{title: "인증"}}
                                styles={{
                                    width: "10vw",
                                    minWidth: "100px",
                                    marginLeft: "5px",
                                    height: 34,
                                    backgroundColor: '#0099FF',
                                    color: 'white',
                                    border: 'none'
                                }}
                                fonts={{
                                    fontSize: '18px',
                                    fontWeight: 'bold'
                                }}
                            />
                        </div>
                    남은 시간 :
                    </div> :
                    <CommonButton
                        handleClick={handleSendCode}
                        items={{title: "인증 메일 발송"}}
                        styles={{width: 316, height: 30, backgroundColor: '#0099FF', color: 'white', border: 'none'}}
                        fonts={{fontSize: '18px', fontWeight: 'bold'}}
                    />
                }
                <div style={{marginTop: 10, marginBottom: 10, display: "flex", flexDirection: "column"}}>
                    닉네임 (최대 6자)
                    <input
                        type="text"
                        style={{
                            border: "1px solid black",
                            backgroundColor: "#DDDDDD",
                            minWidth: "316px",
                            width: "15vw",
                            height: 30,
                            fontSize: 18
                        }}
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder=" Nickname"
                    />
                </div>
                <div style={{marginTop: 10, marginBottom: 10, display: "flex", flexDirection: "column"}}>
                    비밀번호
                    <input
                        type="text"
                        style={{border: "1px solid black", backgroundColor: "#DDDDDD", width: "15vw", height: 30, fontSize: 18}}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=" Password"
                    />
                    <div>
                        보안 :
                    </div>
                </div>
                <div style={{marginTop: 10, marginBottom: 10, display: "flex", flexDirection: "column"}}>
                    비밀번호 확인
                    <input
                        type="text"
                        style={{border: "1px solid black", backgroundColor: "#DDDDDD", width: "15vw", height: 30, fontSize: 18}}
                        value={password2}
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
        </>
    );

}
export default SignUpPage;