import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import categories from './data/categories.js'
import features from './data/features.js'
import vendors from './data/vendors.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Category from './models/categoryModel.js'
import Feature from './models/featureModel.js'
import Vendor from './models/vendorModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
	try {
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()
		await Category.deleteMany()
		await Feature.deleteMany()
		await Vendor.deleteMany()

		const createdUsers = await User.insertMany(users)

		const adminUser = createdUsers[0]._id

		const sampleProducts = products.map((product) => {
			return {...product, user: adminUser}
		})

		const sampleCategories = categories.map((category) => {
			return {...category, user: adminUser}
		})

		const sampleFeatures = features.map((feature) => {
			return {...feature, user: adminUser}
		})

		const sampleVendors = vendors.map((vendor) => {
			return {...vendor, user: adminUser}
		})

		await Product.insertMany(sampleProducts)
		await Category.insertMany(sampleCategories)
		await Feature.insertMany(sampleFeatures)
		await Vendor.insertMany(sampleVendors)

		console.log('Data Imported!'.green.inverse)
		process.exit()
	} catch (error) {
		console.error(`${error}`.red.inverse)
		process.exit(1)
	}
}

const destroyData = async () => {
	try {
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()
		await Category.deleteMany()
		await Feature.deleteMany()
		await Vendor.deleteMany()

		console.log('Data Destroyed!'.red.inverse)
		process.exit()
	} catch (error) {
		console.error(`${error}`.red.inverse)
		process.exit(1)
	}
}

if (process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}
