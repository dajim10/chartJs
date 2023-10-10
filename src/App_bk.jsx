import React, { useState, useEffect } from 'react'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import Logo from './assets/logo.png'
import Chartcomponent from './components/Chartcomponent'


const App = () => {
  const [facultyData, setfaculty] = useState({
    labels: [],
    datasets: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://stdreport.moo.mywire.org/json')
      .then(response => response.json())
      .then(data => {
        const labels = data.faculty.map(faculty => faculty.name)
        const datasets = data.faculty.map(faculty => faculty.plan)
        setfaculty({
          labels: labels,
          datasets: [
            {
              label: 'faculty',
              data: datasets,

              backgroundColor: [
                'RGB(255, 0, 0,0.5)',
                'RGB(0, 255, 0,0.5)',
                'RGB(0, 0, 255,0.5)',
                'RGB(255, 255, 0,0.5)',
                'RGB(0, 114, 240)',
                'RGB(0, 255, 255,0.5)',
                'RGB(128, 0, 0,0.5)',
                'RGB(0, 128, 0,0.5)',
                'RGB(0, 0, 128,0.6)',
                'RGB(128, 128, 0,0.5)',
                'RGB(128, 0, 128,0.5)',
                'RGB(0, 128, 128,0.5)',
                'RGB(255, 128, 0,0.5)',
                'RGB(255, 0, 128,0.5)',
                'RGB(128, 255, 0,0.5)',
              ],
              borderColor: '#ccc'
            }
          ]
        })
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }
    , [])

  return (
    <div className='container justify-content-center align-items-center'>


      <div className="row">
        <div className="col-lg-6 col-md">
          {loading ? <h4>Loading...</h4> : <h4>รายงานข้อมูลนักศึกษาใหม่ปีการศึกษา 2566</h4>}
          {error ? <h4>Error...</h4> : null}
        </div>
        <div className="col-lg-6 col-md">
          <img src={Logo} alt="Logo" width={250} />

        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md">
          <PieChart chartData={facultyData} />
        </div>
        <div className="col-lg-6 col-md">
          <div className="card" style={{ width: '12rem', backgroundColor: 'blue', color: '#fff', alignItems: 'center' }}>

            <div className="card-body">
              <h5 className="card-title">แผนรับ</h5>
              <h2 className="card-subtitle mb-2 ">4,758</h2>
              <p className="card-text">ร้อยละของแผนรับ</p>
            </div>
          </div>
        </div>
      </div>
      <Chartcomponent />
    </div>

  )
}

export default App