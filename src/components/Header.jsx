import React, { useState, useEffect } from 'react'
import Logo from '../assets/LOGO-RUTS-10.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Header = ({ counter }) => {
    const currentDate = new Date();
    // Get day, month, and year components
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = currentDate.getFullYear();
    const time = currentDate.toLocaleTimeString();

    // Combine the components to form the date string
    const formattedDate = `${day}/${month}/${year} เวลา ${time} `;
    return (
        <div className="row ">
            <div className="col-lg-9 col-md-12 col-sm">
                <h3 className='text-center color-ruts bg-warning rounded-pill shadow'>รายงานข้อมูลการรับเข้านักศึกษาปีการศึกษา 2567</h3>
                <small style={{ float: 'right' }}>ข้อมูล ณ.วันที่ {formattedDate}</small>

            </div>
            <div className="col-lg-3 col-md-12 col-sm">
                <div className="text-center">

                    <img src={Logo} alt="logo" width={200} id="logo" />
                    <FontAwesomeIcon icon={faEye} />  {counter}

                </div>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
                {/* <ExportToJPG /> */}
            </div>
        </div>

    )
}

export default Header