import React from "react";

const SearchResultBox = ({items, handleClick}) => {

    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #000099",
                paddingTop: 2,
                paddingBottom: 2,
                fontSize: 10,
                fontWeight: "bold"
            }}
            >
                <div style={{
                    display: "flex",
                    width: "10%",
                    justifyContent: "center",
                }}
                >
                    번호
                </div>
                <div style={{
                    display: "flex",
                    width: "5%",
                    justifyContent: "center",
                }}
                >
                    태그
                </div>
                <div style={{
                    display: "flex",
                    width: "55%",
                    justifyContent: "center",
                }}
                >
                    제목
                </div>
                <div style={{
                    display: "flex",
                    width: "15%",
                    justifyContent: "center",
                }}
                >
                    닉네임
                </div>
                <div style={{
                    display: "flex",
                    width: "7.5%",
                    justifyContent: "center",
                }}
                >
                    방문
                </div>
                <div style={{
                    display: "flex",
                    width: "7.5%",
                    justifyContent: "center",
                }}
                >
                    추천
                </div>
            </div>
            {items.map((item, index) => (
                <div style = {{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #AAAAAA",
                    paddingTop: 2,
                    paddingBottom: 2,
                    fontSize: 10,
                    cursor: "pointer"
                }}
                     key = {index}
                     onClick = {() => handleClick(index)}
                >
                    <div style = {{
                        display: "flex",
                        width: "10%",
                        justifyContent:"center",
                    }}
                    >
                        {item.number}
                    </div>
                    <div style = {{
                        display: "flex",
                        width: "5%",
                        justifyContent:"center",
                    }}
                    >
                        {item.tag}
                    </div>
                    <div style = {{
                        display: "flex",
                        width: "55%",
                        justifyContent:"center",
                    }}
                    >
                        {item.title}
                    </div>
                    <div style = {{
                        display: "flex",
                        width: "15%",
                        justifyContent:"center",
                    }}
                    >
                        {item.nickname}
                    </div>
                    <div style = {{
                        display: "flex",
                        width: "7.5%",
                        justifyContent:"center",
                    }}
                    >
                        {item.view}
                    </div>
                    <div style = {{
                        display: "flex",
                        width: "7.5%",
                        justifyContent:"center",
                    }}
                    >
                        {item.like}
                    </div>
                </div>
            ))}
        </>
    )
}

export default SearchResultBox;