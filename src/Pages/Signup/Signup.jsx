import React, { useState, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import NavbarRegister from '../../Components/NavbarRegister/NavbarRegister';
import LLtutorLogo from '../../assets/lltutor-logo.svg';
import Facebook from '../../assets/facebook.png';
import Google from '../../assets/google.png';
import Microsoft from '../../assets/microsoft.png';
import Egypt from '../../assets/egypt.png';
import './Signup.css';
import { Link } from 'react-router-dom';


const Signup = () => {
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nationality: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'phoneNumber') {
      const isValidPhone = /^[0-9]*$/.test(value);
      setPhoneError(isValidPhone ? '' : 'Phone number should only contain digits');
    }

    if (name === 'password' || name === 'confirmPassword') {
      validatePassword({ ...formData, [name]: value });
    }
  };

  const validatePassword = ({ password, confirmPassword }) => {
    const passwordRules = [
      { test: password.length >= 8, message: 'Password must be at least 8 characters long' },
      { test: /[!@#$%^&*(),.?":{}|<>]/.test(password), message: 'Password must contain at least one special character' },
      { test: password === confirmPassword, message: 'Passwords do not match' }
    ];

    const failedRules = passwordRules.filter(rule => !rule.test);
    if (failedRules.length > 0) {
      setPasswordError(failedRules.map(rule => rule.message).join(', '));
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError || phoneError) {
      return;
    }

    const data = JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      nationality: formData.nationality,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      password: formData.password
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://lltutor.runasp.net/accounts/register',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      if (response.status === 200) {
        setMessage('Signup successful! Please check your email to confirm your account.');
        navigate('/login'); // Replace '/nextpage' with the actual path you want to navigate to
      } else {
        setError('Unexpected response status: ' + response.status);
      }
      setError('');
    } catch (error) {
      setError('Signup failed. Please try again.');
      setMessage('');
    }
  };

  return (
    <div id='signup-main' className='container-fluid'>
      <NavbarRegister />

      <div id='signup-body' className='container'>
        <div className='signup-container col-6'>
          <div className='header-signup'>
            <div className='welcome-message'>
              Welcome To <img src={LLtutorLogo} alt="LLtutor_Logo" />
            </div>
          </div>

          <form className='signup-form' onSubmit={handleSubmit}>
            <div className='form-row-signup'>
              <div className='form-group-signup pe-2'>
                <label htmlFor="firstName">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  id="firstName" 
                  className='inputName' 
                  placeholder='Default' 
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='form-group-signup ps-2'>
                <label htmlFor="lastName">Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  id="lastName" 
                  className='inputName' 
                  placeholder='Default'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className='form-group-signup'>
              <label htmlFor="nationality">Country</label>
              <div className='input-group'>
                <span className='input-group-text'><img src={Egypt} alt="flag" /></span>
                <select 
                  name="nationality" 
                  className='form-select' 
                  value={formData.nationality} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose your country</option>
                  <option value="egypt">Egypt</option>
                  <option value="morocco">Morocco</option>
                  <option value="tunisia">Tunisia</option>
                </select>
              </div>
            </div>

            <div className='form-group-signup'>
              <label htmlFor="phoneNumber">Phone Number <span className='text-red-1000'>*</span></label>
              <input 
                type="text" 
                name='phoneNumber' 
                id='phoneNumber' 
                placeholder='+2012344567891' 
                className='input-signup'
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              {phoneError && <div className="text-danger">{phoneError}</div>}
            </div>
            
            <div className='form-group-signup'>
              <label htmlFor="email">Email <span className='text-red-1000'>*</span></label>
              <input  
                type="email" 
                name='email' 
                id='email' 
                className='input-signup' 
                placeholder='example@gmail.com'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group-signup'>
              <label htmlFor="password-signup">Password <span className='text-red-1000'>*</span></label>
              <input 
                type="password" 
                name='password' 
                id='password-signup' 
                className='input-signup' 
                placeholder='**********'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group-signup'>
              <label htmlFor="confirm-password-signup">Confirm Password <span className='text-red-1000'>*</span></label>
              <input 
                type="password" 
                name='confirmPassword' 
                id='confirm-password-signup' 
                className='input-signup' 
                placeholder='**********'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {passwordError && <div className="text-danger">{passwordError}</div>}
            </div>

            <div className='term-policy-container'>
              <label htmlFor='accept'>
                <input type="checkbox" name='terms' className='input-checkbox-signup' id='accept' required /> 
                I agree to univortal's Terms of Services, Privacy Policy and Cookie Policy
              </label>
            </div>

            <div className='signup-btn-container'>
              <button type="submit">Sign up</button>
            </div>
            
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
          </form>

          <div className='footer-signup'>
            {/* <div className='sign-with-parent'>
              <div className='signup-text'>
                -- OR --
                <br />
                <span>Signup With</span>
              </div>
            </div>

            <div className='signup-btns-container'>
              <button className='signup-with-btn col-3 text-facebook'>
                <img src={Facebook} alt="facebook_icon" className='me-2' />
                Facebook
              </button>

              <button className='signup-with-btn col-3 text-google'>
                <img src={Google} alt="google_icon" className='me-2' />
                Google
              </button>

              <button className='signup-with-btn col-3 text-microsoft'>
                <img src={Microsoft} alt="microsoft_icon" className='me-2' />
                Microsoft
              </button>
            </div> */}

            <div className='old-account mt-4 col text-center fw-bolder'>
              You have an account? <Link to="/login" className='link-go-login-fromSignup'>Login</Link> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
