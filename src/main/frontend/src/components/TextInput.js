import React from "react"
const TextInput = ({handleChange, handleValue, items, styles, fonts}) => {
    const combinedStyles = {...styles, ...fonts};
    const value = handleValue || "";

    return (
        <>
            <div>
                <input
                    type={items.type}
                    value = {value}
                    onChange = {() => handleChange}
                    style={combinedStyles}
                    placeholder={items.title}
                />
            </div>
        </>
    )
}

export default TextInput;