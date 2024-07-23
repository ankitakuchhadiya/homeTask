const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_START':
            return { ...state, loading: true, error: null };
        case 'AUTH_SUCCESS':
            return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
        case 'AUTH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'LOGOUT':
            return { ...state, user: null, token: null };
        default:
            return state;
    }
};

export default authReducer;
