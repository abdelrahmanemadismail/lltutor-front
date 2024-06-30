import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarRegister from '../../Components/NavbarRegister/NavbarRegister';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Forgetpass.css';

const Forget_Pass_Email = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendCode = async () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://lltutor.runasp.net/accounts/SendOTPResetPassword?email=${email}`,
      headers: {}
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      setMessage('Code sent successfully! Check your email.');
      setError('');
    } catch (error) {
      console.error(error);
      setMessage('');
      setError('Failed to send code. Please try again.');
    }
  };

  return (
    <>
      <div id='forgetpass-body'>
        <NavbarRegister />

        <div id='forgetPassParent' className='container'>
          <div className='forgetPassContainer col-6'>
            <div className='head-forgetpass'>
              <h3 className='fw-bolder letter-space-1 mb-3'> Forgot Your Password? </h3>
              <p className='text-grey-100 letter-space-2'>Please enter your email to change password.</p>
            </div>

            <div className='emailContainer'>
              <label htmlFor="email-input" className='form-label'> Email </label>
              <input 
                type="email" 
                id='email-input' 
                className='form-control'
                placeholder='example@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className='send-code-forgetpass-btn' onClick={handleSendCode}> Send Code </button>

            {message && <p className='text-success'>{message}</p>}
            {error && <p className='text-danger'>{error}</p>}
            
            <p className='text-grey-100 text-capitalize text-center mt-3'> back to <Link to='/login' className='goLogin-forgetPass'> Login </Link> </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forget_Pass_Email;
