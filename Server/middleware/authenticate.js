const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateJWT1 = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[0];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        req.user = user;
        console.log('req',req.user,user)
        next();
    } catch (err) {
        res.status(500).json({ message: 'Server error.', error: err });
    }
};

// More authentication middleware can be defined here

module.exports = { authenticateJWT1 };
