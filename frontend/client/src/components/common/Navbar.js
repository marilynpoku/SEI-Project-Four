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
                <Nav sticky="bottom" className="navbar sticky-bottom">
                    <Button href='/' >
                        <AiFillHome />
                    </Button>

                    <Button href='/products'>
                        <GiConverseShoe />
                    </Button>


                    <Button href='/profile'>
                        <RiUserFill />
                    </Button>
                </Nav>
                </>
            ) : (
                <>
                <Nav className="navbar sticky-bottom">
                    <Button href='/' >
                        <AiFillHome />
                    </Button>

                    <Button href='/products'>
                        <GiConverseShoe />
                    </Button>


                    <Button href='/login'>
                        <RiUserFill />
                    </Button>
                </Nav>
                </>
            )}
        </>
    )
}

export default NavBar
