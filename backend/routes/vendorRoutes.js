import express from 'express'
const router = express.Router()
import {
	getVendors,
	getVendorById,
	deleteVendor,
	createVendor,
	updateVendor,
} from '../controllers/vendorController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').get(getVendors).post(protect, admin, createVendor)
router
	.route('/:id')
	.get(getVendorById)
	.delete(protect, admin, deleteVendor)
	.put(protect, admin, updateVendor)

export default router
