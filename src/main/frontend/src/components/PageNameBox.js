import React from "react";

const PageNameBox = ({items, styles, handleClick}) => {
    const boxStyles = {
        ...styles,
        cursor: "pointer",
        display: "inline-block",
    };

    return (
        <>
            <div style={boxStyles} onClick={handleClick}
            >
                {items.title}
            </div>
        </>
    )
}

export default PageNameBox;