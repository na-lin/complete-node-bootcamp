const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// todo : user login and signup
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// todo: password reset
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// todo: allow a logged-in user to simply update his password without the whole reset process
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
// update user data except update password  with protect route
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);


module.exports = router;
