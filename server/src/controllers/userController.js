import yup from 'yup';
import {
    createUserService,
    loginUserService,
    updateUserService,
    deleteUserService,
    getDetailUserService,
    getAllUsersService,
    forgotPasswordService,
    resetPasswordService,
    updatePasswordService,
    getWishlistService,
    userCartService,
    getUserCartService,
    emptyUserCartService,
    applyCouponService,
    uploadAvatarUserService,
    deleteAvatarUserService,
} from '../services/userService.js';

import { refreshTokenJwtService } from '../services/jwtService.js';
import validateMongoDbId from './../utils/validateMongoDbId.js';
const createUser = async (req, res) => {
    try {
        const createUserSchema = yup.object().shape({
            name: yup.string().required('Name is required'),
            email: yup.string().email('Invalid email').required('Email is required'),
            password: yup.string().required('Password is required'),
            confirmPassword: yup
                .string()
                .oneOf([yup.ref('password'), null], 'Password must match')
                .required('Confirm password is required'),
        });
        await createUserSchema.validate(req.body, { abortEarly: false });
        const response = await createUserService(req.body);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const loginUser = async (req, res) => {
    try {
        const loginUserSchema = yup.object().shape({
            email: yup.string().email('Invalid email').required('Email is required'),
            password: yup.string().required('Password is required'),
        });
        await loginUserSchema.validate(req.body, { abortEarly: false });
        const response = await loginUserService(req.body);

        res.cookie('refreshToken', response.message.refreshToken, {
            httpOnly: true,
        });

        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const refreshToken = async (req, res) => {
    try {
        const refreshToken = await req.headers.refreshtoken?.split(' ')[1];
        console.log('check' + req);
        if (!refreshToken) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Token is required',
            });
        }
        const response = await refreshTokenJwtService(refreshToken);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully',
        });
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const updateUser = async (req, res) => {
    try {
        const updateUserSchema = yup.object().shape({
            id: yup.string().required('User Id is required'),
        });
        await updateUserSchema.validate(req.params, { abortEarly: false });
        const userId = req.params.id;
        const data = req.body;
        const response = await updateUserService(userId, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deleteUserSchema = yup.object().shape({
            id: yup.string().required('User Id is required'),
        });
        await deleteUserSchema.validate(req.params, { abortEarly: false });

        const userId = req.params.id;
        const response = await deleteUserService(userId);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            errors: error.errors,
        });
    }
};

const getDetailUser = async (req, res) => {
    try {
        const getDetailUserSchema = yup.object().shape({
            id: yup.string().required('User Id is required'),
        });
        await getDetailUserSchema.validate(req.params, { abortEarly: false });

        const userId = req.params.id;
        const response = await getDetailUserService(userId);
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error in getDetailUser:', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const response = await getAllUsersService();
        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const emailSchema = yup.object().shape({
            email: yup.string().email('Invalid email').required('Email is required'),
        });
        await emailSchema.validate(req.body, { abortEarly: false });
        const response = await forgotPasswordService(req);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const resetPassword = async (req, res) => {
    try {
        const token = req.params.token;
        const createUserSchema = yup.object().shape({
            password: yup.string().required('Password is required'),
            confirmPassword: yup
                .string()
                .oneOf([yup.ref('password'), null], 'Password must match')
                .required('Confirm password is required'),
        });
        await createUserSchema.validate(req.body, { abortEarly: false });
        const response = await resetPasswordService(token, req.body);
        res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: `Internal Server Error : ${error.message}`,
        });
    }
};

const updatePassword = async (req, res) => {
    try {
        const createUserSchema = yup.object().shape({
            oldPassword: yup.string().required('Old Password is required'),
            newPassword: yup.string().required('New Password is required'),
            confirmNewPassword: yup
                .string()
                .oneOf([yup.ref('newPassword'), null], 'Password must match')
                .required('Confirm new password is required'),
        });
        await createUserSchema.validate(req.body, { abortEarly: false });
        const response = await updatePasswordService(req.params.id, req.body);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error in updatePassword:', error);
        return res.status(400).json({
            errors: error.errors,
        });
    }
};

const getWishlist = async (req, res) => {
    const { id } = req.user;
    try {
        const response = await getWishlistService(id);
        res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const userCart = async (req, res) => {
    const { id } = req.user;
    const { cart } = req.body;
    try {
        validateMongoDbId(id);
        const response = await userCartService(id, cart);
        res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const getUserCart = async (req, res) => {
    const { id } = req.user;
    try {
        validateMongoDbId(id);
        const response = await getUserCartService(id);
        res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const emptyUserCart = async (req, res) => {
    try {
        const { id } = req.user;
        validateMongoDbId(id);
        const response = await emptyUserCartService(id);
        res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const applyCoupon = async (req, res) => {
    try {
        const { id } = req.user;

        validateMongoDbId(id);
        const response = await applyCouponService(id, req.body);
        res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const uploadAvatarUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { files } = req;
        validateMongoDbId(id);
        if (files.length === 0) {
            return res.status(404).json({ message: 'Files not found' });
        }
        const response = await uploadAvatarUserService(id, files);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: `Internal Server Error : ${error.message}`,
        });
    }
};

const deleteAvatarUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { listPublicId } = req.body;
        validateMongoDbId(id);
        if (listPublicId.length === 0) {
            return res.status(404).json({ message: 'Public id is required' });
        }
        const response = await deleteAvatarUserService(id, listPublicId);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: `Internal Server Error : ${error.message}`,
        });
    }
};
export {
    createUser,
    loginUser,
    logoutUser,
    updateUser,
    refreshToken,
    deleteUser,
    getDetailUser,
    getAllUsers,
    forgotPassword,
    resetPassword,
    updatePassword,
    getWishlist,
    userCart,
    getUserCart,
    emptyUserCart,
    applyCoupon,
    uploadAvatarUser,
    deleteAvatarUser,
};
