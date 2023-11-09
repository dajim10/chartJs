import React, { useEffect } from 'react'
import Chartcomponent from './components/Chartcomponent'
import './App.css'

import ExportToJPG from './components/ExportToJpg'
import Area from './components/Area'
import Navbar from './components/Navbar'

import { Routes, Route, Link } from 'react-router-dom'
import BarChart from './components/BarChart_bk'

const App = () => {

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }
        , []);


    return (
        <>

            <div className="container">
                <div className="col-12 fload-right">

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
