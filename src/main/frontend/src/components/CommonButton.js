import React from "react"
const CommonButton = ({handleClick, items, styles, fonts}) => {

    const combinedStyles = {border: "none", cursor: "pointer", ...styles, ...fonts}

    return (
        <>
            <button
                onClick = {handleClick}
                style = {combinedStyles}
            >{items.title}</button>
        </>
    )
}

export default CommonButton;