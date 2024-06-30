import React from 'react'
import './../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './../../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import Navbar from '../../Components/Navbar/Navbar'
import './Overview.css'



const Overview = () => {
    return (
        <>
            <div className='overview-main'>
                {/* header */}
                <div>
                    <Navbar />
                </div>

                {/* Body */}
                <h1 className='overview-body'>
                    Home
                </h1>
            </div>
        </>
    )
}

export default Overview