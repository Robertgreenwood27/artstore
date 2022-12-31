import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'

const Product = ({product}) => {
	return (
		<Card className="my-3 p-0 rounded justify-content-md-center text-center">
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant="top" style={{height: '220px'}} />
			</Link>
			<Card.Body>
				<Link to={`/product/${product._id}`} style={{textDecoration: 'none'}}>
					<Card.Title as="div">
						<h6>{product.name}</h6>
					</Card.Title>
				</Link>

				<Card.Text as="h6" style={{color: 'white'}}>
					${product.price}
				</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Product
