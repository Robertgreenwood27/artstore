import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Container} from 'react-bootstrap'
import Vendor from '../components/Vendor'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listVendors} from '../actions/vendorActions'
import Divider from '../components/Divider'

const RenderVendors = () => {
	const dispatch = useDispatch()

	const vendorList = useSelector((state) => state.vendorList)
	const {loading, error, vendors} = vendorList

	useEffect(() => {
		dispatch(listVendors())
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
							<Divider />
							<h1 style={{color: 'white'}}>Vendors</h1>
						</Col>
					</Row>
					<Row style={{textAlign: 'center'}}>
						{vendors.map((vendor) => (
							<Col key={vendor._id} sm={12} md={6} lg={4} xl={3}>
								<Vendor vendor={vendor} />
							</Col>
						))}
					</Row>
				</>
			)}
		</>
	)
}

export default RenderVendors
