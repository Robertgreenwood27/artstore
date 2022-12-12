import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Feature from '../components/Feature'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listFeatures} from '../actions/featureActions'
import Divider from '../components/Divider'
import {Col, Row} from 'react-bootstrap'

const RenderFeatures = () => {
	const dispatch = useDispatch()

	const featureList = useSelector((state) => state.featureList)
	const {loading, error, features} = featureList

	useEffect(() => {
		dispatch(listFeatures())
	}, [dispatch])

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Divider />

					<Row style={{textAlign: 'center', color: 'white'}}>
						<h1>Events and Features</h1>
						{features.map((feature) => (
							<Col key={feature._id} sm={12} md={6} lg={4} xl={3}>
								<Feature feature={feature} />
							</Col>
						))}
					</Row>
				</>
			)}
		</>
	)
}

export default RenderFeatures
