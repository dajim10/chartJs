import React from 'react'
import Chartcomponent from './components/Chartcomponent'
import './App.css'

import ExportToJPG from './components/ExportToJpg'
import Area from './components/Area'
import Navbar from './components/Navbar'

import { Routes, Route } from 'react-router-dom'

// import BarChart from './components/PieChart'
// Test Deployment ******
const App = () => {


    return (
        <>
            {/* <Navbar /> */}

            <div className="row">
                <div className="col-12 fload-right">

                    {/* <ExportToJPG /> */}
                    <Routes>
                        <Route path="/" element={<ExportToJPG />} />
                        <Route path="/ars" element={<Area />} />
                    </Routes>
                </div>
            </div>


        </>
    )
}

export default App