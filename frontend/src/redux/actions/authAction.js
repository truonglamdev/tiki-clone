import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from '~/constants/authConstant';
import * as request from '~/utils/request';
const loginUser = (data) => async (dispatch) => {
    const { username, password } = data;
    try {
        dispatch({ type: LOGIN_REQUEST });

        const res = await request.post('auth/login', { email: username, password });
        console.log('check respon data', res);
        dispatch({ type: LOGIN_SUCCESS, payload: res.user });
    } catch (error) {
        dispatch({ type: LOGIN_FAILED, payload: error.response.data.message });
    }
};

export { loginUser };
