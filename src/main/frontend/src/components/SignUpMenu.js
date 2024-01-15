import React from "react"
const SignUpMenu = ({currentMenu}) => {
    const menu = ["약관 동의", "정보 입력", "본인 인증", "가입 완료"];

    return (
        <>
            <div style = {{display: "flex", justifyContent: "center", width: 800, height: 50, border: "2px solid #000099", borderRadius: 10}}>
                {menu.map((item, index) => (
                    <div
                        style = {{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 200,
                            height: 50,
                            backgroundColor: (index === currentMenu) ? "#000099" : "none",
                            borderLeft: (index === 0) ? "none" : "2px solid #000099",
                            borderTopRightRadius: (index === 4) ? 8 : 0,
                            borderBottomRightRadius: (index === 4) ? 8 : 0,
                            borderTopLeftRadius: (index === 0) ? 8 : 0,
                            borderBottomLeftRadius : (index === 0) ? 8 : 0,
                            color: (index === currentMenu) ? "white" : "black",
                            fontSize: 18,
                            fontWeight: "bold",
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </>
    )
}

export default SignUpMenu;