const authGoogle = (req, res) => {
    try {
        // const email = req?.user.emails[0].value;
        // const name = req?.user.displayName;
        // const avatar = req?.user?.avatars[0]?.value;
        console.log('check info user');
        return res.json('oke');
    } catch (error) {}
};

export { authGoogle };
