import React from 'react'
import Overview from './Pages/Overview/Overview'
import Network from './Pages/Chat/Course1'
import Software_Engineering from './Pages/Chat/Course2'
import System_Design from './Pages/Chat/Course3'
// import Course4 from './Pages/Chat/Course4'
import My_Profile from './Pages/My_Profile/My_Profile'
import Settings from './Pages/Settings/Settings'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Forget_Pass_PhoneNum from './Pages/Password_Pages/Forget_Pass_PhoneNum'
import Forget_Pass_Email from './Pages/Password_Pages/Forget_Pass_Email'
import Reset_Password from './Pages/Password_Pages/Reset_Password'
import Confirm_Email from './Pages/Password_Pages/Confirm_Email'
import Confirm_Email2 from './Pages/Password_Pages/Confirm_Email2'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './Components/Context/authContext'




const App = () => {
  
  
  const email = 'medhatyounan776@gmail.com'; // Replace with the actual email
  
  return (
    <div>


      <AuthProvider>
        <Router>
          <Routes>
            <Route path = '/network' element={ <Network/> } />
            <Route path = '/' element={ <Software_Engineering/> } />
            <Route path = '/system-design' element={ <System_Design/> } />
            {/* <Route path = '/course4' element={ <Course4/> } /> */}
            <Route path = '/myprofile' element={ <My_Profile/> } />
            <Route path = '/settings' element={ <Settings/> } /> 
            <Route path = '/login' element = { <Login/> } /> 
            <Route path = '/signup' element = { <Signup/> } /> 
            <Route path = '/forget-Password-With-Email' element = { <Forget_Pass_Email/> } /> 
            <Route path = '/forget-password-phone' element = { <Forget_Pass_PhoneNum/> } /> 
            <Route path = '/resetpassword' element = { <Reset_Password/> } /> 
            <Route path = '/confirmphone' element = { <Confirm_Email email={email} /> } /> 
            <Route path = '/confirmEmail' element = { <Confirm_Email2 email={email} /> } /> 
          </Routes>
        </Router>
      </AuthProvider>


    </div>
  )
}

export default App