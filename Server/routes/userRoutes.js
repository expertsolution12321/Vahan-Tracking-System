const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT1 } = require('../middleware/authenticate');

router.post('/', authenticateJWT1, userController.registerUser);
router.get('/', authenticateJWT1, userController.getUsers);
router.put('/:id', authenticateJWT1, userController.updateUser);
router.delete('/:id', authenticateJWT1, userController.deleteUser);

module.exports = router;
