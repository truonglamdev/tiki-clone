import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { generateAccessToken, generateRefreshToken } from './jwtService.js';
import sendEmailMessage from '../utils/sendEmailMessage.js';

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
            user: userExist,
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    } catch (error) {
        return error;
    }
};

const updateUserService = async (id, data) => {
    try {
        const userExist = await User.findOne({ _id: id }).select('-password');
        if (userExist === null) {
            return { status: 'ERR', message: 'User not found' };
        }

        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true }).select('-password');
        if (!updatedUser) {
            return { status: 'ERR', message: 'Failed to update user' };
        }
        return {
            status: 'OK',
            message: 'User updated successfully',
            data: updatedUser,
        };
    } catch (error) {
        return error;
    }
};

const deleteUserService = async (id) => {
    try {
        const userExist = await User.findById(id);
        if (!userExist) {
            return {
                status: 'ERR',
                message: 'User not found',
            };
        }

        await User.findByIdAndDelete(id);

        return { status: 'OK', message: 'User deleted successfully' };
    } catch (error) {
        return error;
    }
};
const getDetailUserService = async (id) => {
    try {
        const userExist = await User.findOne({ _id: id });
        if (!userExist) {
            return {
                status: 'ERR',
                message: 'User not found',
            };
        }
        return {
            status: 'OK',
            message: 'Success',
            data: userExist,
        };
    } catch (error) {
        return error;
    }
};

const getAllUsersService = async () => {
    try {
        const allUser = await User.find().sort({ createdAt: -1, updatedAt: -1 });
        return {
            status: 'OK',
            message: 'Success',
            data: allUser,
        };
    } catch (error) {
        return error;
    }
};

const forgotPasswordService = async (payload) => {
    try {
        const user = await User.findOne({ email: payload.email });
        if (!user) {
            return {
                status: 'ERR',
                message: 'User not found',
            };
        }

        user.generateResetPasswordToken();
        await user.save({ validateBeforeSave: false });
        const resetPasswordUrl = `http://localhost:3001/api/v1/password/reset/${user.resetPasswordToken}`;
        const message = `Your password reset token is: ${resetPasswordUrl}. If you have not requested this email, please ignore it.`;
        const response = await sendEmailMessage({ email: payload.email, subject: `Tiki Password Recovery`, message });
        return response;
    } catch (error) {
        const user = await User.findOne({ email: payload.email });
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        // Save user changes
        await user.save({ validateBeforeSave: false });
        return error;
    }
};

const resetPasswordService = async (token, user) => {
    try {
        const userExists = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!userExists) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const hashPassword = await bcrypt.hash(user.password, 10);
        userExists.password = hashPassword;
        userExists.resetPasswordToken = undefined;
        userExists.resetPasswordExpires = undefined;
        await userExists.save();
        return {
            status: 'OK',
            message: 'Reset Password successfully',
        };
    } catch (error) {
        return error;
    }
};

export {
    createUserService,
    loginUserService,
    updateUserService,
    deleteUserService,
    getDetailUserService,
    getAllUsersService,
    forgotPasswordService,
    resetPasswordService,
};
