import React from 'react'
import {Card, Image} from 'react-bootstrap'

const Feature = ({feature}) => {
	return (
		<a target="_blank" href={feature.website}>
			<Card style={{marginBottom: '20px'}}>
				<Image
					src={feature.image}
					className="rounded"
					style={{height: '220px'}}
				/>
			</Card>
		</a>
	)
}

export default Feature
