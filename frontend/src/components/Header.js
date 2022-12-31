import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {logout} from '../actions/userActions'

const Header = () => {
	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const {userInfo} = userLogin

	const logoutHandler = () => {
		dispatch(logout())
	}

	return (
		<header style={{marginBottom: '20px'}}>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect fixed="top">
				<Container>
					<LinkContainer to="/">
<<<<<<< HEAD
						<Navbar.Brand>Robbie Greenwood</Navbar.Brand>
=======
						<Navbar.Brand>BEASTIES</Navbar.Brand>
>>>>>>> origin/master
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<LinkContainer to="/cart">
								<Nav.Link>
									<i className="fas fa-shopping-cart"></i> Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id="username">
									<LinkContainer to="/profile">
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>
										<i className="fas fa-user"></i> Sign In
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title="Admin" id="adminmenu">
									<LinkContainer to="/admin/userlist">
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/categorylist">
										<NavDropdown.Item>Categories</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/productlist">
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/orderlist">
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/featurelist">
										<NavDropdown.Item>Feature</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/admin/vendorlist">
										<NavDropdown.Item>Vendor</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header