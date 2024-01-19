import React from "react";

const PageNameBox = ({items, styles}) => {

    return (
        <>
            <div style={styles}
            >
                {items.title}
            </div>
        </>
    )
}

export default PageNameBox;