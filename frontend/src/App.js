import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import TopFooter from './components/TopFooter'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductHomeScreen from './screens/ProductHomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import CategoryListScreen from './screens/CategoryListScreen'
import CategoryEditScreen from './screens/CategoryEditScreen'
import FeatureListScreen from './screens/FeatureListScreen'
import FeatureEditScreen from './screens/FeatureEditScreen'
import VendorListScreen from './screens/VendorListScreen'
import VendorEditScreen from './screens/VendorEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import ContactScreen from './screens/ContactScreen'
import AboutScreen from './screens/AboutScreen'


const App = () => {
	return (
		<>
			<Router>
				<Header />

				<main className=" maincontainer">
					<Container>
						<Route path="/contact" component={ContactScreen} />
						<Route path="/about" component={AboutScreen} />
						<Route path="/order/:id" component={OrderScreen} />
						<Route path="/shipping" component={ShippingScreen} />
						<Route path="/payment" component={PaymentScreen} />
						<Route path="/placeorder" component={PlaceOrderScreen} />
						<Route path="/login" component={LoginScreen} />
						<Route path="/register" component={RegisterScreen} />
						<Route path="/profile" component={ProfileScreen} />
						<Route path="/product/:id" component={ProductScreen} />
						<Route path="/cart/:id?" component={CartScreen} />
						<Route path="/admin/userlist" component={UserListScreen} />
						<Route path="/admin/user/:id/edit" component={UserEditScreen} />
						<Route
							path="/admin/productlist"
							component={ProductListScreen}
							exact
						/>
						<Route
							path="/admin/productlist/:pageNumber"
							component={ProductListScreen}
							exact
						/>
						<Route
							path="/admin/categorylist"
							component={CategoryListScreen}
							exact
						/>
						<Route
							path="/admin/featurelist"
							component={FeatureListScreen}
							exact
						/>
						<Route
							path="/admin/vendorlist"
							component={VendorListScreen}
							exact
						/>
						<Route
							path="/admin/product/:id/edit"
							component={ProductEditScreen}
						/>
						<Route
							path="/admin/category/:id/edit"
							component={CategoryEditScreen}
						/>
						<Route
							path="/admin/feature/:id/edit"
							component={FeatureEditScreen}
						/>
						<Route path="/admin/vendor/:id/edit" component={VendorEditScreen} />
						<Route path="/admin/orderlist" component={OrderListScreen} />
						<Route
							path="/search/:keyword"
							component={ProductHomeScreen}
							exact
						/>
						<Route path="/" component={HomeScreen} exact />
					</Container>
				</main>
				<TopFooter />
				<Footer />
			</Router>
		</>
	)
}

export default App
