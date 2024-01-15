import React, { useState } from "react";

const DropDownBox = ({handleClick, items, boxStyles, dropStyles, boxFonts, dropsFonts}) => {
    const [isHovering, setIsHovering] = useState(false);

    const inStyles = {
        dropdown: {
            position: 'relative',
            display: 'inline-block',
        },
        dropbtn: {
            backgroundColor: "#000099",
            color: 'white',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
            ...boxStyles,
            boxFonts
        },
        dropdownContent: {
            display: isHovering ? 'block' : 'none',
            position: 'absolute',
            backgroundColor: '#f9f9f9',
            minWidth: '160px',
            boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
            zIndex: 1
        },
        link: {
            color: 'black',
            padding: '12px 16px',
            textDecoration: 'none',
            display: 'block'
        }
    };

    return (
        <div style={inStyles.dropdown}
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}
        >
            <button style={inStyles.dropbtn}>Channel</button>
            <div style={inStyles.dropdownContent}>
                <a href="#" style={inStyles.link}>Link 1</a>
                <a href="#" style={inStyles.link}>Link 2</a>
                <a href="#" style={inStyles.link}>Link 3</a>
            </div>
        </div>
    );
}

export default DropDownBox;