import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import NavbarRegister from '../../Components/NavbarRegister/NavbarRegister'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import './../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './../../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './Forgetpass.css'


const Reset_Password = () => {

  const [newPass, setNewPass] = useState('');
  const [newPassConfirm, setNewPassConfirm] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSymbol;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPass !== newPassConfirm) {
      setError('Passwords do not match');
      return;
    }
    if (!validatePassword(newPass)) {
      setError('Password must be at least 8 characters long, contain upper and lower case letters, a number, and a symbol');
      return;
    }
    
    setError('');
    
    let data = JSON.stringify({
      "email": "medhatyounan776@gmail.com",
      "new_password": newPass,
      "token": "CfDJ8OYVUUnvYxxMuWvet3zlPbk+tXuB777yeagdN1z73Dab6S7QBS+e5senpKQZUPTFBhGlb/M6XOtk0KXEEglwenoagoRbSdml5Wu8DuDTTNB1F5T3mNKqTeT3r7054H8Hmlx0G/6JFStfGczoHna0dm+JGBBHJm6fVrcl9GkPhdRfX9WUe+kQ7hhHAxcKFz29VuztatG8Bf1JbZwX7hyFMGnHAmGWGSXhaJ3ded5BdKz8"
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://lltutor.runasp.net/accounts/ResetPassword', // Update with the correct URL
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    try {
      const response = await axios.request(config);
      setSuccess('Password reset successful');
      console.log(JSON.stringify(response.data));
    } catch (error) {
      setError('Password reset failed');
      console.log(error);
    }
  };

  return (
    <>
      <div id='reset-main' className='container-fluid'>
        
        {/* Header */}
        <div>
          <NavbarRegister />
        </div>

        {/* body */}
        <div id="reset-body" className="container">
          <div className="reset-container col-6">

            {/* header for the container */}
            <div className='head-resetPass'>
              <h3 className='fw-bolder letter-space-1 mb-3'> Reset Password </h3>
              <p className='text-grey-100 letter-space-2'>Please enter the new password </p>
            </div>

            {/* form of reset password */}
            <form className='form-reset' onSubmit={handleSubmit}>
              <div className="form-group-reset">
                <label htmlFor="newPass"> New Password <span className='text-important mx-2'> * </span> </label>
                <div className='input-group-reset'>
                  <input 
                    type={showNewPassword ? 'text' : 'password'}
                    className='input-style-reset' 
                    id='newPass' 
                    placeholder='**********'
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                      {showNewPassword ? <VisibilityOutlinedIcon style={{fontSize:28}} /> : <VisibilityOffOutlinedIcon style={{fontSize:28}} />}
                    </button>
                </div>
              </div>

              <div className="form-group-reset">
                <label htmlFor="newPassConfirm"> Confirm New Password <span className='text-important mx-2'> * </span> </label>
                <div className='input-group-reset'>
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    className='input-style-reset' 
                    id='newPassConfirm' 
                    placeholder='**********'
                    value={newPassConfirm}
                    onChange={(e) => setNewPassConfirm(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <VisibilityOutlinedIcon style={{fontSize:28}} /> : <VisibilityOffOutlinedIcon style={{fontSize:28}} />}
                    </button>
                </div>

                {error && <p className='text-danger p-2'>{error}</p>}
                {success && <p className='text-success p-2'>{success}</p>}
              </div>

              <div className='footer-reset'>
                <button> Confirm Password </button>
              
                <p className='text-grey-200 text-center fw-bolder'>Back To <Link to="/login" className='goLogin-forgetPass'> Login </Link> </p>
              
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reset_Password