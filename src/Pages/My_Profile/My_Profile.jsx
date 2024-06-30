import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import Profile from '../../assets/head-img.png';
import Edit from '../../assets/edit.png';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './My_Profile.css';
import { authContext } from '../../Components/Context/authContext';

const My_Profile = () => {
  const { token } = useContext(authContext);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    nationality: '',
    phoneNumber: '',
    phoneNumber2: '',
    email: '',
    gender: 'M',
    location: '',
    dateOfBirth: ''
  });

  const [profilePicture, setProfilePicture] = useState(Profile);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfile = async () => {
    if (!token) {
      setError('Unauthorized. Please log in.');
      return;
    }

    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://lltutor.runasp.net/accounts/currentuser',
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.request(config);
      const data = response.data;

      // Format the dateOfBirth correctly
      if (data.dateOfBirth) {
        data.dateOfBirth = data.dateOfBirth.split('T')[0];
      }

      setProfile(data);
      if (data.profilePicture) {
        setProfilePicture(data.profilePicture);
      }

      console.log('Fetched profile:', data);
    } catch (error) {
      setError('There was an error fetching the profile data!');
      console.error('Error:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    try {
      let data = JSON.stringify(profile);
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'https://lltutor.runasp.net/accounts/updatecurrent',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: data
      };

      const response = await axios.request(config);

      if (response.status === 204 || response.status === 200) {
        setMessage('Profile updated successfully');
        setIsEditing(false);
        setTimeout(() => {
          setMessage('');
        }, 5000); // Clear message after 5 seconds
      } else {
        setError('Unexpected response status: ' + response.status);
      }

      console.log('Updated profile:', profile);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If 401 Unauthorized, refetch the profile data
        fetchProfile();
      } else {
        setError('There was an error updating the profile!');
      }
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const config = {
        method: 'post',
        url: 'https://lltutor.runasp.net/accounts/updateProfilePicture',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      };

      const response = await axios.request(config);

      if (response.status === 200) {
        setProfilePicture(URL.createObjectURL(file));
        setMessage('Profile picture updated successfully');
        setTimeout(() => {
          setMessage('');
        }, 5000); // Clear message after 5 seconds
      } else {
        setError('Unexpected response status: ' + response.status);
      }
    } catch (error) {
      setError('There was an error updating the profile picture!');
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <div id='myProfile__page' className='container-fluid'>
      <Navbar />
      <div className='myProfile-body-container'>
        <div className='goBack-container container'>
          <a href="/"> <ArrowBackIosRoundedIcon style={{ fontSize: 30 }} /> Profile </a>
        </div>
        <div className="user-profile container">
          <div id='title'>
            <div className='col-2 student-info'> Student Info </div>
          </div>
          <div className='profile-picture col-12'>
            <img src={profilePicture} alt="Profile-picture" className='img-thumbnail' />
            {isEditing && (
              <div className="form-group">
                <label htmlFor="profilePicture">Change Profile Picture</label>
                <input 
                  type="file" 
                  id="profilePicture" 
                  name="profilePicture" 
                  className='form-control' 
                  onChange={handleProfilePictureChange} 
                  accept="image/*"
                />
              </div>
            )}
          </div>
          <form id='profile-form'>
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor="firstName"> First Name </label>
                <input
                  type="text"
                  id='firstName'
                  name='firstName'
                  className='input-styled form-control'
                  value={profile.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className='form-group'>
                <label htmlFor="lastName"> Last Name </label>
                <input
                  type="text"
                  id='lastName'
                  name='lastName'
                  className='input-styled form-control'
                  value={profile.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className='form-row'>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name='email'
                  id='email'
                  className='input-styled form-control'
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nationality">Nationality</label>
                <input
                  type="text"
                  name='nationality'
                  id='nationality'
                  className='input-styled form-control'
                  value={profile.nationality}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phoneNumber"> Phone1 </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  className='input-styled form-control'
                  value={profile.phoneNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber2"> Phone2 </label>
                <input
                  type="tel"
                  name="phoneNumber2"
                  id="phoneNumber2"
                  className='input-styled form-control'
                  value={profile.phoneNumber2}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location"> Location </label>
                <div className="input-group">
                  <input
                    type="text"
                    id='location'
                    name='location'
                    className='input-styled form-control'
                    value={profile.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  <button type="button" className='input-group-text bg-color-w' disabled={!isEditing}>
                    <FmdGoodOutlinedIcon style={{ fontSize: 30 }} />
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth"> Date Of Birth </label>
                <input
                  type="date"
                  id='dateOfBirth'
                  name='dateOfBirth'
                  className='input-styled form-control'
                  value={profile.dateOfBirth}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group ">
                <label className='mb-2'> Gender </label>
                <div className='gender-options'>
                  <label className='gender col-1'>
                    <input
                      type="radio"
                      name='gender'
                      className='input-check-style'
                      value='M'
                      checked={profile.gender === 'M'}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    Male
                  </label>
                  <label className='gender col-1'>
                    <input
                      type="radio"
                      name='gender'
                      className='input-check-style'
                      value='F'
                      checked={profile.gender === 'F'}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    Female
                  </label>
                </div>
              </div>
            </div>
            <div className="button-group col">
              <button type="button" className='edit-btn bg-gray-1000' onClick={handleEditToggle}>
                <img src={Edit} alt="Edit" className='mx-2' /> {isEditing ? 'Cancel' : 'Edit'}
              </button>
              
              <button type="button" className='save-changes btn btn-success' onClick={handleSaveChanges} disabled={!isEditing}>
                Save Changes
              </button>
            </div>
          </form>
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default My_Profile;
