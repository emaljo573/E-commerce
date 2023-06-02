import React from 'react'
import { Navbar, Container, Nav, Badge, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'
import { useLogoutMutation } from '../slice/usersApiSlice'
import {logout} from '../slice/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Header = () => {
    const { cartItems } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.auth)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [logoutApiCall]=useLogoutMutation();
    const logoutHandler = async() => {
        try{
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/login')
        }catch(err){

        }
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Swift Cart</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link ><i className='fas fa-shopping-cart'></i> Cart
                                    {
                                        cartItems.length > 0 && (
                                            <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                                                {cartItems.reduce((a, c) => a + c.qty, 0)}
                                            </Badge>
                                        )
                                    }
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ?
                                (
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item><i className='fas fa-user'></i>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) :
                                (<LinkContainer to="/login">
                                    <Nav.Link><i className='fas fa-user'></i> Sign In</Nav.Link>
                                </LinkContainer>)
                            }


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header >
    )
}

export default Header