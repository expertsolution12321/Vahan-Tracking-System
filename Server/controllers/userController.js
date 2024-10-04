const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    if (req.user.role !== 'super_admin') {
        return res.sendStatus(403);
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User created');
};

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(403).json({ message: 'Invalid credentials.' });
        }
console.log(process.env.JWT_SECRET,'rghfhgjgf');

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '10d',
        });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    if (req.user.role !== 'super_admin') {
        return res.sendStatus(403);
    }
    const users = await User.find();
    res.json(users);
};

exports.updateUser = async (req, res) => {
    if (req.user.role !== 'super_admin') {
        return res.sendStatus(403);
    }
    const { id } = req.params;
    const { password, ...updateData } = req.body;
    if (password) {
        updateData.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
        return res.status(404).send('User not found');
    }
    res.json(updatedUser);
};

exports.deleteUser = async (req, res) => {
    if (req.user.role !== 'super_admin') {
        return res.sendStatus(403);
    }
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
        return res.status(404).send('User not found');
    }
    res.send('User deleted');
};
