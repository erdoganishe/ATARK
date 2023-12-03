const User = require('../model/User');

const getAllUser = async (req, res) => {
    const users = await User.find();
    if (!users) return res.sendStatus(204).json({ 'message': 'No users at all!' });
    res.json(users)
}

const updateUser = async (req, res) => {
    if (!req?.user) return res.status(400).json({ 'message': 'User ID required' });

    const user = await User.findOne({ username: req.user }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user with ID ${req.user}.` });
    }

    if (req.body?.username) user.username = req.body.username;
    if (req.body?.email) user.email = req.body.email;
    if (req.body?.pwd) {
        const bcrypt = require('bcrypt');
        const hashedPwd = await bcrypt.hash(req.body.pwd, 10);
        user.pwd = hashedPwd;
    }

    const result = await user.save();
    console.log(result);
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.user) return res.status(400).json({ 'message': 'User ID required' });

    const user = await User.findOne({ username: req.user }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user with ID ${req.user}.` });
    }
    const data = user._doc;
    const { refreshTokenMobile, password, refreshToken, ...rest } = data;

    res.json(rest);
}

const getUserById = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'User ID required' });

    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(204).json({ "message": `No User with ID ${req.params.id}.` });
    }
    res.json({ "username": user.username, "rena": user.options.real_name });
}

module.exports = {
    updateUser,
    getUser,
    getUserById
}
