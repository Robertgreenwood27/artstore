import React from 'react'
import {Container, Image} from 'react-bootstrap'

const Vendor = ({vendor}) => {
	return (
		<Container>
			<Image
				src={vendor.image}
				style={{height: '150px', width: '200px', marginBottom: '20px'}}
			/>
		</Container>
	)
}

export default Vendor
