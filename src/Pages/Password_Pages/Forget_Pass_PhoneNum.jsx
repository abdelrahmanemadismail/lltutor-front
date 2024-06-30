import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import NavbarRegister from '../../Components/NavbarRegister/NavbarRegister'
import './../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './../../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './Forgetpass.css'

const Forget_Pass_PhoneNum = () => {
  
  
  return (
    <>
      <div id='forgetpass-body'>
        <NavbarRegister />

        <div id='forgetPassParent' className='container'>
          <div className='forgetPassContainer col-6'>
            <div className='head-forgetpass'>
              <h3 className='fw-bolder letter-space-1 mb-3'> Forgot Your Password? </h3>
              <p className='text-grey-100 letter-space-2'>please enter your phone number to change password </p>
            </div>

            <form className='phoneContainer'>
              <label htmlFor="phone-input" className='form-label'> Phone Number </label>
              <input type="tel" id='phone' className='form-control' placeholder='+201234567891'/>
              <Link className='send-code-forgetpass-btn text-decoration-none text-center' to='/confirmphone' type='submit'> Send Code </Link>
            </form>
            
            <p className='text-grey-100 text-capitalize text-center mt-4'> back to <Link to='/login' className='goLogin-forgetPass'> Login </Link> </p>

          </div>
        </div>
      </div>
    </>
  )
}

export default Forget_Pass_PhoneNum