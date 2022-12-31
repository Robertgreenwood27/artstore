import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
	listProducts,
	deleteProduct,
	createProduct,
} from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'

const ProductListScreen = ({history, match}) => {
	const dispatch = useDispatch()

	const productList = useSelector((state) => state.productList)
	const {loading, error, products} = productList

	const productDelete = useSelector((state) => state.productDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete

	const productCreate = useSelector((state) => state.productCreate)
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate

	const userLogin = useSelector((state) => state.userLogin)
	const {userInfo} = userLogin

	useEffect(() => {
		dispatch({type: PRODUCT_CREATE_RESET})

		if (!userInfo || !userInfo.isAdmin) {
			history.push('/login')
		}

		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`)
		} else {
			dispatch(listProducts(''))
		}
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		successCreate,
		createdProduct,
	])

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure')) {
			dispatch(deleteProduct(id))
		}
	}

	const createProductHandler = () => {
		dispatch(createProduct())
	}

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-right">
					<Button className="my-3" onClick={createProductHandler}>
						<i className="fas fa-plus"></i> Create Product
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
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Card className="my-3 p-0 rounded justify-content-md-center text-center">
									<Card.Img
										src={product.image}
										variant="top"
										style={{height: '220px'}}
									/>
									<Card.Body>
										<Card.Title as="div">
											<strong>{product.name}</strong>
										</Card.Title>
										<Card.Title as="div">
											<strong>{product.category}</strong>
										</Card.Title>
										<Card.Title as="div">
											<strong>{product.price}</strong>
										</Card.Title>
										<Row>
											<Col>
												<LinkContainer
													to={`/admin/product/${product._id}/edit`}
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
													onClick={() => deleteHandler(product._id)}
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
								<th>CATEGORY</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product.category}</td>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td>
										<Row>
											<Col>
												<LinkContainer
													to={`/admin/product/${product._id}/edit`}
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
													onClick={() => deleteHandler(product._id)}
												>
													<i className="fas fa-trash"></i>
												</Button>
											</Col>
										</Row>
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

export default ProductListScreen
