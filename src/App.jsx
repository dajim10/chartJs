import React, { useEffect, useState } from 'react'
import Chartcomponent from './components/Chartcomponent'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'


import Area from './components/Area'


import { Routes, Route, Link } from 'react-router-dom'
import BarChart from './components/BarChart_bk'
const App = () => {

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        async function counterStart() {
            let res = await fetch("https://api.rmutsv.ac.th/counter/ars");
            let count = await res.json();
            // document.getElementById("counter").innerHTML = count.counter;
            setCounter(count.counter);
        }
        counterStart();
    }
        , []);


    return (
        <>

            <div className="container">
                <div className="col-12 fload-right">

                    <Routes>
                        <Route path="/" element={<Chartcomponent counter={counter} />} />
                        <Route path="/area" element={<Area counter={counter} />} />
                    </Routes>
                </div>

            </div>


        </>
    )
}

export default App
