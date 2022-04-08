import React from 'react'
import { userIsAuthenticated, getPayload } from '../auth/helpers'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav, { } from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { Heading } from '@chakra-ui/react'



const NavBar = ( userDeleted ) => {


    const navigate = useNavigate()

    const handleLogout = () => {
        window.localStorage.removeItem('otisx-login-token')
        navigate('/')
    }

    const payload = getPayload()


    return (
        <>
            <header>
                <Navbar expand='sm'>
                    <Container>
                        <Navbar.Brand>
                            <Link to='/'><Heading as='h1' size='4xl' className='text-center'>OTISX</Heading></Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls='basic-navbar-nav"' />
                        <Navbar.Collapse className='justify-content-end'>
                            <Nav.Item>
                                <Link to='/products'>All Trainers</Link>
                            </Nav.Item>
                            {userIsAuthenticated() ?
                                <>
                                    <Nav.Item>
                                        <Link to='/createArticle'>Post Article</Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Link to={`/profile/${payload.sub}`}>Profile</Link>
                                    </Nav.Item>
                                    <Nav.Item onClick={handleLogout}>
                                        <div className='logout'>Logout</div>
                                    </Nav.Item>
                                </>
                                :
                                <>
                                    <Nav.Item>
                                        <Link to='/register'>Join Us</Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Link to='/login'>Login</Link>
                                    </Nav.Item>
                                </>
                            }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}

export default NavBar
