import jwt from 'jsonwebtoken';
const { ACCESS_TOKEN_SECRET } = process.env;
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            status: 'ERR',
            message: 'Authentication failed',
        });
    }
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                status: 'ERR',
                message: 'Authentication failed',
            });
        }
        if (user && user.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                status: 'ERR',
                message: 'Unauthorized access',
            });
        }
    });
};

const authUserMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const userId = req.params.id;
        if (!token) {
            return res.status(401).json({
                status: 'ERR',
                message: 'Authentication failed',
            });
        }
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({
                    status: 'ERR',
                    message: 'Authentication failed',
                });
            }
            if (user.isAdmin || user.id === userId) {
                next();
            } else {
                return res.status(403).json({
                    status: 'ERR',
                    message: 'Unauthorized access',
                });
            }
        });
    } catch (error) {}
};

export { authMiddleware, authUserMiddleware };
