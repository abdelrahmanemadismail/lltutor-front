import React,{ useState } from 'react'
import axios from 'axios';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Navbar from '../../Components/Navbar/Navbar'
import '../../../node_modules/bootstrap/dist//css/bootstrap.css'
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './Settings.css'

const Settings = () => {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    let data = JSON.stringify({
      "current_password": currentPassword,
      "new_password": newPassword
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'https://lltutor.runasp.net/accounts/changepassword',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJtZWRoYXR5b3VuYW43NzYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtZWRoYXR5b3VuYW43NzZAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwMTIyODA4ODMwOSIsImV4cCI6MTcxOTYxMjUwMSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTk4OCIsImF1ZCI6Ik15U2VjdXJlZEFwcCJ9.3Tp2GNQMOSB4tiA4T06K1vPDyNt-hOHYp20nBxwqfog' // Replace with actual token
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      if (response.status === 200) {
        setSuccess('Password changed successfully');
      }
    } catch (error) {
      console.error('Error changing password:', error.response ? error.response.data : error);
      setError(error.response?.data?.message || 'Error changing password');
    }
  };

  return (
    <>
      <div id='settings-main' className='container-fluid'>
        
        {/* Header */}
        <div>
          <Navbar />
        </div>

        {/* Body */}

        <div className='settings-body container'>

          <div className='goBack-changePassword col-6'>
            <a href="/"> <ArrowBackIosRoundedIcon style={{fontSize:28}}/> Change Password </a>
          </div>

          {/* change password parent  */}
          <div className='change-password-container col-6'>
            
            {/* CONDITIONS AND FORM */}
            <div className='change-password'>

              <div className="conditions mb-5">

                <ul>
                  <li >Minimum of 8 characters </li>
                  <li> Mix of upper and lowercase letters </li>
                  <li> At least one number </li>
                  <li> At least one symbol </li>
                </ul>

                <hr />

              </div>

              {/* Form */}

              <form id='settings-form'>

                <div className='form-group-settings'>

                  <label htmlFor="currentPass">Current Password</label>
                  <div className='input-group-change-pass'>
                    <input 
                      type={showCurrentPassword ? 'text' : 'password'} 
                      id='currentPass' 
                      placeholder='********'
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                      {showCurrentPassword ? <VisibilityOutlinedIcon style={{fontSize:28}} /> : <VisibilityOffOutlinedIcon style={{fontSize:28}} />}
                    </button>
                  </div>

                </div>

                <div className='form-group-settings'>

                  <label htmlFor="newPass">New Password</label>
                  <div className='input-group-change-pass'>
                    <input 
                      type={showNewPassword ? 'text' : 'password'}
                      id='newPass' 
                      placeholder='********'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                      {showNewPassword ? <VisibilityOutlinedIcon style={{fontSize:28}} /> : <VisibilityOffOutlinedIcon style={{fontSize:28}} />}
                    </button>
                  </div>

                </div>

                <div className='form-group-settings'>

                  <label htmlFor="confirmPass">Confirm New Password</label>
                  <div className='input-group-change-pass'>
                    <input 
                      type={showConfirmPassword ? 'text' : 'password'}
                      id='confirmPass' 
                      placeholder='********'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <VisibilityOutlinedIcon style={{fontSize:28}} /> : <VisibilityOffOutlinedIcon style={{fontSize:28}} />}
                    </button>
                  </div>

                </div>

              </form>

            </div>

            <div className='save-parent'>
              <button id='save-changeBtn' className='col-5'  onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>

            {error && <div className='text-danger mt-2'>{error}</div>}
            {success && <div className='text-success mt-2'>{success}</div>}
          </div>

        </div>
      </div>
    </>
  )
}

export default Settings