import React from "react";
import { Icon_Search } from "../assets";

const SearchBox = ({handleChange, handleClick, styles, styles2, onKeyPress}) => {

    const inStyles = {
        display: "flex",
        paddingLeft: "0.5%",
        ...styles,
    }

    const inStyles2 = {
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
        cursor: "pointer",
        width: "5%",
        height: "100%",
        minWidth: 30,
        ... styles2
    }

    return (
        <>
            <div
                style = {inStyles}
            >
                <input
                    style = {{
                        border: "none",
                        width: "99%",
                        fontSize: "100%",
                        outline: "none"
                    }}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Search..."
                    onKeyPress={onKeyPress}
                />
                <div
                    onClick = {handleClick}
                    style={inStyles2}
                >
                    <img src={ Icon_Search } alt="Search" style = {{ width: '80%', height: '80%'}}/>
                </div>
            </div>
        </>
    )
}

export default SearchBox;