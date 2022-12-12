import {
	FEATURE_LIST_REQUEST,
	FEATURE_LIST_SUCCESS,
	FEATURE_LIST_FAIL,
	FEATURE_DETAILS_REQUEST,
	FEATURE_DETAILS_SUCCESS,
	FEATURE_DETAILS_FAIL,
	FEATURE_DELETE_REQUEST,
	FEATURE_DELETE_SUCCESS,
	FEATURE_DELETE_FAIL,
	FEATURE_CREATE_RESET,
	FEATURE_CREATE_FAIL,
	FEATURE_CREATE_SUCCESS,
	FEATURE_CREATE_REQUEST,
	FEATURE_UPDATE_REQUEST,
	FEATURE_UPDATE_SUCCESS,
	FEATURE_UPDATE_FAIL,
	FEATURE_UPDATE_RESET,
} from '../constants/featureConstants'

export const featureListReducer = (state = {features: []}, action) => {
	switch (action.type) {
		case FEATURE_LIST_REQUEST:
			return {loading: true, features: []}
		case FEATURE_LIST_SUCCESS:
			return {
				loading: false,
				features: action.payload.features,
				pages: action.payload.pages,
				page: action.payload.page,
			}
		case FEATURE_LIST_FAIL:
			return {loading: false, error: action.payload}
		default:
			return state
	}
}

export const featureDetailsReducer = (
	state = {feature: {reviews: []}},
	action
) => {
	switch (action.type) {
		case FEATURE_DETAILS_REQUEST:
			return {...state, loading: true}
		case FEATURE_DETAILS_SUCCESS:
			return {loading: false, feature: action.payload}
		case FEATURE_DETAILS_FAIL:
			return {loading: false, error: action.payload}
		default:
			return state
	}
}

export const featureDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case FEATURE_DELETE_REQUEST:
			return {loading: true}
		case FEATURE_DELETE_SUCCESS:
			return {loading: false, success: true}
		case FEATURE_DELETE_FAIL:
			return {loading: false, error: action.payload}
		default:
			return state
	}
}

export const featureCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case FEATURE_CREATE_REQUEST:
			return {loading: true}
		case FEATURE_CREATE_SUCCESS:
			return {loading: false, success: true, feature: action.payload}
		case FEATURE_CREATE_FAIL:
			return {loading: false, error: action.payload}
		case FEATURE_CREATE_RESET:
			return {}
		default:
			return state
	}
}

export const featureUpdateReducer = (state = {feature: {}}, action) => {
	switch (action.type) {
		case FEATURE_UPDATE_REQUEST:
			return {loading: true}
		case FEATURE_UPDATE_SUCCESS:
			return {loading: false, success: true, feature: action.payload}
		case FEATURE_UPDATE_FAIL:
			return {loading: false, error: action.payload}
		case FEATURE_UPDATE_RESET:
			return {feature: {}}
		default:
			return state
	}
}
