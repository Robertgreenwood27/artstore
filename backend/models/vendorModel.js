import mongoose from 'mongoose'

const vendorSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: false,
		},
		image: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
)

const Vendor = mongoose.model('Vendor', vendorSchema)

export default Vendor
