import React from 'react'
import './../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './NavbarRegister.css'
import LogoA from './../../assets/lltutor-logo.svg'
import { Link } from 'react-router-dom'

const NavbarRegister = () => {
    return (
        <>
            <div id='authentication-navbar' className='container-fluid'>
                <Link to="/">
                    <img src={LogoA} alt="LLTutor-Logo" id='responsive-image-authentication'/>

                </Link>
            </div>
        </>
    )
}

export default NavbarRegister