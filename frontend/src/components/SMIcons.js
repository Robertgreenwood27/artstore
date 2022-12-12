import React from 'react'
import {Image} from 'react-bootstrap'
import facebookicon from '../facebookicon.png'
import instagramicon from '../instagramicon.png'

const SMIcons = () => {
	return (
		<>
			<div style={{textAlign: 'center'}}>
				<a target="_blank" href="https://www.facebook.com/ronzreptilez">
					<Image
						style={{
							height: '30px',
							width: '30px',
							margin: '10px',
						}}
						src={facebookicon}
						className="img-fluid"
						alt="facebook icon"
					/>
				</a>
				<a
					target="_blank"
					href="https://www.instagram.com/beastiespueblo/?hl=en"
				>
					<Image
						style={{
							height: '30px',
							width: '30px',
							margin: '10px',
						}}
						src={instagramicon}
						className="img-fluid"
						alt="instagram icon"
					/>
				</a>
			</div>
		</>
	)
}

export default SMIcons
