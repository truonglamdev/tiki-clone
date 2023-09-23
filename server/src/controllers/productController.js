import { createProductService } from '../services/productService.js';

const createProduct = async (req, res) => {
    try {
        const createProductSchema = yup.object().shape({
            name: yup.string().required('Name product is required'),
            image: yup.string().required('Image product is required'),
            type: yup.string().required('Type product is required'),
            countInStock: yup.number().required('Count in stock product is required'),
            price: yup.number().required('Price product is required'),
            rating: yup.number().required('Rating product is required'),
            discount: yup.number().required('Discount product is required'),
        });

        await createProductSchema.validate(req.body, { abortEarly: false });
        const response = await createProductService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            errors: error.errors,
        });
    }
};

export { createProduct };
