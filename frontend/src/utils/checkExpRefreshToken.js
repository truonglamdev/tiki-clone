import { jwtDecode } from 'jwt-decode';

const checkExpRefreshToken = (refreshToken) => {
    const decoded = jwtDecode(refreshToken);
    const currentTime = Date.now();
    if (decoded.exp < currentTime.getTime()) {
        return false;
    }
    return true;
};

export default checkExpRefreshToken;
