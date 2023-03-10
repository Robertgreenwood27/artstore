import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
	productReviewCreateReducer,
	productTopRatedReducer,
} from './reducers/productReducers'
import {
	categoryListReducer,
	categoryDetailsReducer,
	categoryDeleteReducer,
	categoryCreateReducer,
	categoryUpdateReducer,
} from './reducers/categoryReducers'
import {
	featureListReducer,
	featureDetailsReducer,
	featureDeleteReducer,
	featureCreateReducer,
	featureUpdateReducer,
} from './reducers/featureReducers'
import {
	vendorListReducer,
	vendorDetailsReducer,
	vendorDeleteReducer,
	vendorCreateReducer,
	vendorUpdateReducer,
} from './reducers/vendorReducers'
import {cartReducer} from './reducers/cartReducers'
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
} from './reducers/userReducers'
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderDeliverReducer,
	orderListMyReducer,
	orderListReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
	featureList: featureListReducer,
	featureDetails: featureDetailsReducer,
	featureDelete: featureDeleteReducer,
	featureCreate: featureCreateReducer,
	featureUpdate: featureUpdateReducer,
	vendorList: vendorListReducer,
	vendorDetails: vendorDetailsReducer,
	vendorDelete: vendorDeleteReducer,
	vendorCreate: vendorCreateReducer,
	vendorUpdate: vendorUpdateReducer,
	categoryList: categoryListReducer,
	categoryDetails: categoryDetailsReducer,
	categoryDelete: categoryDeleteReducer,
	categoryCreate: categoryCreateReducer,
	categoryUpdate: categoryUpdateReducer,
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productReviewCreate: productReviewCreateReducer,
	productTopRated: productTopRatedReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliverReducer,
	orderListMy: orderListMyReducer,
	orderList: orderListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {}

const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
	},
	userLogin: {userInfo: userInfoFromStorage},
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
