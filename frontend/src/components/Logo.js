import React from 'react'
import {Image} from 'react-bootstrap'
import logo from '../logo.png'
import {Link} from 'react-router-dom'

const Logo = () => {
	return (
		<Link to="/">
			<Image
				style={{
					height: '250px',
					width: '100%',
				}}
				src={logo}
				className="img-fluid"
				alt="logo"
			/>
		</Link>
	)
}

export default Logo
