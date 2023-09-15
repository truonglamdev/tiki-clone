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

export { generateAccessToken, generateRefreshToken };
