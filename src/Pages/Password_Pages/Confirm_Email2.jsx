import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom'
import NavbarRegister from '../../Components/NavbarRegister/NavbarRegister'
import './../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './../../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './Password.css'


const Confirm_Email = ({ email }) => {
  
  const [value0, setValue0] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const inputRefs = useRef([]);

  useEffect(() => {
    console.log("Email prop:", email);
  }, [email]);

  const handleChange = (index) => (event) => {
    const inputValue = event.target.value;
    if (/^[0-9]?$/.test(inputValue)) {
      if (inputValue.length === 1 && index < 5) {
        inputRefs.current[index + 1].focus();
      }
      switch (index) {
        case 0: setValue0(inputValue); break;
        case 1: setValue1(inputValue); break;
        case 2: setValue2(inputValue); break;
        case 3: setValue3(inputValue); break;
        case 4: setValue4(inputValue); break;
        case 5: setValue5(inputValue); break;
        default: break;
      }
    }
  };

  const handleVerify = async () => {
    const otp = `${value0}${value1}${value2}${value3}${value4}${value5}`;
    if (!email) {
      setError('Email is required.');
      return;
    }
    try {
      const response = await axios.post('https://lltutor.runasp.net/accounts/ConfirmResetPasswordOTP', {
        otp: otp,
        email: email,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        navigate('/myprofile');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.response ? error.response.data : error);
      setError(error.response?.data?.message || 'Please check your code again');
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && index > 0 && event.target.value === '') {
      inputRefs.current[index - 1].focus();
    }
    if (event.key === 'Enter') {
      handleVerify();
    }
  };

  
  return (
    <>
      
      <div id='confirm-body'>

        <NavbarRegister />
      
        <div id='confirmParent' className='container'>

          <div className='confirmContainer col-6'>

            <div className='head-confirm'>
              <h3 className='fw-bolder letter-space-1'> OTP Verification </h3>
              <p> enter the code we just sent to <span className='text-important'> your Email </span> </p>
            </div>

            <div className='input-otp mx-auto'>
              {[setValue0, setValue1, setValue2, setValue3, setValue4, setValue5].map((setter, index) => (
                <input
                  key={index}
                  type="text"
                  className='otp-ver'
                  placeholder='*'
                  value={[value0, value1, value2, value3, value4, value5][index]}
                  onChange={handleChange(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => inputRefs.current[index] = el}
                  maxLength={1}
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>
            {error && <div className='text-danger text-center mt-2'>{error}</div>}
            <button className='verify-btn mt-4' onClick={handleVerify}> Verify </button>

            <div className='text-grey-100 back-login-container-confirm'>
              Back to<Link to='/login' className='link-goLogin-confirmPhone'> Login</Link>
            </div> 

          </div>
        </div>
      </div>
    
    </>
  )

}

Confirm_Email.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Confirm_Email