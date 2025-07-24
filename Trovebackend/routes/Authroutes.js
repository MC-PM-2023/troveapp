import express from 'express';

import user from '../models/usermodel.js';
import authController from '../controllers/authcontroller.js';

const router=express.Router();

router.post('/signup',authController.register)
router.post('/login',authController.login)
router.get("/verify-token",authController.verifyToken)
// router.get('/getallusers',authController.getAllUsers)
// router.put('/:id',authController.updateUser)
// router.delete('/:id',authController.deleteUser)

router.post('/verifyemail',authController.verifyOTP)
router.post('/forgotpassword',authController.forgotpassword)
router.post('/resendotp',authController.resendotp)
export default router;