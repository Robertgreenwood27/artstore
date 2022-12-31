import express from 'express'
const router = express.Router()
import {
	getFeatures,
	getFeatureById,
	deleteFeature,
	createFeature,
	updateFeature,
} from '../controllers/featureController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').get(getFeatures).post(protect, admin, createFeature)
router
	.route('/:id')
	.get(getFeatureById)
	.delete(protect, admin, deleteFeature)
	.put(protect, admin, updateFeature)

export default router
