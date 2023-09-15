import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { generateAccessToken, generateRefreshToken } from './jwtService.js';

const createUserService = async (user) => {
    try {
        const { email, password, name, phone } = user;
        const isUserExist = await User.findOne({ email: email });
        if (isUserExist) {
            return { status: 'ERR', message: 'User already exists' };
        }
        //Hash password with bcrypt
        const hashPassword = await bcrypt.hash(password, 10);
        const createNewUser = await User.create({ name, email, password: hashPassword, phone });
        return { status: 'OK', message: 'User created successfully', data: createNewUser };
    } catch (error) {
        return error;
    }
};

const loginUserService = async (user) => {
    try {
        const { email, password } = user;
        const userExist = await User.findOne({ email: email });
        if (userExist === null) {
            return { status: 'ERR', message: 'User not found' };
        }
        const isPasswordCompare = await bcrypt.compare(password, userExist.password);
        if (!isPasswordCompare) {
            return { status: 'ERR', message: 'Password does not match' };
        }
        const accessToken = await generateAccessToken({
            id: userExist.id,
            isAdmin: userExist.isAdmin,
        });

        const refreshToken = await generateRefreshToken({
            id: userExist.id,
            isAdmin: userExist.isAdmin,
        });

        return {
            status: 'OK',
            message: 'Authentication successful',
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    } catch (error) {
        return error;
    }
};

export { createUserService, loginUserService };
