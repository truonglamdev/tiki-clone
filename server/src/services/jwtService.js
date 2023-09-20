import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } = process.env;
const generateAccessToken = (payload) => {
    try {
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
        return accessToken;
    } catch (error) {
        console.log('Error generating access token', error);
        throw error;
    }
};

const generateRefreshToken = (payload) => {
    try {
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
        return refreshToken;
    } catch (error) {
        console.log('Error generating refresh token', error);
        throw error;
    }
};

const refreshTokenJwtService = async (token) => {
    try {
        const user = await jwt.verify(token, REFRESH_TOKEN_SECRET);
        if (!user) {
            return {
                status: 'ERR',
                message: 'Refresh token failed',
            };
        }
        const accessToken = await generateAccessToken({
            id: user?.id,
            isAdmin: user?.isAdmin,
        });

        return {
            status: 'OK',
            message: 'SUCCESS',
            accessToken,
        };
    } catch (error) {
        console.log('Error in refreshTokenJwtService', error);
        return {
            status: 'ERR',
            message: 'Refresh token failed',
        };
    }
};

export { generateAccessToken, generateRefreshToken, refreshTokenJwtService };
