const getUser = async (req, res) => {
    // Xử lý logic ở đây
    console.log('check get user');
    res.status(200).json('Hello from getUser');
};

export { getUser };
