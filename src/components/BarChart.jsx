import React, { useState, useEffect, useRef } from 'react'
import Highcharts, { numberFormat } from 'highcharts';
import DataTable from './DataTable';
import './Mytable.css';
import ShareThisPage from './ShareThisPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faChartPie, faImage, faHouse } from '@fortawesome/free-solid-svg-icons';
import ExportToExcel from './ExportToExcel';
import { Link } from 'react-router-dom';

import html2canvas from 'html2canvas';
import 'canvas-toBlob';
import saveAs from 'file-saver';
import Header from './Header';

const BarChart = ({ data, counter }) => {

    const [campusData, setCampusData] = useState([]);
    const contentRef = useRef(null);
    const [masterData, setMasterData] = useState([]);


    // const percentApplicant = data.applicant;
    // const percentConfirm = data.confirm;
    // const percentReport = data.report;


    const handleExportClick = () => {
        if (contentRef.current) {
            html2canvas(contentRef.current).then((canvas) => {
                canvas.toBlob((blob) => {
                    saveAs(blob, 'exported-page.jpg');
                });
            });
        }
    };

    useEffect(() => {

        const fetchDate = () => {
            fetch('https://ars.rmutsv.ac.th/json')
                .then(response => response.json())
                .then(data => {
                    setCampusData(data.campus)
                    setMasterData({
                        facultyName: data.faculty.name,
                        plan: data.university.plan,
                        applicant: data.university.applicant,
                        confirm: data.university.confirm,
                        report: data.university.report,
                        percentPlan: '100%',
                        percentApplicant: data.university.applicant / data.university.plan * 100,
                        percentConfirm: data.university.confirm / data.university.plan * 100,
                        percentReport: data.university.report / data.university.plan * 100,
                    })
                })
                .catch(error => console.log(error))
        }
        // Initial data fetch
        fetchDate();

        // Fetch data every 10 seconds
        const interval = setInterval(() => {
            fetchDate();
        }, 10000);


    }, [campusData])




    useEffect(() => {
        Highcharts.chart('chart-container', {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [
                    'โควต้าพิเศษ',
                    'ปวช. ปวส.',
                    'TCAS',
                    'รวมทุกประเภท'

                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'จำนวน (คน)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px;font-family:Sarabun,sans-serif">{point.key}</span><table>',
                pointFormatter: function () {
                    return '<tr><td style="color:' + this.series.color + ';padding:0">' + this.series.name + ': </td>' +
                        '<td style="padding:0"><b>' + Highcharts.numberFormat(this.y, 0, ".", ",") + ' mm</b></td></tr>';
                },
                footerFormat: '</table>',
                shared: true,
                useHTML: true,
            }
            ,

            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'สมัคร',
                data: [data.applicantqp, data.applicanttech, data.applicantqpm6, data.applicant]

            }, {
                name: 'Cf',
                data: [data.confirmqp, data.confirmtech, data.confirmqpm6, data.confirm]


            }, {
                name: 'Stu.i',
                data: [data.reportqp, data.reporttech, data.reportqpm6, data.report]

            }, {

            }
            ]

        });
    }, [data])


    return (
        <div className='container'>

            <nav className='navbar navbar-extended-sm sticky-top' style={{ backdropFilter: 'blur(5px)' }}>

                {/* <Link to="/" className='btn btn-primary rounded-pill mx-auto'>Home</Link> */}
                {/* <Link to="/area" className='btn btn-primary rounded-pill mx-auto'>Area Report</Link> */}
                {/* <button onClick={handleExportClick} className='btn btn-success rounded-pill shadow mx-auto'>Export to JPG</button> */}
                <Link to="/" className='btn btn-primary rounded-pill mx-auto'> <FontAwesomeIcon icon={faHouse} /> {' '}Home</Link>
                <Link to="/area" className='btn btn-primary rounded-pill mx-auto'><FontAwesomeIcon icon={faChartPie} /> {' '}Area Report</Link>
                <button onClick={handleExportClick} className='btn btn-success rounded-pill shadow mx-auto'><FontAwesomeIcon icon={faImage} />{' '}Export to JPG</button>
                <ExportToExcel data={campusData} />

            </nav>
            <div ref={contentRef} id="export-to-jpg">
                <Header counter={counter} />
                <div id="chart-container">


                </div>
                <div className="row mt-4 mb-3">
                    <div className='d-flex justify-content-end align-item-center bg-dark text-light rounded-pill p-2'>
                        <div className='bg-light rounded-pill text-dark p-2'>

                            <ShareThisPage />
                        </div>
                    </div>

                </div>


                <div className="row">

                    <div className="col-lg-8 col-md-12 col-sm column-1">

                        <DataTable data={campusData} />


                    </div>
                    <div className="col col-lg-4 col-md-12 col-sm column-2">

                        <div className="row">

                            <div className="col-lg-6 col-md">
                                <div className="card shadow bg-primary text-light text-center">
                                    <div className="card-body">
                                        <h5 className="card-title">แผน</h5>
                                        <h3 className="card-text bg-light text-dark rounded-pill">{numberFormat(masterData.plan, 0, ".", ",")} </h3>
                                        <p>ร้อยละของแผนรับ</p>
                                        <p className="card-text">{masterData.percentPlan} %</p>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-6 col-md">
                                <div className="card shadow bg-success text-light text-center">
                                    <div className="card-body">
                                        <h5 className="card-title">Cf</h5>
                                        <h3 className="card-text bg-light text-dark rounded-pill">{numberFormat(masterData.confirm, 0, ".", ",")} </h3>
                                        <p>ร้อยละของแผนรับ</p>
                                        <p className="card-text">{numberFormat(masterData.percentConfirm, 2, ".", ",")} %</p>
                                    </div>
                                </div>
                            </div>




                            <div className="col-lg-6 col-md">
                                <div className="card shadow bg-warning text-light text-center">
                                    <div className="card-body">
                                        <h5 className="card-title">สมัคร</h5>
                                        <h3 className="card-text bg-light text-dark rounded-pill">{numberFormat(masterData.applicant, 0, ".", ",")} </h3>
                                        <p>ร้อยละของแผนรับ</p>
                                        <p className="card-text">{numberFormat(masterData.percentApplicant, 2, ".", ",")} %</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md">
                                <div className="card shadow bg-danger text-light text-center">
                                    <div className="card-body">
                                        <h5 className="card-title">Stu.i</h5>
                                        <h3 className="card-text bg-light text-dark rounded-pill">{numberFormat(masterData.report, 0, ".", ",")} </h3>
                                        <p>ร้อยละของแผนรับ</p>
                                        <p className="card-text">{numberFormat(masterData.percentReport, 2, ".", ",")} %</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>



                </div>
            </div>


        </div>

    )
}

export default BarChart