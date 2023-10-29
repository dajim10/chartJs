import React, { useState, useEffect } from 'react'
import DataTable from './DataTable';
import BarChart from './BarChart_bk';
import Logo from '../assets/LOGO-RUTS-10.png'
import ExportToJPG from './ExportToJpg';


const Area = () => {
    const currentDate = new Date();


    // Get day, month, and year components
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = currentDate.getFullYear();
    const time = currentDate.toLocaleTimeString();

    // Combine the components to form the date string
    const formattedDate = `${day}/${month}/${year} เวลา ${time} `;
    const [data, setData] = useState([]);
    const [campus, setCampus] = useState([]);


    useEffect(() => {

        fetch('https://ars.rmutsv.ac.th/json')
            .then(response => response.json())
            .then(data => {
                setData(data.university)
            })
            .catch(error => console.log(error))

    }, []);

    useEffect(() => {
        fetch('https://ars.rmutsv.ac.th/json')
            .then(response => response.json())
            .then(data => {
                setCampus(data.campus)
            })
            .catch(error => console.log(error))
    }, [])


    return (
        <div className='container'>
            <BarChart data={data} />
            {/* <div className="py-3 text-center">
                <h3>รายงานข้อมูลการรับเข้านักศึกษา ณ.วันที่ {formattedDate}</h3>
                <p>รอบการรับ / พื้นที่</p>
            </div> */}
            {/* <div className="py-3 text-center">
                <h3 className='text-center color-ruts bg-warning rounded-pill shadow'>รายงานข้อมูลการรับเข้านักศึกษาปีการศึกษา {year + 544} </h3>
                <small style={{ float: 'right' }}>ข้อมูล ณ.วันที่ {formattedDate}</small>
            </div> */}
            <div className="row ">

                <div className="col-lg-9 col-md-12 col-sm">
                    <h3 className='text-center color-ruts bg-warning rounded-pill shadow'>รายงานข้อมูลการรับเข้านักศึกษาปีการศึกษา {year + 544} </h3>
                    <small style={{ float: 'right' }}>ข้อมูล ณ.วันที่ {formattedDate}</small>

                </div>
                <div className="col-lg-3 col-md-12 col-sm">
                    <div className="text-center">

                        <img src={Logo} alt="logo" width={200} id="logo" />

                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    {/* <ExportToJPG /> */}
                </div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-6 col-sm">
                    <h5 className='text-success text-center'>โควต้าพิเศษ</h5>
                    <div className="card mb-4" style={{ background: '#AB47BC', color: '#fff' }}>
                        <div className="card-body text-end m-3">
                            <h5 className="card-title">สมัคร_โควตาพิเศษ</h5>
                            <h4 className="card-text ">{data.applicantqp ? data.applicantqp.toLocaleString() : '0'}</h4>
                        </div>
                    </div>
                    <div className="card mb-4" style={{ background: '#AB47BC', color: '#fff' }}>
                        <div className="card-body text-end m-3">
                            <h5 className="card-title">Cf_โควตาพิเศษ</h5>
                            <h4 className="card-text">{data.confirmqp ? data.confirmqp.toLocaleString() : '0'}</h4>
                        </div>
                    </div>
                    <div className="card mb-4" style={{ background: '#AB47BC', color: '#fff' }}>
                        <div className="card-body text-end m-3">
                            <h5 className="card-title">Stu.i_โควตาพิเศษ</h5>
                            <h4 className="card-text">{data.reportqp ? data.reportqp.toLocaleString() : '0'}</h4>
                        </div>
                    </div>


                </div>
                <div className="col-lg-3 col-md-6 col-sm">
                    <h5 className='text-success text-center'>ปวช./ปวส.</h5>
                    <div className="card mb-4" style={{ background: '#0072F0', color: '#fff' }}>
                        <div className="card-body text-end m-3">
                            <h5 className="card-title">สมัคร_ปวช./ปวส.</h5>
                            <h4 className="card-text">{data.applicanttech ? data.applicanttech.toLocaleString() : '0'}</h4>
                        </div>
                    </div>

                    <div className="card mb-4" style={{ background: '#0072F0', color: '#fff' }}>
                        <div className="card-body text-end m-3">
                            <h5 className="card-title">Cf_ปวช./ปวส.</h5>
                            <h4 className="card-text">{data.confirmtech ? data.confirmtech.toLocaleString() : '0'}</h4>
                        </div>
                    </div>

                    <div className="card mb-4" style={{ background: '#0072F0', color: '#fff' }}>
                        <div className="card-body text-end m-3">
                            <h5 className="card-title">Stu.i_ปวช./ปวส.</h5>
                            <h4 className="card-text">{data.reporttech ? data.reporttech.toLocaleString() : '0'}</h4>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3 col-md-6 col-sm">
                    <h5 className='text-success text-center'>TCAS</h5>
                    <div className="card mb-4" style={{ background: '#AD1457', color: '#fff' }}>
                        <div className="card-body text-end m-3">
                            <h5 className="card-title">สมัคร_ม.6 (TCAS)</h5>
                            <h4 className="card-text">{data.applicantqpm6 ? data.applicanttech.toLocaleString() : '0'}</h4>
                        </div>
                    </div>
                    <div className="card mb-4" style={{ background: '#AD1457', color: '#fff' }}>
                        <div className="card-body text-end m-3">
                            <h5 className="card-title">Cf_ม.6 (TCAS)</h5>
                            <h4 className="card-text">{data.confirmqpm6 ? data.confirmtech.toLocaleString() : '0'}</h4>
                        </div>
                    </div>
                    <div className="card mb-4" style={{ background: '#AD1457', color: '#fff' }}>
                        <div className="card-body text-end m-3">
                            <h5 className="card-title">Stu.i_ม.6 (TCAS)</h5>
                            <h4 className="card-text">{data.reportqpm6 ? data.reporttech.toLocaleString() : '0'}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm">
                    <h5 className='text-success text-center'>รวมทั้งสิ้น</h5>
                    <div className="card mb-4" style={{ background: '#061b8e', color: '#fff' }}>
                        <div className="card-body text-end m-3">
                            <h5 className="card-title">สมัคร</h5>
                            <h4 className="card-text">{data.applicant ? data.applicant.toLocaleString() : '0'}</h4>
                        </div>
                    </div>
                    <div className="card mb-4" style={{ background: '#061b8e', color: '#fff' }}>
                        <div className="card-body text-end m-3">
                            <h5 className="card-title">Cf</h5>
                            <h4 className="card-text">{data.confirm ? data.confirm.toLocaleString() : '0'}</h4>
                        </div>
                    </div>
                    <div className="card mb-4" style={{ background: '#061b8e', color: '#fff' }}>
                        <div className="card-body text-end m-3">
                            <h5 className="card-title">Stu.i</h5>
                            <h4 className="card-text">{data.report ? data.report.toLocaleString() : '0'}</h4>
                        </div>

                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-lg-9 col-md">
                    <DataTable data={campus} />
                </div>
                <div className="col-lg-3 col-md">
                    <div className="card bg-warning text-light">
                        <div className="card-body text-end">
                            <div className="card-title">
                                <h1>แผนรับ</h1>
                                <h5>{data.plan ? data.plan.toLocaleString() : '0'}</h5>
                                <p className='text-start text-success'>100%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Area