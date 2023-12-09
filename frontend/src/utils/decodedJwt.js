import { jwtDecode } from 'jwt-decode';

const checkExpRefreshToken = (refreshToken) => {
    const decoded = jwtDecode(refreshToken);
    const currentTime = Date.now();
    if (decoded.exp < currentTime.getTime()) {
        return false;
    }
    return true;
};

const decodeJwtFunc = (token) => {
    const decoded = jwtDecode(token);
    return decoded;
};

export { checkExpRefreshToken, decodeJwtFunc };
