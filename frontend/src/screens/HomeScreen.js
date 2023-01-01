import React from 'react'
import RenderCategories from '../frontPage/RenderCategories'
import RenderFeatures from '../frontPage/RenderFeatures'
import Divider from '../components/Divider'



const HomeScreen = () => {
	return (
		<>
		<RenderFeatures/>
		<Divider/>
			<RenderCategories />
		</>
	)
}

export default HomeScreen
