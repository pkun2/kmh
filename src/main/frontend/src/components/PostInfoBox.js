
const PostInfoBox = ({items}) => {
    const formattedDate = new Date(items.createdAt);
    const dateString = formattedDate.toLocaleString("en-US", { timeZone: "Asia/Seoul" });
    
    return (
        <>
            <div style = {{
                    fontSize: 11,
                    borderBottom: "2px solid #AAAAAA"
                }}
            >
                <div
                    style = {{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #DDDDDD",
                        paddingTop: 2,
                        paddingBottom: 2,
                    }}
                >
                    <div
                        style = {{
                            paddingLeft: "1vw",
                            width: "90vw",
                            fontWeight: "bold"
                        }}
                    >
                        {items.title}
                    </div>
                    <div
                        style = {{
                            display:"flex",
                            width: "10vw",
                            borderLeft: "1px solid #DDDDDD",
                            justifyContent:"center"
                        }}
                    >
                        {items.categoryTag}
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        paddingTop: 2,
                        paddingBottom: 2
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingLeft: "1vw",
                            width: "20vw",
                            borderRight: "1px solid #DDDDDD",
                        }}
                    >
                        {items.nickname}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingLeft: "1vw",
                            width: "35vw",
                            borderRight: "1px solid #DDDDDD",
                        }}
                    >
                        {dateString}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingLeft: "1vw",
                            width: "15vw",
                            borderRight: "1px solid #DDDDDD",
                        }}
                    >
                        조회 {items.viewCount}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingLeft: "1vw",
                            width: "15vw",
                            borderRight: "1px solid #DDDDDD",
                        }}
                    >
                        추천 {items.goodCount}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingLeft: "1vw",
                            width: "15vw",
                        }}
                    >
                        비추 {items.badCount}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostInfoBox;