import React from 'react'
import Logo from '../components/Logo'
import RenderCategories from '../frontPage/RenderCategories'
import RenderFeatures from '../frontPage/RenderFeatures'
import RenderVendors from '../frontPage/RenderVendors'

const HomeScreen = () => {
	return (
		<>
			<Logo />
			<RenderCategories />
			<RenderFeatures />
			<RenderVendors />
		</>
	)
}

export default HomeScreen
