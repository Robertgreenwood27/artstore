import axios from 'axios'
import {
	FEATURE_LIST_REQUEST,
	FEATURE_LIST_SUCCESS,
	FEATURE_LIST_FAIL,
	FEATURE_DETAILS_REQUEST,
	FEATURE_DETAILS_SUCCESS,
	FEATURE_DETAILS_FAIL,
	FEATURE_DELETE_SUCCESS,
	FEATURE_DELETE_REQUEST,
	FEATURE_DELETE_FAIL,
	FEATURE_CREATE_REQUEST,
	FEATURE_CREATE_SUCCESS,
	FEATURE_CREATE_FAIL,
	FEATURE_UPDATE_REQUEST,
	FEATURE_UPDATE_SUCCESS,
	FEATURE_UPDATE_FAIL,
} from '../constants/featureConstants'
import {logout} from './userActions'

export const listFeatures =
	(keyword = '', pageNumber = '') =>
	async (dispatch) => {
		try {
			dispatch({type: FEATURE_LIST_REQUEST})

			const {data} = await axios.get('/api/features')

			dispatch({
				type: FEATURE_LIST_SUCCESS,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: FEATURE_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

export const listFeatureDetails = (id) => async (dispatch) => {
	try {
		dispatch({type: FEATURE_DETAILS_REQUEST})

		const {data} = await axios.get(`/api/features/${id}`)

		dispatch({
			type: FEATURE_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: FEATURE_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const deleteFeature = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: FEATURE_DELETE_REQUEST,
		})

		const {
			userLogin: {userInfo},
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		await axios.delete(`/api/features/${id}`, config)

		dispatch({
			type: FEATURE_DELETE_SUCCESS,
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
			type: FEATURE_DELETE_FAIL,
			payload: message,
		})
	}
}

export const createFeature = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: FEATURE_CREATE_REQUEST,
		})

		const {
			userLogin: {userInfo},
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const {data} = await axios.post(`/api/features`, {}, config)

		dispatch({
			type: FEATURE_CREATE_SUCCESS,
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
			type: FEATURE_CREATE_FAIL,
			payload: message,
		})
	}
}

export const updateFeature = (feature) => async (dispatch, getState) => {
	try {
		dispatch({
			type: FEATURE_UPDATE_REQUEST,
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

		const {data} = await axios.put(
			`/api/features/${feature._id}`,
			feature,
			config
		)

		dispatch({
			type: FEATURE_UPDATE_SUCCESS,
			payload: data,
		})
		dispatch({type: FEATURE_DETAILS_SUCCESS, payload: data})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: FEATURE_UPDATE_FAIL,
			payload: message,
		})
	}
}
