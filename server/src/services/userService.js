import bcrypt from 'bcrypt';
import Cart from '../models/cartModel.js';
import User from '../models/userModel.js';
import createMessage from '../utils/createMessage.js';
import sendEmailMessage from '../utils/sendEmailMessage.js';
import Product from './../models/productModel.js';
import { generateAccessToken, generateRefreshToken } from './jwtService.js';
import Coupon from './../models/couponModel.js';

const createUserService = async (user) => {
    try {
        const { email, password, name } = user;
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return createMessage(400, 'User already exists');
        }
        //Hash password with bcrypt
        const hashPassword = await bcrypt.hash(password, 10);
        const createNewUser = await User.create({ name, email, password: hashPassword });
        const newUser = createNewUser.toObject();
        delete newUser.password;
        return createMessage(200, 'User created successfully', { user: newUser });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const loginUserService = async (user) => {
    try {
        const { email, password } = user;
        const userExist = await User.findOne({ email: email });
        if (userExist === null) {
            return createMessage(404, 'User not found');
        }
        const isPasswordCompare = await bcrypt.compare(password, userExist.password);
        if (!isPasswordCompare) {
            return createMessage(400, 'Password does not matches');
        }
        const accessToken = await generateAccessToken({
            id: userExist.id,
            isAdmin: userExist.isAdmin,
        });

        const refreshToken = await generateRefreshToken({
            id: userExist.id,
            isAdmin: userExist.isAdmin,
        });

        const newUser = userExist.toObject();
        delete newUser.password;

        return createMessage(200, 'Authentication successful', {
            user: newUser,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    } catch (error) {
        return createMessage(500, error.message);
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

const forgotPasswordService = async (req) => {
    try {
        const payload = req.body;
        const host = req.headers.host;
        const user = await User.findOne({ email: payload.email });
        if (!user) {
            return createMessage(404, 'User not found');
        }

        await user.generateResetPasswordToken();
        // await user.save({ validateBeforeSave: false });
        await user.save();
        if (!user.resetPasswordToken) {
            return createMessage(400, 'Send email is failed');
        }
        const resetPasswordUrl = `${process.env.URL_ENDPOINT}/password/reset/${user.resetPasswordToken}`;
        const message = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='${resetPasswordUrl}'>Click Here</>`;
        return await sendEmailMessage({ email: payload.email, subject: `Tiki Password Recovery`, message });
    } catch (error) {
        const user = await User.findOne({ email: payload.email });
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        // Save user changes
        await user.save();
        return createMessage(500, error.message);
    }
};

const resetPasswordService = async (token, user) => {
    try {
        const userExists = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!userExists) {
            return createMessage(404, 'Your token reset password has expired?');
        }
        const hashPassword = await bcrypt.hash(user.password, 10);
        userExists.password = hashPassword;
        userExists.resetPasswordToken = undefined;
        userExists.resetPasswordExpires = undefined;
        await userExists.save();
        return createMessage(200, 'Reset Password Successful');
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const updatePasswordService = async (id, user) => {
    try {
        const userExist = await User.findById(id);
        if (!userExist) {
            return {
                status: 'ERR',
                message: 'User not found',
            };
        }
        const isComparePassword = await bcrypt.compare(user.oldPassword, userExist.password);

        if (!isComparePassword) {
            return {
                status: 'ERR',
                message: 'Old Password mismatch',
            };
        }

        const hasNewPassword = await bcrypt.hash(user.newPassword, 10);
        userExist.password = hasNewPassword;
        await userExist.save();
        return {
            status: 'OK',
            message: 'Update Password successfully',
        };
    } catch (error) {
        return error;
    }
};

const getWishlistService = async (id) => {
    try {
        const findUser = await User.findById(id).populate('wishlist');
        return createMessage(200, 'Success', { data: findUser });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const userCartService = async (id, cart) => {
    try {
        let products = [];
        const user = await User.findById(id);
        const alreadyExistCart = await Cart.findOne({ orderBy: user._id });
        if (alreadyExistCart) {
            alreadyExistCart.remove();
        }
        const productPromise = cart.map(async (cartItem) => {
            const product = await Product.findById(cartItem._id).select('price');
            return {
                product: cartItem._id,
                count: cartItem.count,
                color: cartItem.color,
                price: product.price,
            };
        });
        products = await Promise.all(productPromise);
        let cartTotal = products.reduce((total, product) => total + product.price * product.count, 0);
        const newCart = await new Cart({
            products,
            cartTotal,
            orderBy: user?._id,
        }).save();
        return createMessage(200, 'Success', { data: newCart });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getUserCartService = async (id) => {
    try {
        const carts = await Cart.findOne({ orderBy: id }).populate('products.product');
        return createMessage(200, 'Success', { data: carts || [] });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const emptyUserCartService = async (id) => {
    try {
        await Cart.findOneAndRemove({ orderBy: id });
        return createMessage(200, 'Cart is empty');
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const applyCouponService = async (id, coupon) => {
    try {
        const existCoupon = await Coupon.findOne({ name: coupon.name });
        if (!existCoupon) {
            return createMessage(404, 'Coupon not found');
        }
        const user = await User.findById(id);
        const cart = await Cart.findOne({ orderBy: user._id }).populate('products.product');

        if (!cart) {
            return createMessage(404, 'Cart not found');
        }

        const { cartTotal } = cart;
        const totalAfterDiscount = (cartTotal - (cartTotal * existCoupon.discount) / 100).toFixed(2);
        cart.totalAfterDiscount = totalAfterDiscount;
        await cart.save();
        return createMessage(200, 'Apply coupon successfully', { totalAfterDiscount });
    } catch (error) {
        return createMessage(500, error.message);
    }
};
export {
    createUserService,
    deleteUserService,
    forgotPasswordService,
    getAllUsersService,
    getDetailUserService,
    getWishlistService,
    loginUserService,
    resetPasswordService,
    updatePasswordService,
    updateUserService,
    userCartService,
    getUserCartService,
    emptyUserCartService,
    applyCouponService,
};
