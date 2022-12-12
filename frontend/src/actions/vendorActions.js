import axios from 'axios'
import {
	VENDOR_LIST_REQUEST,
	VENDOR_LIST_SUCCESS,
	VENDOR_LIST_FAIL,
	VENDOR_DETAILS_REQUEST,
	VENDOR_DETAILS_SUCCESS,
	VENDOR_DETAILS_FAIL,
	VENDOR_DELETE_SUCCESS,
	VENDOR_DELETE_REQUEST,
	VENDOR_DELETE_FAIL,
	VENDOR_CREATE_REQUEST,
	VENDOR_CREATE_SUCCESS,
	VENDOR_CREATE_FAIL,
	VENDOR_UPDATE_REQUEST,
	VENDOR_UPDATE_SUCCESS,
	VENDOR_UPDATE_FAIL,
} from '../constants/vendorConstants'
import {logout} from './userActions'

export const listVendors =
	(keyword = '', pageNumber = '') =>
	async (dispatch) => {
		try {
			dispatch({type: VENDOR_LIST_REQUEST})

			const {data} = await axios.get('/api/vendors')

			dispatch({
				type: VENDOR_LIST_SUCCESS,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: VENDOR_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

export const listVendorDetails = (id) => async (dispatch) => {
	try {
		dispatch({type: VENDOR_DETAILS_REQUEST})

		const {data} = await axios.get(`/api/vendors/${id}`)

		dispatch({
			type: VENDOR_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: VENDOR_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const deleteVendor = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: VENDOR_DELETE_REQUEST,
		})

		const {
			userLogin: {userInfo},
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		await axios.delete(`/api/vendors/${id}`, config)

		dispatch({
			type: VENDOR_DELETE_SUCCESS,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: VENDOR_DELETE_FAIL,
			payload: message,
		})
	}
}

export const createVendor = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: VENDOR_CREATE_REQUEST,
		})

		const {
			userLogin: {userInfo},
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const {data} = await axios.post(`/api/vendors`, {}, config)

		dispatch({
			type: VENDOR_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: VENDOR_CREATE_FAIL,
			payload: message,
		})
	}
}

export const updateVendor = (vendor) => async (dispatch, getState) => {
	try {
		dispatch({
			type: VENDOR_UPDATE_REQUEST,
		})

		const {
			userLogin: {userInfo},
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const {data} = await axios.put(`/api/vendors/${vendor._id}`, vendor, config)

		dispatch({
			type: VENDOR_UPDATE_SUCCESS,
			payload: data,
		})
		dispatch({type: VENDOR_DETAILS_SUCCESS, payload: data})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: VENDOR_UPDATE_FAIL,
			payload: message,
		})
	}
}
