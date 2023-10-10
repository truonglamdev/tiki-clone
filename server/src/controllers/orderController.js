import validateMongoDbId from '../utils/validateMongoDbId.js';
import {
    cancelOrderService,
    createOrderService,
    getAllOrdersAdminService,
    getAllOrdersUserService,
    getOrdersService,
    updateOrderStatusService,
} from '../services/orderService.js';

const createOrder = async (req, res) => {
    const { id } = req.user;
    const { COD } = req.body;
    try {
        validateMongoDbId(id);
        if (!COD) {
            return res.status(404).json({ status: 'ERR', message: 'COD is required' });
        }
        const response = await createOrderService(id, req.body);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const getOrders = async (req, res) => {
    try {
        const { id } = req.params;
        validateMongoDbId(id);
        const response = await getOrdersService(id);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const getAllOrdersUser = async (req, res) => {
    try {
        const { id } = req.user;
        validateMongoDbId(id);
        const response = await getAllOrdersUserService(id);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const getAllOrdersAdmin = async (req, res) => {
    try {
        const response = await getAllOrdersAdminService();
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
        validateMongoDbId(id);
        const validStatus = ['Not Processed', 'Cash on Delivery', 'Processing', 'Dispatched', 'Cancelled', 'Delivered'];
        if (!validStatus.includes(status)) {
            return res.status(400).json({ message: 'Status is not a valid' });
        }
        const response = await updateOrderStatusService(id, status);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { order } = req.body;
        validateMongoDbId(id);
        const response = await cancelOrderService(id, order);
        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error : ${error.message}` });
    }
};

export { createOrder, getOrders, getAllOrdersUser, getAllOrdersAdmin, updateOrderStatus, cancelOrder };
