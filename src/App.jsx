import React from 'react'
import Chartcomponent from './components/Chartcomponent'
import './App.css'
import Logo from './assets/LOGO-RUTS-10.png'
import ShareThisPage from './components/ShareThisPage'
// import BarChart from './components/PieChart'

const App = () => {

    const currentDate = new Date();

    // Get day, month, and year components
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth()).toString().padStart(2, '0'); // Months are 0-based
    const year = currentDate.getFullYear();
    const time = currentDate.toLocaleTimeString();

    // Combine the components to form the date string
    const formattedDate = `${day}/${month}/${year} เวลา ${time} น.`;

    return (
        <div className="container mt-2">
            <div className="row ">
                <div className="col-lg-9 col-md-12 col-sm">
                    <h3 className='text-center color-ruts bg-warning rounded-pill shadow'>รายงานข้อมูลนักศึกษาใหม่ปีการศึกษา {year + 544} </h3>
                    <small style={{ float: 'right' }}>ข้อมูล ณ.วันที่ {formattedDate}</small>

                </div>
                <div className="col-lg-3 col-md-12 col-sm">
                    <div className="text-center">

                        <img src={Logo} alt="logo" width={200} id="logo" />

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">

                    <Chartcomponent />
                    <ShareThisPage />
                </div>

            </div>

            {/* <BarChart /> */}

        </div>
    )
}

export default App