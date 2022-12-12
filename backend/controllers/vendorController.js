import asyncHandler from 'express-async-handler'
import Vendor from '../models/vendorModel.js'

// @desc    Fetch all vendors
// @route   GET /api/vendors
// @access  Public
const getVendors = asyncHandler(async (req, res) => {
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

	const count = await Vendor.countDocuments({...keyword})
	const vendors = await Vendor.find({...keyword})
		.limit(pageSize)
		.skip(pageSize * (page - 1))

	res.json({vendors, page, pages: Math.ceil(count / pageSize)})
})

// @desc    Fetch single
// @route   GET /api/vendors/:id
// @access  Public
const getVendorById = asyncHandler(async (req, res) => {
	const vendor = await Vendor.findById(req.params.id)

	if (vendor) {
		res.json(vendor)
	} else {
		res.status(404)
		throw new Error('Vendor not found')
	}
})

// @desc    Delete a vendor
// @route   DELETE /api/vendors/:id
// @access  Private/Admin
const deleteVendor = asyncHandler(async (req, res) => {
	const vendor = await Vendor.findById(req.params.id)

	if (vendor) {
		await vendor.remove()
		res.json({message: 'Vendor removed'})
	} else {
		res.status(404)
		throw new Error('Vendor not found')
	}
})

// @desc    Create a vendor
// @route   POST /api/vendors
// @access  Private/Admin
const createVendor = asyncHandler(async (req, res) => {
	const vendor = new Vendor({
		name: 'Vendor name',
		user: req.user._id,
		image: '/images/sample.jpg',
	})

	const createdVendor = await vendor.save()
	res.status(201).json(createdVendor)
})

// @desc    Update a vendor
// @route   PUT /api/vendors/:id
// @access  Private/Admin
const updateVendor = asyncHandler(async (req, res) => {
	const {name, image} = req.body

	const vendor = await Vendor.findById(req.params.id)

	if (vendor) {
		vendor.name = name
		vendor.image = image

		const updatedVendor = await vendor.save()
		res.json(updatedVendor)
	} else {
		res.status(404)
		throw new Error('Vendor not found')
	}
})

export {getVendors, getVendorById, deleteVendor, createVendor, updateVendor}
