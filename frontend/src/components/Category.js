import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'

const Category = ({category}) => {
	return (
		<Link to={`/search/${category.name}`} style={{textDecoration: 'none'}}>
			<Card className="my-3 p-0 rounded justify-content-md-center text-center">
				<Card.Img
					src={category.image}
					variant="top"
					style={{height: '220px'}}
				/>
				<Card.Body>
					<Card.Title as="div">
						<h5>{category.name}</h5>
					</Card.Title>
				</Card.Body>
			</Card>
		</Link>
	)
}

export default Category
