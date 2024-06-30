import React from 'react'
import { Link } from 'react-router-dom'
import { grey } from '@mui/material/colors'
import Logo from './../../assets/logo.svg'
import accountPic from './../../assets/Avatar.png'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './Navbar.css'


const Navbar = () => {
  
  const MenuItems = [
    
    {
        title: 'Network',
        url: '/network',
        cName: 'navbar-links',
        icon: 'bi bi-mortarboard'
    },
    {
        title: 'Software Engineering',
        url: '/',
        cName: 'navbar-links',
        icon: 'bi bi-mortarboard'
    },
    {
        title: 'System Design',
        url: '/system-design',
        cName: 'navbar-links',
        icon: 'bi bi-mortarboard'
    },
    // {
    //     title: 'Mathematics',
    //     url: '/math',
    //     cName: 'navbar-links',
    //     icon: 'bi bi-mortarboard'
    // },
    {
        title: 'My Profile',
        url: '/myprofile',
        cName: 'navbar-links',
        icon: 'bi bi-person'
    },
    {
        title: 'Settings',
        url: '/settings',
        cName: 'navbar-links',
        icon: 'bi bi-gear'
        }
    ]

  return (

    <>
      <nav className='navbar' id='main-navbar'>
      
        <button variant='outlined' className="navbar-toggler nav-toggler" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"> <span className='navbar-toggler-icon'></span> </button>
        
        <div className='offcanvas offcanvas-start' tabIndex="-1" id="offcanvasExample">

          <div className='offcanvas-header'>
            <div className="offcanvasImage"><img src={Logo} alt="LLTutor_Logo" className="offcanvasImgResponsive"/></div>
            <button type="button" className="btn-close myStyledBtnClose" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

          <div className='offcanvas-title'>
            Course Overview
          </div>

          <div className="offcanvas-body">      
            <ul className="offcanvas-list-container">
              {MenuItems.map((item, index) => {
                return(
                  <li className="offcanvas-list" key={index}> 
                    <a href={item.url} className="nav-link btn-offcanvas-list active"> <i className={item.icon} id='icons'></i> {item.title} </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='right-nav-container row row-cols-4'>
          {/* language button */}
          {/* <div className='col changeLang-container '>
              <select className='changeLang c-grey-mine'>
                <option value="English">English</option>
                <option value="العربية">العربية</option>
              </select>
          </div> */}

          {/* notification */}
          <div className='col notificationBtn-container c-grey-mine'>
            <button className='notification-btn'>
              <NotificationsNoneIcon sx={{fontSize: 30, color: grey[800]}}  />
              <span className="icon-button__badge">3</span>
            </button>
          </div>
            
          {/* account name */}
          <div className='col account-name-container'>
            <img src={accountPic} alt="accountPicture" />
            <span className='fs-6 c-grey-mine'>Medhat</span>
          </div>

          {/* <div className='col login-btn-container-course'>
              <Link to='/login' className='login-btn-nav-course '>Login</Link>
          </div> */}
        </div>
      </nav>
    </>
  )
}

export default Navbar