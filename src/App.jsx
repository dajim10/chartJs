import React, { useEffect, useState } from 'react'
import Chartcomponent from './components/Chartcomponent'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'


import Area from './components/Area'


import { Routes, Route, Link } from 'react-router-dom'
import BarChart from './components/BarChart_bk'
// import LoginForm from './components/Login'
const App = () => {

    const [counter, setCounter] = useState(0);
    const [cookie, setCookie] = useState('');



    useEffect(() => {

        async function counterStart() {
            let res = await fetch("https://api.rmutsv.ac.th/counter/ars");
            let count = await res.json();
            // document.getElementById("counter").innerHTML = count.counter;
            setCounter(count.counter);
        }

        async function counterGet() {
            let res = await fetch("https://api.rmutsv.ac.th/counter/ars/get");
            let count = await res.json();
            // document.getElementById("counter").innerHTML = count.counter;
            setCounter(count.counter);
        }
        // check cookie ars if have cookie not count up 
        if (document.cookie.indexOf('ars') >= 0) {
            // console.log('have cookie');
            counterGet();
        } else {
            // console.log('not have cookie');
            // set cookie timeout
            let d = new Date();
            d.setTime(d.getTime() + (5 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = `ars=1;${expires};path=/`;
            counterStart();
        }
    }
        , []);


    return (
        <>

            <div className="container-fluid">
                <div className="col-12 fload-right">

                    <Routes>
                        <Route path="/" element={<Chartcomponent counter={counter} />} />
                        {/* <Route path="/login" element={<LoginForm />} /> */}
                        <Route path="/area" element={<Area counter={counter} />} />
                    </Routes>
                </div>

            </div>


        </>
    )
}

export default App
