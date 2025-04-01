const express = require('express');
const { getProfile, updateProfile, changePassword, uploadProfilePhoto } = require('../controllers/user');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           example: john@example.com
 *         description: The email of the user to retrieve
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "123"
 *               email: "user@example.com"
 *               name: "John Doe"
 *       400:
 *         description: Email is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/profile', authMiddleware, getProfile);


/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8c82f4f1a5c23c4f7e2d3"
 *         description: User ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               phone:
 *                 type: string
 *                 example: "123-456-7890"
 *               address:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                     example: "USA"
 *                   state:
 *                     type: string
 *                     example: "California"
 *                   city:
 *                     type: string
 *                     example: "Los Angeles"
 *                   postalCode:
 *                     type: string
 *                     example: "90001"
 *               profilePhoto:
 *                 type: string
 *                 example: "https://example.com/profile.jpg"
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: "60b8c82f4f1a5c23c4f7e2d3"
 *               firstName: "John"
 *               lastName: "Doe"
 *               email: "john@example.com"
 *               phone: "123-456-7890"
 *               address:
 *                 country: "USA"
 *                 state: "California"
 *                 city: "Los Angeles"
 *                 postalCode: "90001"
 *               profilePhoto: "https://example.com/profile.jpg"
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/profile', authMiddleware, updateProfile);

/**
 * @swagger
 * /api/user/profile/photo:
 *   post:
 *     summary: Upload user profile photo
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8c82f4f1a5c23c4f7e2d3"
 *         description: User ID to upload profile photo for
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile photo uploaded successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Profile photo updated successfully"
 *               profilePhoto: "/uploads/profile.jpg"
 *       400:
 *         description: No file uploaded
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/profile/photo', authMiddleware, uploadProfilePhoto);



/**
 * @swagger
 * /api/user/profile/password:
 *   put:
 *     summary: Change user password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8c82f4f1a5c23c4f7e2d3"
 *         description: User ID to change password for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "currentpassword123"
 *               newPassword:
 *                 type: string
 *                 example: "newpassword456"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Password updated successfully"
 *       400:
 *         description: Incorrect current password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/profile/password', authMiddleware, changePassword);


module.exports = router;
