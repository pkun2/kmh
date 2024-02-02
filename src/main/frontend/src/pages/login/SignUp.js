import React, { useState, useEffect } from "react";
import { CommonButton, SignUpMenu } from "../../components";
import { noAuthPostData } from "../../services";
import { useNavigate } from 'react-router-dom';
import { callSendCode } from "../../services";
import styles from "../../styles/styles";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [email, setEmail] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [emailDomainMenu, setEmailDomainMenu] = useState(0);
    const [emailAuthSequence, setEmailAuthSequence] = useState(false);
    const [authCode, setAuthCode] = useState();
    const [authCodeCheck, setAuthCodeCheck] = useState(false);
    const [emailCheck, setEmailCheck] = useState(false);
    const [nickname, setNickname] = useState('');
    const [nicknameCheck, setNicknameCheck] = useState(false);
    const [currentMenu, setCurrentMenu] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setPasswordCheck(isSamePassword(password, password2));
    }, [password, password2]);

    useEffect(() => {
        setNicknameCheck(false);
    }, [nickname])

    const handleSignUp = async (event) => {
        event.preventDefault();
        console.log(`버튼 눌림\nID : ${email}@${emailDomain}\nPassword : ${password}`);

        const items = {
            email: email + "@" + emailDomain,
            nickname: nickname,
            password: password
        }

        const response = await noAuthPostData(items, 'api/auth/register');
        console.log(response);
    }

    const isCorrectEmail = () => {
        return true
    }

    const isSecurePassword = () => {
        return false;
    }

    const isSamePassword = (pw1, pw2) => {
        if (pw1 === pw2) {
            if((pw1.replaceAll("\\s", "").length === 0) && (pw2.replaceAll("\\s", "").length === 0)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    const handleSendCode = async () => {
        console.log("인증 메일 발송 버튼 눌림");
        // 이메일 유효 검증 과정 필요 return;
        const items = {
            receiver: email + "@" + emailDomain
        }
        const response = await callSendCode(items);
        if(response.status === true) {
            if(response.data === false) {
                alert("이메일이 형식이 잘못되었거나, 이미 사용중인 이메일입니다.");
            } else {
                setEmailAuthSequence(true);
            }
        } else {
            alert("메일 발송중 오류발생");
        }
    }

    const handleAuthenticationCode = () => {
        console.log("인증 버튼 눌림");
    }

    const handleCheckNickname = async () => {
        const response = await noAuthPostData({
            nickname: nickname
        }, "api/auth/checkNickname");
        if(response.status === true) {
            if(response.data === true) {
                setNicknameCheck(true);
            } else{
                setNicknameCheck(false);
                // 닉네임 중복, 화면에 표시과정 필요할듯
            }
        } else {
            alert("요청중 오류 발생");
        }
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
                                fontSize: 18,
                                marginRight: "2px"
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=" E-Mail"
                        />
                        @
                        <input
                            type="text"
                            style={{
                                border: "1px solid black",
                                marginLeft: "2px",
                                backgroundColor: "#DDDDDD",
                                minWidth: "200px",
                                width: "20vw",
                                height: 30,
                                fontSize: 18
                            }}
                            value={emailDomain}
                            onChange={(e) => setEmailDomain(e.target.value)}
                            placeholder=" 직접 입력"
                        />
                    </div>
                </div>
                <div style={{ marginTop: 10, marginBottom: 10, height: 50, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    {(emailAuthSequence === true) ?
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div>
                                인증 번호
                            </div>
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
                                    placeholder=""
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
                            <div>
                                남은 시간 :
                            </div>
                        </div> :
                        <CommonButton
                            handleClick={handleSendCode}
                            items={{title: "인증 메일 발송"}}
                            styles={{
                                width: "30vw",
                                minWidth: "330px",
                                height: 30,
                                backgroundColor: '#0099FF',
                                color: 'white',
                                border: 'none',

                            }}
                            fonts={{fontSize: '18px', fontWeight: 'bold'}}
                        />
                    }
                </div>
                <div style={{marginTop: 10, marginBottom: 10, display: "flex", flexDirection: "column"}}>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div>
                            닉네임
                        </div>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <input
                            type="text"
                            style={{
                                border: "1px solid black",
                                backgroundColor: "#DDDDDD",
                                minWidth: "215px",
                                width: "15vw",
                                height: 30,
                                fontSize: 18,
                                marginRight: 10
                            }}
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder=" Nickname"
                        />
                        <CommonButton
                            handleClick={handleCheckNickname}
                            items={{title: "중복 확인"}}
                            styles={{
                                width: 100,
                                height: 32,
                                backgroundColor: '#0099FF',
                                color: 'white',
                                border: 'none'
                            }}
                            fonts={{fontSize: '18px', fontWeight: 'bold'}}
                        />
                    </div>
                    <div style={{
                        marginTop: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div style={styles.tinyFont("black", "none",)}>
                            최대 한글 6자, 영어 12자까지 가능합니다.
                        </div>
                        <div style={styles.tinyFont("black", "none",)}>
                            특수문자는 포함할 수 없습니다.
                        </div>
                    </div>
                </div>
                <div style={{marginTop: 10, marginBottom: 10, display: "flex", flexDirection: "column"}}>
                    <div>
                        비밀번호
                    </div>
                    <input
                        type="text"
                        style={{
                            border: "1px solid black",
                            backgroundColor: "#DDDDDD",
                            minWidth: "325px",
                            width: "15vw",
                            height: 30,
                            fontSize: 18
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=" PW"
                    />
                    <div>
                        보안 :
                    </div>
                </div>
                <div style={{marginTop: 10, marginBottom: 10, display: "flex", flexDirection: "column"}}>
                    <div>
                        비밀번호 확인
                    </div>
                    <input
                        type="text"
                        style={{
                            border: "1px solid black",
                            backgroundColor: "#DDDDDD",
                            minWidth: "325px",
                            width: "15vw",
                            height: 30,
                            fontSize: 18
                        }}
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder=" PW"
                    />
                </div>
                <CommonButton
                    handleClick={handleSignUp}
                    items={{title: "회원가입"}}
                    styles={{width: 330, height: 50, backgroundColor: '#000099', color: 'white', border: 'none'}}
                    fonts={{fontSize: '25px', fontWeight: 'bold'}}
                />
                <div style={{marginTop: 10, width: 330, height: 1, backgroundColor: "black"}}>
                </div>
            </div>
        </>
    );

}
export default SignUpPage;