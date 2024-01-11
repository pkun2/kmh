import React, {useState} from "react";
import CommonButton from "../../components/CommonButton";
import axios from "axios";
import styles from "../../styles/styles";

const LoginPage = () => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log(`버튼 눌림\nNickname : ${nickname}\nE-Mail : ${email}\nPassword : ${password}`);

        const item = {
            nickname: nickname,
            email: email,
            password: password
        }

        try {
            const response = await axios.post('http://localhost:8080/register', item);
            console.log(response.data);
        } catch (error) {
            console.error('Error sending data: ', error);
        }
    }
    return (
        <>
            <div style={{width: 600, height: 300, border: "2px solid #000099", borderRadius: 2, padding: 100}}>
                <h2>LOGIN</h2>
                <div>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=" E-Mail"
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
                    handleClick={handleLogin}
                    items={{title: "로그인"}}
                    styles={{width: 304, height: 50, backgroundColor: '#000099', color: 'white', border: 'none'}}
                    fonts={{fontSize: '25px', fontWeight: 'bold'}}
                />
                <div style={{marginTop: 10, width: 304, height: 1, backgroundColor: "black"}}>
                </div>
                <div>

                </div>
            </div>
        </>
    );
}
export default LoginPage;
