import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listVendors, deleteVendor, createVendor} from '../actions/vendorActions'
import {VENDOR_CREATE_RESET} from '../constants/vendorConstants'

const VendorListScreen = ({history, match}) => {
	const dispatch = useDispatch()
	const vendorList = useSelector((state) => state.vendorList)
	const {loading, error, vendors} = vendorList

	const vendorDelete = useSelector((state) => state.vendorDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = vendorDelete

	const vendorCreate = useSelector((state) => state.vendorCreate)
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		vendor: createdVendor,
	} = vendorCreate

	const userLogin = useSelector((state) => state.userLogin)
	const {userInfo} = userLogin

	useEffect(() => {
		dispatch({type: VENDOR_CREATE_RESET})

		if (!userInfo || !userInfo.isAdmin) {
			history.push('/login')
		}

		if (successCreate) {
			history.push(`/admin/vendor/${createdVendor._id}/edit`)
		} else {
			dispatch(listVendors(''))
		}
	}, [dispatch, history, userInfo, successDelete, successCreate, createdVendor])

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure')) {
			dispatch(deleteVendor(id))
		}
	}

	const createVendorHandler = () => {
		dispatch(createVendor())
	}

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Vendors</h1>
				</Col>
				<Col className="text-right">
					<Button className="my-3" onClick={createVendorHandler}>
						<i className="fas fa-plus"></i> Create Vendor
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant="danger">{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant="danger">{errorCreate}</Message>}
			{error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						{vendors.map((vendor) => (
							<Col key={vendor._id} sm={12} md={6} lg={4} xl={3}>
								<Card className="my-3 p-0 rounded justify-content-md-center text-center">
									<Card.Img
										src={vendor.image}
										variant="top"
										style={{height: '220px'}}
									/>
									<Card.Body>
										<Card.Title as="div">
											<Row>
												<strong>{vendor.name}</strong>
											</Row>
										</Card.Title>
										<Row>
											<Col>
												<LinkContainer to={`/admin/vendor/${vendor._id}/edit`}>
													<Button variant="light" className="btn-sm">
														<i className="fas fa-edit"></i>
													</Button>
												</LinkContainer>
											</Col>
											<Col>
												<Button
													variant="danger"
													className="btn-sm"
													onClick={() => deleteHandler(vendor._id)}
												>
													<i className="fas fa-trash"></i>
												</Button>
											</Col>
										</Row>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>NAME</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{vendors.map((vendor) => (
								<tr key={vendor._id}>
									<td>{vendor.name}</td>
									<td>
										<LinkContainer to={`/admin/vendor/${vendor._id}/edit`}>
											<Button variant="light" className="btn-sm">
												<i className="fas fa-edit"></i>
											</Button>
										</LinkContainer>
										<Button
											variant="danger"
											className="btn-sm"
											onClick={() => deleteHandler(vendor._id)}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			)}
		</>
	)
}

export default VendorListScreen
