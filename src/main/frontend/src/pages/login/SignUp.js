import React, { useState, useEffect } from "react";
import { CommonButton, LoadingComponent } from "../../components";
import { noAuthPostData } from "../../services";
import { useNavigate } from 'react-router-dom';
import { callSendCode } from "../../services";
import styles from "../../styles/styles";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({isValid : false, strength: 0});
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [passwordValid, setPasswordValid] = useState(true);
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [email, setEmail] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [emailDomainMenu, setEmailDomainMenu] = useState();
    const [time, setTime] = useState(295);
    const [isTimerRunning, setTimerRunning] = useState(false);
    const [emailAuthSequence, setEmailAuthSequence] = useState(false);
    const [authCode, setAuthCode] = useState('');
    const [authCodeCheck, setAuthCodeCheck] = useState(false);
    const [nickname, setNickname] = useState('');
    const [nicknameCheck, setNicknameCheck] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingTitle, setLoadingTitle] = useState("");


    useEffect(() => {
        setPasswordCheck(isSamePassword());
        setPasswordValid(isValidPassword());
        setPasswordStrength(isSecurePassword());
    }, [password])

    useEffect(() => {
        setPasswordCheck(isSamePassword());
    }, [password2])

    useEffect(() => {
        setNicknameCheck(false);
    }, [nickname])

    useEffect(() => {
        setAuthCodeCheck(false);
    },[email, emailDomain])

    useEffect(() => {
        let timerInterval;

        if (isTimerRunning && time > 0) {
            timerInterval = setInterval(() => {
                setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            if (time === 0) {
                console.log("타이머 종료");
                setTimerRunning(false);
                setEmailAuthSequence(false);
            }
        }

        return () => {
            clearInterval(timerInterval);
            timerInterval = null; // 초기화
        };
    }, [isTimerRunning, time]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} : ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        console.log(`버튼 눌림\nID : ${email}@${emailDomain}\nPassword : ${password}`);

        if(passwordCheck && passwordValid && authCodeCheck && nicknameCheck && passwordStrength.isValid) {
            const items = {
                email: email + "@" + emailDomain,
                nickname: nickname,
                password: password
            }

            const response = await noAuthPostData(items, 'api/auth/register');
            if(response.status === true) {
                console.log(response.data);
                alert("회원가입 완료!");
                navigate("/login");
            } else {
                alert("에러 발생!");
            }
        } else {
            console.log("뭔가 잘못된");
        }
    }

    const isCorrectEmail = () => {
        const regex = /^[A-Za-z0-9.]+$/;
        if(regex.test(email) && (regex.test(emailDomain))) {
            console.log("이메일 적합");
            return true;
        } else {
            console.log("이메일 부적합");
            return false;
        }
    }

    const isCorrectNickname = () => {
        const regex = /^[A-Za-z0-9ㄱ-힣]+$/;
        if(regex.test(nickname) && !(/s/.test(nickname))) {
            if(nickname.length < 7) {
                console.log(nickname.length);
                console.log("닉네임 적합");
                return true;
            } else {
                return false;
            }
        } else {
            console.log("닉네임 부적합");
            return false;
        }
    }

    const isValidPassword = () => {
        const regex = /\/\//;
        return !regex.test(password) // //포함 시 false, 미 포함시 true
    }

    const isSecurePassword = () => {
        const hasMinLength = password.length >= 8;
        const hasMixedCharacters = /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password);
        const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        let isValid = true;
        let strength = 0;

        if (!hasMinLength) {
            isValid = false;
        } else {
            if (hasMixedCharacters) strength++;
            if (hasSpecialCharacters) strength++;
        }

        return { isValid, strength };
    }

    const isSamePassword = () => {
        if (password === password2) {
            return !((password.replaceAll("\\s", "").length === 0) && (password2.replaceAll("\\s", "").length === 0));
        } else {
            return false;
        }
    }

    const handleSendCode = async () => {
        if(!isCorrectEmail()) {
            alert("형식에 맞지 않는 이메일입니다.");
            return;
        }
        setLoadingTitle("메일 전송중...");
        setIsLoading(true);
        const items = {
            receiver: email + "@" + emailDomain
        }
        const response = await callSendCode(items);
        if(response.status === true) {
            if(response.data === false) {
                setIsLoading(false);
                alert("이미 사용중인 이메일입니다.");
            } else {
                setTime(290);
                setTimerRunning(true);
                setEmailAuthSequence(true);
            }
        } else {
            alert("메일 발송중 오류발생");
        }
        setIsLoading(false);
    }

    const handleCheckNickname = async () => {
        if(!isCorrectNickname()) {
            alert("형식에 맞지 않는 닉네임입니다.");
            return;
        }

        const response = await noAuthPostData({
            nickname: nickname
        }, "api/auth/checkNickname");
        if(response.status === true) {
            if(response.data === true) {
                setNicknameCheck(true);
            } else{
                alert("중복 닉네임입니다.");
                setNicknameCheck(false);
            }
        } else {
            alert("요청중 오류 발생");
        }
    }

    const handleAuthCodeCheck = async () => {
        const items = {
            receiver: email + "@" + emailDomain,
            authCode: authCode
        }
        const response = await noAuthPostData(items, "api/auth/emailCode");
        if(response.status) {
            console.log(response.status)
            if(response.data) {
                console.log(response.data)
                setTimerRunning(false);
                setAuthCodeCheck(true);
            }
        }
    }

    const handleVisiblePassword = () => {
        setVisiblePassword(!visiblePassword);
    }

    return (
        <>
            <LoadingComponent
                visible={isLoading}
                items = {{
                    title: loadingTitle
                }}
                fonts = {styles.middleFont("black", "bold")}
            />
            <div style = {{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 30, border: "2px solid #000099"}}>
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
                                            minWidth: "215px",
                                            marginRight: 10,
                                            width: "20vw",
                                            height: 30,
                                            fontSize: 18
                                        }}
                                        value={authCode}
                                        onChange={(e) => setAuthCode(e.target.value)}
                                        placeholder="인증 번호"
                                    />
                                    {!authCodeCheck ?<CommonButton
                                        handleClick={handleAuthCodeCheck}
                                        items={{title: "인증"}}
                                        styles={{
                                            width: "10vw",
                                            minWidth: "100px",
                                            height: 32,
                                            backgroundColor: '#0099FF',
                                            color: 'white',
                                            border: 'none'
                                        }}
                                        fonts={{
                                            fontSize: '18px',
                                            fontWeight: 'bold'
                                        }}
                                    /> :
                                        <div
                                            style={{
                                                display:"flex",
                                                alignItems:"center",
                                                justifyContent:"center",
                                                width: "10vw",
                                                minWidth: "100px",
                                                height: 32,
                                                backgroundColor: '#009900',
                                                color: 'white',
                                                border: 'none',
                                                fontSize: '18px',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            완료
                                        </div>}
                                </div>
                                <div>
                                    남은 시간 {formatTime(time)}
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
                            {(nicknameCheck === true) ?
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 100,
                                        height: 32,
                                        backgroundColor: '#009900',
                                        color: 'white',
                                        border: 'none',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    확인 완료
                                </div> :
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

                            }
                        </div>
                        <div style={{
                            marginTop: 2,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <div style={styles.tinyFont("black", "none",)}>
                                한글, 영어, 숫자 포함 최대 6자 까지 가능합니다.
                            </div>
                            <div style={styles.tinyFont("black", "none",)}>
                                공백 및 특수문자는 포함할 수 없습니다.
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop: 10, marginBottom: 10, display: "flex", flexDirection: "column"}}>
                        <div style = {{display: "flex", flexDirection: "row"}}>
                            <div>
                                비밀번호
                            </div>
                            <div style = {{display: "flex", alignItems: "center", ...styles.tinyFont("black", "none")}}>
                                <input
                                    type="checkbox"
                                    checked={visiblePassword}
                                    onChange={handleVisiblePassword}
                                />
                                보이기
                            </div>
                        </div>
                        <input
                            type={visiblePassword ? 'text' : 'password'}
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
                        <div style={{display: "flex", flexDirection: "row", ...styles.smallFont("black", "none")}}>
                            <div>
                                비밀번호 안전도 :
                            </div>
                            {(passwordStrength.isValid === true) ?
                                <>
                                    <div
                                        style={{
                                            marginLeft: 5,
                                            color: (() => {
                                                switch (passwordStrength.strength) {
                                                    case 0 :
                                                        return "red"; // 취약일 때 빨간색
                                                    case 1:
                                                        return "orange"; // 보통일 때 주황색
                                                    case 2:
                                                        return "green"; // 안전일 때 초록색
                                                    default:
                                                        return "black"; // 기본값
                                                }
                                        })()
                                    }}>
                                        {/* 강도에 따른 글자 표시 */}
                                        {(() => {
                                            switch (passwordStrength.strength) {
                                                case 0:
                                                    return "취약";
                                                case 1:
                                                    return "보통";
                                                case 2:
                                                    return "안전";
                                                default:
                                                    return "모름";
                                            }
                                        })()}
                                    </div>
                                </> :
                                <></>
                            }
                        </div>
                    </div>
                    <div style={{marginTop: 10, marginBottom: 10, display: "flex", flexDirection: "column"}}>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <div>
                                비밀번호 확인
                            </div>
                            {(password2.length !== 0) ? <div
                                style = {{
                                    marginLeft :5,
                                    color: (() => {
                                    if(passwordCheck) return "green";
                                    else return "red";
                                    })()
                                }}
                            >
                                    {(() => {
                                        if(passwordCheck) return "일치";
                                        else return "불일치";
                                    })()}
                            </div> :
                                <></>
                            }
                        </div>
                        <input
                            type={visiblePassword ? 'text' : 'password'}
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
                </div>
            </div>
        </>
    );

}
export default SignUpPage;