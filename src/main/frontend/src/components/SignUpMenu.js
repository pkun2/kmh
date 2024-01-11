import React from "react"
const SignUpMenu = ({currentMenu, outStyles, inStyles, fonts}) => {
    const menu = ["약관 동의", "정보 입력", "본인 인증", "가입 완료"];
    const combinedStyles = {...inStyles, ...fonts};

    return (
        <>
            <div style = {outStyles}>
                {menu.map((item, index) => (
                    <div style = {inStyles} key={index}>{item}</div>
                ))}
            </div>
        </>
    )
}

export default SignUpMenu;