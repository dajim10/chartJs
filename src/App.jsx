import React from 'react'
import Chartcomponent from './components/Chartcomponent'
import './App.css'

import ExportToJPG from './components/ExportToJpg'



// import BarChart from './components/PieChart'

const App = () => {



    return (
        <div className="container">
            <div className="row">
                <div className="col-12 fload-right">
                    {/* export to JPG */}
                    <ExportToJPG />
                </div>
            </div>

        </div>
    )
}

export default App