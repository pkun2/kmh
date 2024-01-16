import React, { useState, useEffect } from 'react';

const TrpgStep4 = ({ userInfo, content, prompt, handlePrevStep }) => {
    const [apiData, setApiData] = useState(null);

    // useEffect를 사용하여 API 호출
    useEffect(() => {
        // 여기에 실제 API 호출 로직을 추가하세요.
        // 예: fetch 또는 axios를 사용하여 API에 요청
        // API에서 반환한 데이터를 setApiData로 설정
        // 예: fetch('/api/data')
        //   .then(response => response.json())
        //   .then(data => setApiData(data))
        //   .catch(error => console.error('API 호출 오류:', error));
    }, [userInfo, content, prompt]);

    return (
        <div>
            <h2>스텝 4: API 연동</h2>
            <div>
                {/* API에서 받은 데이터를 표시 */}
                {apiData && (
                    <div>
                        <p>API에서 받은 데이터:</p>
                        {/* 여기에 API 데이터를 표시하는 코드를 추가하세요 */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrpgStep4;
