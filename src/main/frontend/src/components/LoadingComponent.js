import React, { useState } from 'react';
import { Loading_Spinner } from "../assets"

const LoadingComponent = ({visible, items, fonts}) => {

    const modalStyle = {
        display: visible ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    };

    const modalContentStyle = {
        position: 'absolute',
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        ...fonts
    };

    return (
        <div>
            <div style={modalStyle}>
                <div style={modalContentStyle}>
                    <p>{items.title}</p>
                    <img
                        src={Loading_Spinner}
                        alt="모달 이미지"
                        style={{maxWidth: '100%', maxHeight: '200px'}}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoadingComponent;