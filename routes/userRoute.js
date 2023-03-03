const express = require('express');

const router = express.Router();

const userController = require('../controller/user');

//post user
router.post('/add-user',userController.postAddUser);

//get user
router.get('/get-users',userController.getUsers);

//delete user
router.delete('/delete-user/id:',userController.postDeleteUser );

module.exports = router;