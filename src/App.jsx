import React from 'react'
import Chartcomponent from './components/Chartcomponent'
import './App.css'
import Logo from './assets/LOGO-RUTS-10.png'
// import BarChart from './components/PieChart'

const App = () => {
    return (
        <div className="container mt-2">
            <div className="row ">
                <div className="col-lg-9 col-md-12 col-sm">
                    <h3 className='text-center'>รายงานข้อมูลนักศึกษาใหม่ปีการศึกษา 2567</h3>
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
                </div>
            </div>
            {/* <BarChart /> */}

        </div>
    )
}

export default App