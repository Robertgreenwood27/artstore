import React from 'react'

const ContactScreen = () => {
	return (
		<div
			style={{
				textAlign: 'center',
				color: 'white',
				backgroundColor: 'rgba(0, 0, 0, 0.6)',
				borderRadius: '10px',
				padding: '100px 0',
			}}
		>
			<h3>Hours: </h3>
			<p>Friday 11AM–7PM</p>
			<p>Saturday 11AM–7PM</p>
			<p>Sunday 12–5PM</p>
			<p>Monday 11AM–7PM</p>
			<p>Tuesday 11AM–7PM</p>
			<p>Wednesday 11AM–7PM</p>
			<p>Thursday 11AM–7PM</p>

			<p>
				<strong>Phone number: </strong>(719)696-2631
			</p>
			<p>
				<strong>Address: </strong>4104 Outlook Blvd Suite #137, Pueblo, CO 81008
			</p>
			<div>
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3130.6470514646066!2d-104.62872138517363!3d38.31084448890956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8713a2267f7f7233%3A0xba51003c4a4fb4c5!2sBeasties...A%20pet%20store%20and%20more*21*21*21!5e0!3m2!1sen!2sus!4v1633485951836!5m2!1sen!2sus"
					style={{
						width: '75%',
						border: '0',
					}}
					allowfullscreen=""
					loading="lazy"
				></iframe>
			</div>
		</div>
	)
}

export default ContactScreen
