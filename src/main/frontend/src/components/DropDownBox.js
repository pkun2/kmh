import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropDownBox = ({handleClick, items, boxStyles, dropStyles, boxFonts, dropsFonts}) => {
    const [isHovering, setIsHovering] = useState(false);
    const inStyles = {
        dropdown: {
            position: 'relative',
            display: 'inline-block',
        },
        dropbtn: {
            border: 'none',
            cursor: 'pointer',
            ...boxStyles,
            ...boxFonts
        },
        dropdownContent: {
            display: isHovering ? 'block' : 'none',
            position: 'absolute',
            backgroundColor: '#000099',
            border: "1px solid #AAAAAA",
            minWidth: '120px',
            boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
            zIndex: 1
        },
        link: {
            color: 'white',
            cursor: 'pointer',
            padding: "0.5vw 0.5vh",
            textDecoration: 'none',
            display: 'block',
            borderBottom: "1px solid #AAAAAA"
        }
    };

    return (
        <div style={inStyles.dropdown}
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}
        >
            <button style={inStyles.dropbtn}>Channel</button>
            {items && Array.isArray(items.list) && (
                <div style={inStyles.dropdownContent}>
                    {items.list.map((item, index) => (
                        <div key={index} style={inStyles.link} onClick = {() => handleClick(index)}>
                            {item.value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropDownBox;