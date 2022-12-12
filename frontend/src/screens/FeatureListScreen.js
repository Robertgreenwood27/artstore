import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
	listFeatures,
	deleteFeature,
	createFeature,
} from '../actions/featureActions'
import {FEATURE_CREATE_RESET} from '../constants/featureConstants'

const FeatureListScreen = ({history, match}) => {
	const dispatch = useDispatch()
	const featureList = useSelector((state) => state.featureList)
	const {loading, error, features} = featureList

	const featureDelete = useSelector((state) => state.featureDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = featureDelete

	const featureCreate = useSelector((state) => state.featureCreate)
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		feature: createdFeature,
	} = featureCreate

	const userLogin = useSelector((state) => state.userLogin)
	const {userInfo} = userLogin

	useEffect(() => {
		dispatch({type: FEATURE_CREATE_RESET})

		if (!userInfo || !userInfo.isAdmin) {
			history.push('/login')
		}

		if (successCreate) {
			history.push(`/admin/feature/${createdFeature._id}/edit`)
		} else {
			dispatch(listFeatures(''))
		}
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		successCreate,
		createdFeature,
	])

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure')) {
			dispatch(deleteFeature(id))
		}
	}

	const createFeatureHandler = () => {
		dispatch(createFeature())
	}

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Features</h1>
				</Col>
				<Col className="text-right">
					<Button className="my-3" onClick={createFeatureHandler}>
						<i className="fas fa-plus"></i> Create Feature
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
						{features.map((feature) => (
							<Col key={feature._id} sm={12} md={6} lg={4} xl={3}>
								<Card className="my-3 p-0 rounded justify-content-md-center text-center">
									<Card.Img
										src={feature.image}
										variant="top"
										style={{height: '220px'}}
									/>
									<Card.Body>
										<Card.Title as="div">
											<Row>
												<strong>{feature.name}</strong>
											</Row>
										</Card.Title>
										<Row>
											<Col>
												<LinkContainer
													to={`/admin/feature/${feature._id}/edit`}
												>
													<Button variant="light" className="btn-sm">
														<i className="fas fa-edit"></i>
													</Button>
												</LinkContainer>
											</Col>
											<Col>
												<Button
													variant="danger"
													className="btn-sm"
													onClick={() => deleteHandler(feature._id)}
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
							{features.map((feature) => (
								<tr key={feature._id}>
									<td>{feature.name}</td>
									<td>
										<LinkContainer to={`/admin/feature/${feature._id}/edit`}>
											<Button variant="light" className="btn-sm">
												<i className="fas fa-edit"></i>
											</Button>
										</LinkContainer>
										<Button
											variant="danger"
											className="btn-sm"
											onClick={() => deleteHandler(feature._id)}
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

export default FeatureListScreen
