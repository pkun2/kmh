// src/reducers/sessionReducer.js
const initialState = {
    user: null,
    isAuthenticated: false,
    timeoutId: null,
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_SESSION':
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                timeoutId: action.payload.timeoutId,
            };
        case 'LOGOUT':
            // 타임아웃 클리어
            clearTimeout(state.timeoutId);
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                timeoutId: null,
            };
        default:
            return state;
    }
};

export default sessionReducer;