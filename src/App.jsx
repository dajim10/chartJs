import React from 'react'
import Chartcomponent from './components/Chartcomponent'
import './App.css'

import ExportToJPG from './components/ExportToJpg'
import Area from './components/Area'
import Navbar from './components/Navbar'

import { Routes, Route, Link } from 'react-router-dom'
import BarChart from './components/BarChart_bk'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // The Bootstrap JavaScript file
import 'popper.js/dist/umd/popper.min.js'; // Popper.js


// import BarChart from './components/PieChart'
// Test Deployment ******
const App = () => {


    return (
        <>
            {/* <Navbar /> */}

            <div className="container">
                <div className="col-12 fload-right">
                    {/* <div className='sticky-top' style={{ backdropFilter: 'blur(5px)' }}> */}
                    {/* <Link to="/" className='btn btn-primary m-2 rounded-pill'>Home</Link>
                        <Link to="/area" className='btn btn-primary m-2 rounded-pill'>Area Report</Link> */}
                    {/* </div> */}
                    {/* <ExportToJPG /> */}
                    <Routes>
                        <Route path="/" element={<Chartcomponent />} />
                        <Route path="/area" element={<Area />} />
                    </Routes>
                </div>
            </div>


        </>
    )
}

export default App
