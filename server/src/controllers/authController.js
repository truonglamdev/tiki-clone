const authGoogle = async (req, res, next) => {
    console.log('Run controller');
    res.status(200).json({ message: 'login with Google successfully' });
};

export { authGoogle };
