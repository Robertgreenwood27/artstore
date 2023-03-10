import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
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

	const count = await Category.countDocuments({...keyword})
	const categories = await Category.find({...keyword})
		.sort('sortBy')
		.limit(pageSize)
		.skip(pageSize * (page - 1))

	res.json({categories, page, pages: Math.ceil(count / pageSize)})
})

// @desc    Fetch single
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id)

	if (category) {
		res.json(category)
	} else {
		res.status(404)
		throw new Error('Category not found')
	}
})

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id)

	if (category) {
		await category.remove()
		res.json({message: 'Category removed'})
	} else {
		res.status(404)
		throw new Error('Category not found')
	}
})

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
	const category = new Category({
		name: 'Category name',
		user: req.user._id,
		image: '/images/sample.jpg',
		sortBy: 'Position',
	})

	const createdCategory = await category.save()
	res.status(201).json(createdCategory)
})

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
	const {name, image, sortBy} = req.body

	const category = await Category.findById(req.params.id)

	if (category) {
		category.name = name
		category.image = image
		category.sortBy = sortBy

		const updatedCategory = await category.save()
		res.json(updatedCategory)
	} else {
		res.status(404)
		throw new Error('Category not found')
	}
})

export {
	getCategories,
	getCategoryById,
	deleteCategory,
	createCategory,
	updateCategory,
}
