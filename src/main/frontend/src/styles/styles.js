const styles = {


    defaultButton : {
        backgroundColor: "#DDDDDD",
        border: "1px soild black",
        padding : 5,
    },
    commentInputBox : {
        width: "100%",
        height: 100,
        resize: "vertical",
        overflowY: "auto"
    },
    commentContent: (width, fontWeight, borderSide, borderWidth, borderColor) => {
        const style = {
            display: "flex",
            width: width,
            justifyContent:"center",
            fontWeight: fontWeight
        };

        if(borderSide === "left") {
            style.borderLeft = `${borderWidth} solid ${borderColor}`;
        } else if(borderSide === "right") {
            style.borderRight = `${borderWidth} solid ${borderColor}`;
        }

        return style;
    },
    commentBox : (fontSize) => ({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #AAAAAA",
        paddingTop: 3,
        paddingBottom: 3,
        fontSize: fontSize,
    }),
    pageNameBox : (fontSize) => ({
        paddingTop: "5vh",
        paddingBottom: 5,
        borderBottom: "2px solid #000099",
        fontWeight: "bold",
        fontSize: fontSize,
    }),
    hugeFont: (color, fontWeight) => ({ // 짱 큰거
        fontSize: 50,
        color: color,
        fontWeight: fontWeight
    }),
    bigFont: (color, fontWeight) => ({ // 2 번째로 큰거
        fontSize: 30,
        color: color,
        fontWeight: fontWeight
    }),
    middleFont: (color, fontWeight) => ({
        fontSize: 18,
        color: color,
        fontWeight: fontWeight
    }),
    smallFont: (color, fontWeight) => ({ // 2 번째로 작은거
        fontSize: 12,
        color: color,
        fontWeight: fontWeight
    }),
    tinyFont: (color, fontWeight) => ({
        fontSize: 10,
        color: color,
        fontWeight: fontWeight
    }),
    postCard: () => ({
        border: "1px solid #ddd",
        marginBottom: 10,
        padding: "10px",
        borderRadius: "5px"
    })
}

export default styles