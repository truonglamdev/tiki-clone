import yup from 'yup';
import { createUserService, loginUserService } from '../services/userService.js';

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
            phone: yup.string(),
        });
        await createUserSchema.validate(req.body, { abortEarly: false });
        const response = await createUserService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            errors: error.errors,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const createUserSchema = yup.object().shape({
            email: yup.string().email('Invalid email').required('Email is required'),
            password: yup.string().required('Password is required'),
        });
        await createUserSchema.validate(req.body, { abortEarly: false });
        const response = await loginUserService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            errors: error.errors,
        });
    }
};

export { createUser, loginUser };
