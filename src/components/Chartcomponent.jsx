import React, { useState, useEffect, useRef } from 'react';
import Highcharts, { numberFormat } from 'highcharts';
import DataTable from './DataTable';
import './Mytable.css';
import ShareThisPage from './ShareThisPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faImage, faChartPie, faHouse } from '@fortawesome/free-solid-svg-icons';

import Header from './Header';
import { Link } from 'react-router-dom'

import html2canvas from 'html2canvas';
import 'canvas-toBlob';
import saveAs from 'file-saver';
import ExportToExcel from './ExportToExcel';
import { Swal } from 'sweetalert2';



const Chartcomponent = ({ counter }) => {
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

    const currentDate = new Date();

    // Get day, month, and year components
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = currentDate.getFullYear();
    const time = currentDate.toLocaleTimeString();

    // Combine the components to form the date string
    const formattedDate = `${day}/${month}/${year} เวลา ${time} `;
    const [chartData, setChartData] = useState([]);
    const [facultyID, setFacultyID] = useState('');
    const [dataTable, setDataTable] = useState([]);
    const [masterData, setMasterData] = useState({
        facultyName: '',
        plan: 0,
        applicant: 0,
        confirm: 0,
        report: 0,
        percentPlan: '100%',
        percentApplicant: 0.00,
        percentConfirm: 0.00,
        percentReport: 0.00,
    });
    const [nameClicked, setNameClicked] = useState('');
    const [divStyle, setDivStyle] = useState({});
    //ตรวจสอบว่ามีการเปลี่ยนขนาดหน้าจอหรือไม่
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    const [isMobile, setIsMobile] = useState(true);


    // useEffect(() => {

    //     const token = localStorage.getItem('token');
    //     const type = localStorage.getItem('type');
    //     if (!token) {
    //         window.location.href = '/login';
    //     }
    //     if (type !== 'staff') {
    //         Swal.fire({
    //             title: 'ไม่มีสิทธิ์เข้าใช้งาน',
    //             text: 'Error username or password',
    //             icon: 'error',
    //             confirmButtonText: 'OK',
    //             timer: 2000
    //         })

    //         window.location.href = '/login';
    //     }
    // }, []);




    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            if (newWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        // Add a listener for the resize event and call handleResize
        window.addEventListener("resize", handleResize);
        handleResize(); // Call it initially to set the correct state

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);





    useEffect(() => {

        fetch('https://api.rmutsv.ac.th/ars/export')
            .then(response => response.json())
            .then(data => {
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
                setChartData(data.faculty)


            })
            .catch(error => console.log(error))

    }, []);


    useEffect(() => {
        // Function to fetch data
        const fetchData = () => {
            if (!facultyID) {
                fetch(`https://api.rmutsv.ac.th/ars/export`)
                    .then(response => response.json())
                    .then(data => setDataTable(data.program))
                    .catch(error => console.log(error))
            } else {
                fetch(`https://api.rmutsv.ac.th/ars/faculty/${facultyID}`)
                    .then(response => response.json())
                    .then(data => setDataTable(data.program))
                    .catch(error => console.log(error))
            }
        };

        // Initial data fetch
        fetchData();

        // Set an interval to fetch data every 60 seconds
        const intervalId = setInterval(fetchData, 60000);
        console.log('intervalId', intervalId);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [facultyID]);


    /// end edit to fetch every 60 sec.




    useEffect(() => {
        const name = chartData.map(item => item.name);
        const planNumber = chartData.map(item => item.plan);


        Highcharts.chart('chart-container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: true,
                type: 'pie',
            },
            colors: [
                '#ffcc99', '#eee', '#90ed7d', '#f7a35c',
                'skyblue', '#f15c80', '#e4d354', '#8085e8',
                '#8d4653', '#91e8e1', '#90ee3e', '#e2e',
                '#141513', '#00154b', '#ff0000'
            ],
            title: {
                text: ''
                // text: `<h3 style='font-family:"Prompt",sans-serif;'>รายงานข้อมูลนักศึกษาใหม่ปีการศึกษา 2567</h3>`,
            },

            plotOptions: {
                pie: {
                    dataLabels: {
                        inside: true,
                        distance: isMobile ? -50 : 20,

                        enabled: true,
                        formatter: function () {
                            if (!isMobile) {
                                return '<p style="font-size: 14px; font-family: Sarabun, sans-serif;">' + this.point.name + ': ' + '[' + Highcharts.numberFormat(this.y, 0, '.', ',') + '] คน</p>';
                            } else {
                                return this.y > 0 ? this.point.id : null;
                            }

                            // 
                        },


                    },
                    point: {
                        events: {
                            click: function () {
                                // The 'this' keyword refers to the clicked point
                                const clickedName = this.name;
                                setNameClicked(clickedName);
                                const chartColors = Highcharts.getOptions().colors;
                                const ColorBranch = chartColors[this.index];
                                setDivStyle({ backgroundColor: ColorBranch });
                                console.log(chartColors[this.index]);
                                // Filter your data based on the clickedName
                                const filteredData = chartData.filter(item => item.name === clickedName);
                                setFacultyID(filteredData[0].id);
                                setMasterData({
                                    facultyName: filteredData[0].name,
                                    plan: filteredData[0].plan,
                                    applicant: filteredData[0].applicant,
                                    confirm: filteredData[0].confirm,
                                    report: filteredData[0].report,
                                    percentPlan: '100%',
                                    percentApplicant: filteredData[0].applicant / filteredData[0].plan * 100,
                                    percentConfirm: filteredData[0].confirm / filteredData[0].plan * 100,
                                    percentReport: filteredData[0].report / filteredData[0].plan * 100,

                                })

                            },
                        },
                    },
                },
            },

            series: [
                {
                    // name: name[0],
                    name: 'แผนรับ',
                    data: chartData.map(item => ({
                        id: item.id, name: item.name,
                        y: item.plan, // Assuming item.plan is a number
                        formattedY: item.plan.toLocaleString('en-US')

                    })),

                },
            ],
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.formattedY}</b><br/>',
            },
        });
    }, [chartData]);


    return (
        <div className='container'>

            <nav className='navbar navbar-extended-sm sticky-top' style={{ backdropFilter: 'blur(5px)' }}>


                <Link to="/" className='btn btn-primary rounded-pill mx-auto'> <FontAwesomeIcon icon={faHouse} /> {' '}Home</Link>
                <Link to="/area" className='btn btn-primary rounded-pill mx-auto'><FontAwesomeIcon icon={faChartPie} /> {' '}Area Report</Link>
                <button onClick={handleExportClick} className='btn btn-success rounded-pill shadow mx-auto'><FontAwesomeIcon icon={faImage} />{' '}Export to JPG</button>
                <ExportToExcel data={dataTable} title="pie" />

            </nav>




            <div className="container mt-2" ref={contentRef} id="export-to-jpg">
                {/* <button onClick={handleExportClick} className='btn btn-primary rounded-pill shadow m-2'>Export to JPG</button> */}
                <Header counter={counter} />


                {/* <BarChart /> */}
                <div className='main'>
                    <div id="chart-container">

                    </div>
                    <div className="container mt-2">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb bg-dark text-light p-2 rounded-pill justify-content-center align-items-center">
                                <li className="breadcrumb-item" aria-current="page">
                                    <button className='btn btn-primary mx-2 rounded-pill'
                                        onClick={() => window.location.reload()}
                                    >
                                        <FontAwesomeIcon icon={faArrowsRotate} />
                                    </button>
                                </li>

                                <li className=" bg-danger rounded-pill p-2 m-2" aria-current="page">{nameClicked ? nameClicked : 'ภาพรวมมหาวิทยาลัย'}
                                </li>


                                {/* <li className='bg-secondary rounded-pill p-2'> <FontAwesomeIcon icon={faEye} />  {counter} </li> */}

                                <div className='bg-light rounded-pill text-dark  p-2 ms-auto'>
                                    <ShareThisPage />

                                    {/* <ExportToJPG /> */}
                                </div>
                            </ol>
                        </nav>


                        <div className="row">

                            <div className="col-lg-8 col-md-12 col-sm column-1">
                                <DataTable data={dataTable} title="pie" />

                            </div>
                            <div className="col-lg-4 col-md-12 col-sm column-2">

                                <div className="row">
                                    <div className="col-lg-6 col-md">
                                        <div className="card text-center">
                                            <div className="card-body bg-primary text-light">
                                                <h5 className="card-title">แผนรับ</h5>
                                                <h3 className="percent-number-pretty">{masterData.plan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
                                                <p>ร้อยละของแผนรับ</p>
                                                <p className=''>{masterData.percentPlan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                            </div>

                                        </div>
                                        <div className="card text-center">
                                            <div className="card-body bg-warning text-dark">
                                                <h5 className="card-title">สมัคร</h5>
                                                <h3 className="percent-number-pretty">{masterData.applicant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
                                                <p>ร้อยละของแผนรับ</p>
                                                <p>{masterData.percentApplicant.toLocaleString('en', { maximumFractionDigits: 2 }) + "%"}</p>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-lg-6 col-md">
                                        <div className="card text-center">
                                            <div className="card-body bg-success text-light">
                                                <h5 className="card-title">Cf</h5>
                                                <h3 className="percent-number-pretty">{masterData.confirm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
                                                <p>ร้อยละของแผนรับ</p>
                                                <p>{masterData.percentConfirm.toLocaleString('en', { maximumFractionDigits: 2 }) + "%"}</p>
                                            </div>
                                        </div>
                                        <div className="card text-center">
                                            <div className="card-body bg-danger text-light">
                                                <h5 className="card-title">Stu.i</h5>
                                                <h3 className="percent-number-pretty">{masterData.report.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
                                                <p>ร้อยละของแผนรับ</p>
                                                <p>{masterData.percentReport.toLocaleString('en', { maximumFractionDigits: 2 }) + "%"}</p>
                                            </div>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Chartcomponent;
