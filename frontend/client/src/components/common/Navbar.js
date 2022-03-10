import React, { useEffect } from 'react'
import { AiFillHome } from "react-icons/ai"
import { RiUserFill } from "react-icons/ri";
import { GiConverseShoe } from "react-icons/gi";
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'

import { userIsAuthenticated } from '../auth/helpers';



const NavBar = () => {

    return (
        <>
            {userIsAuthenticated() ? (
                <>
                <Nav className='navbar '>
                    <Button className='btn btn-dark' href='/' >
                        <AiFillHome />
                    </Button>

                    <Button className='btn btn-dark' href='/products'>
                        <GiConverseShoe />
                    </Button>


                    <Button className='btn btn-dark' href='/profile'>
                        <RiUserFill />
                    </Button>
                </Nav>
                </>
            ) : (
                <>
                <Nav className='navbar'>
                    <Button className='btn btn-dark' href='/' >
                        <AiFillHome />
                    </Button>

                    <Button className='btn btn-dark' href='/products'>
                        <GiConverseShoe />
                    </Button>


                    <Button className='btn btn-dark'href='/login'>
                        <RiUserFill />
                    </Button>
                </Nav>
                </>
            )}
        </>
    )
}

export default NavBar
