import React, { useState, useEffect } from 'react'
import Header from './Header';
import BarChart from './BarChart';
// <<<<<<< HEAD
import Logo from '../assets/LOGO-RUTS-10.png'

// =======
// >>>>>>> 9b00ccb06875d6d75933b8470c7591afff9900f3


const Area = () => {

    const [data, setData] = useState([]);
    const [campus, setCampus] = useState([]);





    useEffect(() => {
        fetch('https://ars.rmutsv.ac.th/json')
            .then(response => response.json())
            .then(data => {
                setData(data.university)
            })
            .catch(error => console.log(error))

    }
        , []);


    return (
        <div className='container-fluid'>
            <div className="container mt-3">
                <Header />
                <BarChart data={data} />
            </div>



        </div>
    )
}

export default Area