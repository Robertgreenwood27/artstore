import React from 'react'
import {Container, Row, Col, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import SMIcons from './SMIcons'

const TopFooter = () => {
	return (
		<footer style={{backgroundColor: 'black'}}>
			<Container>
				<Row>
					<Link to="about">
						<Col className="text-center py-3">About</Col>
					</Link>
					<Link to="contact">
						<Col className="text-center py-3">Contact and Location</Col>
					</Link>
					<Col>
						<SMIcons />
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default TopFooter
