import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listCategoryDetails, updateCategory} from '../actions/categoryActions'
import {CATEGORY_UPDATE_RESET} from '../constants/categoryConstants'

const CategoryEditScreen = ({match, history}) => {
	const categoryId = match.params.id

	const [name, setName] = useState('')
	const [image, setImage] = useState('')
	const [sortBy, setSortBy] = useState('')
	const [uploading, setUploading] = useState(false)

	const dispatch = useDispatch()

	const categoryDetails = useSelector((state) => state.categoryDetails)
	const {loading, error, category} = categoryDetails

	const categoryUpdate = useSelector((state) => state.categoryUpdate)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = categoryUpdate

	useEffect(() => {
		if (successUpdate) {
			dispatch({type: CATEGORY_UPDATE_RESET})
			history.push('/admin/categorylist')
		} else {
			if (!category.name || category._id !== categoryId) {
				dispatch(listCategoryDetails(categoryId))
			} else {
				setName(category.name)
				setImage(category.image)
				setSortBy(category.sortBy)
			}
		}
	}, [dispatch, history, categoryId, category, successUpdate])

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		setUploading(true)

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}

			const {data} = await axios.post('/api/upload', formData, config)

			setImage(data)
			setUploading(false)
		} catch (error) {
			console.error(error)
			setUploading(false)
		}
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateCategory({
				_id: categoryId,
				name,
				image,
				sortBy,
			})
		)
	}

	return (
		<>
			<Link to="/admin/categorylist" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Category</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="name"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image url"
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
							<Form.File
								id="image-file"
								label="Choose File"
								custom
								onChange={uploadFileHandler}
							></Form.File>
							{uploading && <Loader />}
						</Form.Group>

						<Form.Group controlId="sortBy">
							<Form.Label>Sort</Form.Label>
							<Form.Control
								type="text"
								placeholder="Sort position"
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}

export default CategoryEditScreen
