import React, { useEffect } from 'react'
import Chartcomponent from './components/Chartcomponent'
import './App.css'
import ReactGA from 'react-ga'
import Area from './components/Area'
import { Routes, Route } from 'react-router-dom'



ReactGA.initialize('G-VN973D1ZET');

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
