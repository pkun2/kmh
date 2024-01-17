import {PageNameBox} from "./";
import React from "react";
const CommentBox = ({items}) => {
    return (
        <>
            <div>
                <PageNameBox
                    items = {{title : "전체 댓글"}}
                    styles={{
                        paddingTop: "5vh",
                        paddingBottom: 5,
                        borderBottom: "2px solid #000099",
                        fontWeight: "bold",
                        fontSize: 14
                    }}
                />
                <div style={{
                    alignItems: "center",
                    paddingTop: 2,
                    paddingBottom: 2,
                    fontSize: 10,
                }}
                >
                    {items.map((item, index) => (
                        <div style = {{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: "1px solid #AAAAAA",
                            paddingTop: 2,
                            paddingBottom: 2,
                            fontSize: 11,
                        }}
                             key = {index}
                        >
                            <div style = {{
                                display: "flex",
                                width: "15%",
                                justifyContent:"center",
                                borderRight: "1px solid #AAAAAA",
                            }}
                            >
                                {item.nickname}
                            </div>
                            <div style = {{
                                display: "flex",
                                width: "65%",
                                paddingLeft: "1%",
                                borderRight: "1px solid #AAAAAA"
                            }}
                            >
                                {item.content}
                            </div>
                            <div style = {{
                                display: "flex",
                                width: "20%",
                                justifyContent:"center",
                            }}
                            >
                                {item.time}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default CommentBox;