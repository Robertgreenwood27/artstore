import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Category from '../components/Category'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listCategories} from '../actions/categoryActions'

const RenderCategories = () => {
	const dispatch = useDispatch()

	const categoryList = useSelector((state) => state.categoryList)
	const {loading, error, categories} = categoryList

	useEffect(() => {
		dispatch(listCategories())
	}, [dispatch])

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row style={{textAlign: 'center'}}>
						<Col>
							<h1 style={{color: 'white'}}>Categories</h1>
						</Col>
					</Row>
					<Row>
						{categories.map((category) => (
							<Col key={category._id} sm={12} md={6} lg={4} xl={3}>
								<Category category={category} />
							</Col>
						))}
					</Row>
				</>
			)}
		</>
	)
}

export default RenderCategories
