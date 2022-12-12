import mongoose from 'mongoose'

const featureSchema = mongoose.Schema(
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
		website: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
)

const Feature = mongoose.model('Feature', featureSchema)

export default Feature
