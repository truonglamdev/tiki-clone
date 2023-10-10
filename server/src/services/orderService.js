import Cart from '../models/cartModel.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import createMessage from '../utils/createMessage.js';
import uniqid from 'uniqid';

const createOrderService = async (id, order) => {
    const { COD, couponApplied } = order;
    try {
        const user = await User.findById(id);
        const userCart = await Cart.findOne({ orderBy: user._id }).populate('products.product');
        const finalAmount =
            couponApplied && userCart.totalAfterDiscount ? userCart.totalAfterDiscount : userCart.cartTotal;

        const insufficientStock = userCart.products.some((item) => item.product.countInStock < item.count);
        if (insufficientStock) {
            return createMessage(400, 'Some products do not have enough stock.');
        }

        const newOrder = await Order.create({
            products: userCart.products,
            paymentIntent: {
                id: uniqid(),
                method: 'COD',
                amount: finalAmount,
                status: 'Cash on Delivery',
                createdAt: Date.now(),
                currency: 'usd',
            },
            orderBy: user._id,
            orderStatus: 'Cash on Delivery',
        });
        const updateOperations = userCart.products.map((item) => ({
            updateOne: {
                filter: { _id: item.product._id, countInStock: { $gte: item.amount } },
                update: { $inc: { countInStock: -item.count, sold: +item.count } },
            },
        }));

        await Product.bulkWrite(updateOperations);
        return createMessage(200, 'Order successfully', { data: newOrder });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getOrdersService = async (orderId) => {
    try {
        const userOrder = await Order.findById(orderId).populate('products.product').populate('orderBy').exec();
        if (!userOrder) {
            return createMessage(404, 'Order not found');
        }
        return createMessage(200, 'Success', { data: userOrder });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getAllOrdersUserService = async (id) => {
    try {
        const allOrders = await Order.find({ orderBy: id })
            .populate('products.product')
            .populate('orderBy')
            .sort({ createdAt: -1, updatedAt: -1 })
            .exec();
        console.log('all order', allOrders);
        if (!allOrders) {
            return createMessage(404, 'Order not found');
        }
        return createMessage(200, 'Success', { data: allOrders });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const getAllOrdersAdminService = async () => {
    try {
        const allOrders = await Order.find()
            .populate('products.product')
            .populate('orderBy')
            .sort({ createdAt: -1, updatedAt: -1 });
        if (!allOrders) {
            return createMessage(404, 'Order not found');
        }
        return createMessage(200, 'Success', { data: allOrders });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const updateOrderStatusService = async (id, status) => {
    try {
        const order = await Order.findById(id);
        if (!order) {
            return createMessage(404, 'Order not found');
        }
        const updatedOrder = await Order.findByIdAndUpdate(id, {
            orderStatus: status,
            'paymentIntent.status': status,
        });

        if (!updatedOrder) {
            return createMessage(400, 'Update order status failed');
        }
        return createMessage(200, 'Success', { data: updatedOrder });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const cancelOrderService = async (id, data) => {
    try {
        const updateProducts = await Promise.all(
            data.map(async (order) => {
                const productsData = await updateProduct(order.product, order.count);
                return productsData ? order : null;
            }),
        );

        const validProducts = updateProducts.filter((order) => order !== null);
        if (validProducts.length === 0) {
            return createMessage(404, 'All orders are invalid');
        }

        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return createMessage(404, 'The order is not define');
        }

        return createMessage(200, 'successfully deleted', { data: deletedOrder });
    } catch (error) {
        return createMessage(500, error.message);
    }
};

const updateProduct = async (productId, count) => {
    try {
        const productData = await Product.findByIdAndUpdate(
            { _id: productId, sold: { $gte: count } },
            { $inc: { countInStock: +count, sold: -count } },
            { new: true },
        );
        return productData;
    } catch (error) {
        return null;
    }
};

export {
    createOrderService,
    getOrdersService,
    getAllOrdersUserService,
    getAllOrdersAdminService,
    updateOrderStatusService,
    cancelOrderService,
};
