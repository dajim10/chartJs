import React, { useState, useEffect, useRef } from 'react'
import Highcharts, { numberFormat } from 'highcharts';
import DataTable from './DataTable';
import './Mytable.css';
import ShareThisPage from './ShareThisPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import html2canvas from 'html2canvas';
import 'canvas-toBlob';
import saveAs from 'file-saver';
import Header from './Header';

const BarChart = ({ data }) => {

    const [campusData, setCampusData] = useState([]);
    const contentRef = useRef(null);

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
        fetch('https://ars.rmutsv.ac.th/json')
            .then(response => response.json())
            .then(data => {
                setCampusData(data.campus)
            })
            .catch(error => console.log(error))
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
                data: [data.applicantqp, data.applicanttech, data.applicantqpm6]

            }, {
                name: 'Cf',
                data: [data.confirmqp, data.confirmtech, data.confirmqpm6]


            }, {
                name: 'Stu.i',
                data: [data.reportqp, data.reporttech, data.reportqpm6]

            }]

        });
    }, [data])


    return (
        <div className='container'>

            <nav className='navbar navbar-extended-sm sticky-top' style={{ backdropFilter: 'blur(5px)' }}>

                <Link to="/" className='btn btn-primary rounded-pill mx-auto'>Home</Link>
                {/* <Link to="/area" className='btn btn-primary rounded-pill mx-auto'>Area Report</Link> */}
                <button onClick={handleExportClick} className='btn btn-success rounded-pill shadow mx-auto'>Export to JPG</button>

            </nav>
            <div ref={contentRef} id="export-to-jpg">
                <Header />
                <div id="chart-container">


                </div>
                <div className="row mt-4 mb-3 float-left">

                    <ShareThisPage />

                </div>


                <div className="row">

                    <div className="col col-lg-9 col-md-6 col-sm">

                        <DataTable data={campusData} />

                    </div>
                    <div className="col col-lg-3 col-md-6 col-sm">

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
        </div>
    )
}

export default BarChart