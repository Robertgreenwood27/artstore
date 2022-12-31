import asyncHandler from 'express-async-handler'
import Feature from '../models/featureModel.js'

// @desc    Fetch all features
// @route   GET /api/features
// @access  Public
const getFeatures = asyncHandler(async (req, res) => {
	const pageSize = 1000
	const page = Number(req.query.pageNumber) || 1

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {}

	const count = await Feature.countDocuments({...keyword})
	const features = await Feature.find({...keyword})
		.limit(pageSize)
		.skip(pageSize * (page - 1))

	res.json({features, page, pages: Math.ceil(count / pageSize)})
})

// @desc    Fetch single
// @route   GET /api/features/:id
// @access  Public
const getFeatureById = asyncHandler(async (req, res) => {
	const feature = await Feature.findById(req.params.id)

	if (feature) {
		res.json(feature)
	} else {
		res.status(404)
		throw new Error('Feature not found')
	}
})

// @desc    Delete a feature
// @route   DELETE /api/features/:id
// @access  Private/Admin
const deleteFeature = asyncHandler(async (req, res) => {
	const feature = await Feature.findById(req.params.id)

	if (feature) {
		await feature.remove()
		res.json({message: 'Feature removed'})
	} else {
		res.status(404)
		throw new Error('Feature not found')
	}
})

// @desc    Create a feature
// @route   POST /api/features
// @access  Private/Admin
const createFeature = asyncHandler(async (req, res) => {
	const feature = new Feature({
		name: 'Feature name',
		user: req.user._id,
		image: '/images/sample.jpg',
		website: '',
	})

	const createdFeature = await feature.save()
	res.status(201).json(createdFeature)
})

// @desc    Update a feature
// @route   PUT /api/features/:id
// @access  Private/Admin
const updateFeature = asyncHandler(async (req, res) => {
	const {name, image, website} = req.body

	const feature = await Feature.findById(req.params.id)

	if (feature) {
		feature.name = name
		feature.image = image
		feature.website = website

		const updatedFeature = await feature.save()
		res.json(updatedFeature)
	} else {
		res.status(404)
		throw new Error('Feature not found')
	}
})

export {
	getFeatures,
	getFeatureById,
	deleteFeature,
	createFeature,
	updateFeature,
}
