import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import NavbarRegister from '../../Components/NavbarRegister/NavbarRegister';
import './Login.css';
import LLtutorLogo from '../../assets/lltutor-logo.svg';
import Facebook from '../../assets/facebook.png';
import Google from '../../assets/google.png';
import Microsoft from '../../assets/microsoft.png';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Components/Context/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { setToken } = useContext(authContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      EMAILORPHONE: email,
      PASSWORD: password,
      Rememberme: rememberMe ? 1 : 0
    };

    try {
      const response = await axios.post('https://lltutor.runasp.net/accounts/login', payload);
      console.log('Login successful:', response.data);

      if (response.status === 200) {
        setToken(response.data.token);
        navigate('/myprofile'); // Redirect to the profile page
      } else {
        setModalMessage('Login failed. Please check your Email & Password and try again.');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setModalMessage('Login failed. Please check your Email & Password and try again.');
      setShowModal(true);
    }
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      <div id='login-main' className='container-fluid'>
        {/* HEADER */}
        <div>
          <NavbarRegister />
        </div>

        {/* Body */}
        <div className='login-body container'>
          <div id='login' className='col-6'>
            {/* Logo & Welcome message */}
            <div className='head-login'>
              <div className='welcome-msg'>
                <h5><b>Welcome To</b></h5>
              </div>

              <div className='head-logo'>
                <img src={LLtutorLogo} alt="LLtutor_Logo" />
              </div>
            </div>

            <form id='login-form' onSubmit={handleLogin}>
              <div className='form-group-login'>
                <label htmlFor="email-login-input"> Email </label>
                <input type="email" value={email} name='email_login' className='login-inputs form-control' placeholder='example@gmail.com' onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className='form-group-login'>
                <label htmlFor="pass-login-input"> Password <span className='text-important'> * </span> </label>
                <input type="password" value={password} name='email_login' className='login-inputs form-control' placeholder='********' onChange={(e) => setPassword(e.target.value)} required />
              </div>

              {/* REMEMBER ME & FORGOT PASSWORD */}
              <div className='rem-for-container'>
                <div className='col remember-me'>
                  <label forhtml='remember'>
                    <input type="checkbox" checked={rememberMe} name='remember-me' className='input-checkbox' id='remember' onChange={(e) => setRememberMe(e.target.checked)} /> Remember me
                  </label>
                </div>

                <div className='col forget-password'>
                  <Link to="/forget-Password-With-Email" className='link-forgetPass-login'>
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <div className='login-btn-container'>
                <button className='login-btn' type='submit'> Login </button>
              </div>
            </form>
            {/* <div className='log-with-parent'>
              <div className='login-text'>
                -- OR --
                <br />
                <span> Login With </span>
              </div>

              <div className='login-with-btns-container'>
                <button className='login-with-btn col-3 text-facebook'>
                  <img src={Facebook} alt="facebook_icon" className='me-2' />
                  Facebook
                </button>
                <button className='login-with-btn col-3 text-google'>
                  <img src={Google} alt="google_icon" className='me-2' />
                  Google
                </button>
                <button className='login-with-btn col-3 text-microsoft'>
                  <img src={Microsoft} alt="microsoft_icon" className='me-2' />
                  Microsoft
                </button>
              </div>
            </div> */}

            {/* Create account */}
            <div className='new-account'>
              Don't have an account? <Link to='/signup' className='link-goSignup'> Create an account </Link>
            </div>
          </div>
        </div>

        {/* Modal for error message */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Login;
