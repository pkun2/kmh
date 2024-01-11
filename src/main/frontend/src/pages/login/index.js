import React, {useState} from "react";
import CommonButton from "../../components/CommonButton";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        console.log('로그인 시도:', username, password);
        // 여기에 로그인 로직 추가 (예: API 호출)
    };

    return (
        <>
            <div style = {{height:200}}></div>
            <div style = {{width: 600, height:200, border: "2px solid #000099", borderRadius: 2, padding: 100}}>
                <h2>LOGIN</h2>
                <div>
                    <input
                        type="text"
                        style = {{border: 'none', backgroundColor: "#DDDDDD", width: 300, height: 50, fontSize: 18}}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder = " ID"
                    />
                </div>
                <div style = {{marginTop: 10, marginBottom: 10}}>
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
            </div>
        </>
    );
}
export default LoginPage;
