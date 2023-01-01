import React from 'react'
import {Card, Image} from 'react-bootstrap'

const Feature = ({feature}) => {
	return (
			<Card style={{marginBottom: '20px'}}>
				<Image
					src={feature.image}
					style={{height: '220px'}}
				/>
			</Card>
	)
}

export default Feature
