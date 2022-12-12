import React from 'react'

const Divider = () => {
	return (
		<div style={{marginTop: '30px', marginBottom: '30px'}}>
			<div
				style={{
					height: '2px',
					width: '100%',
					backgroundColor: 'lightgray',
				}}
			></div>
			<div
				style={{
					height: '1px',
					width: '100%',
					backgroundColor: 'black',
				}}
			></div>
		</div>
	)
}

export default Divider
