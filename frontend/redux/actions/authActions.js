import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authStart = () => {
    return {
        type: 'AUTH_START',
    };
};

export const authSuccess = (user, token) => {
    return {
        type: 'AUTH_SUCCESS',
        payload: { user, token },
    };
};

export const authFail = (error) => {
    return {
        type: 'AUTH_FAIL',
        payload: error,
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT',
    };
};

export const signup = (email, password) => {
    return async (dispatch) => {
        dispatch(authStart());
        try {
            const response = await axios.post(`${API_URL}/graphql`, {
                query: `
          mutation {
            createAccount(email: "${email}", password: "${password}") {
              id
              email
            }
          }
        `,
            });
            const { id, email: userEmail } = response.data.data.createAccount;
            const tokenResponse = await axios.post(`${API_URL}/api/login`, {
                email: userEmail,
                password,
            });
            dispatch(authSuccess({ id, email: userEmail }, tokenResponse.data.token));
        } catch (error) {
            dispatch(authFail(error.response.data));
        }
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        dispatch(authStart());
        try {
            const response = await axios.post(`${API_URL}/api/login`, {
                email,
                password,
            });
            dispatch(authSuccess(response.data.user, response.data.token));
        } catch (error) {
            dispatch(authFail(error.response.data));
        }
    };
};
