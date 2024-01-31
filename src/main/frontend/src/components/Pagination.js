const Pagination = ({ currentPage, totalPage, onPageChange }) => {
    const startPage = Math.max(1, currentPage - 4);
    const endPage = Math.min(totalPage, startPage + 9);
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", fontSize: 16, margin: 20 }}>
            {currentPage > 5 ? (
                <>
                    <button onClick={() => onPageChange(1)} style={buttonStyle}>{'<<'}</button>
                    <button onClick={() => onPageChange(currentPage - 1)} style={buttonStyle}>{'<'}</button>
                </>
            ) : null}
            {
                pages.map(page => (
                    <button 
                        key={page} 
                        onClick={() => onPageChange(page)} 
                        style={page === currentPage ? activeButtonStyle : (page === totalPage ? lastButtonStyle : buttonStyle)}
                    >
                        {page}
                    </button>
                ))
            }
            {currentPage <= totalPage - 5 ? (
                <>
                    <button onClick={() => onPageChange(currentPage + 1)} style={buttonStyle}>{'>'}</button>
                    <button onClick={() => onPageChange(totalPage)} style={lastButtonStyle}>{'>>'}</button>
                </>
            ) : null}
        </div>
    )
}

// CSS를 분리한 이유: border가 겹치면 굵기가 2배가 되어 보이는 현상 때문
const buttonStyle = {
    padding: '0.5em 1em',
    borderTop: '1px solid #000',
    borderBottom: '1px solid #000',
    borderLeft: '1px solid #000',
    borderRight: 'none',
    borderRadius: '0px',
    backgroundColor: 'transparent',
    cursor: 'pointer'
};

// 마지막의 경우 오른쪽도 채움
const lastButtonStyle = {
    padding: '0.5em 1em',
    border: '1px solid #000',
    borderRadius: '0px',
    backgroundColor: 'transparent',
    cursor: 'pointer'
};

// 선택된 페이지
const activeButtonStyle = { 
    padding: '0.5em 1em',
    border: '1px solid #81C147',
    borderRadius: '0px',
    backgroundColor: '#ced4da', 
};


export default Pagination;
