import React, { useState, useEffect } from 'react';
import Highcharts, { numberFormat } from 'highcharts';
import DataTable from './DataTable';
import './Mytable.css';
import ShareThisPage from './ShareThisPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';


const Chartcomponent = () => {
    const [chartData, setChartData] = useState([]);
    const [facultyID, setFacultyID] = useState();
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



    useEffect(() => {



        fetch('https://stdreport.rmutsv.ac.th/json')
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

    {
        facultyID ?
            useEffect(() => {

                fetch(`https://stdreport.rmutsv.ac.th/json/faculty/${facultyID}`)
                    .then(response => response.json())
                    .then(data => setDataTable(data.program))
                    .catch(error => console.log(error))
            }, [facultyID]) :
            useEffect(() => {
                fetch(`https://stdreport.rmutsv.ac.th/json/`)
                    .then(response => response.json())
                    .then(data => setDataTable(data.program))
                    .catch(error => console.log(error))
            }, [])
    }

    useEffect(() => {
        const name = chartData.map(item => item.name);
        const planNumber = chartData.map(item => item.plan);


        Highcharts.chart('chart-container', {
            chart: {
                type: 'pie',
            },
            colors: [
                '#7cb5ec', '#eee', '#90ed7d', '#f7a35c',
                '#ffcc00', '#f15c80', '#e4d354', '#8085e8',
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
                        enabled: true,
                        formatter: function () {
                            return '<p style="font-size: 14px; font-family: Prompt, sans-serif;">' + this.point.name + ': ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' คน</p>';
                        }

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
                    data: chartData.map(item => ({ name: item.name, y: item.plan })),

                },
            ],

        });
    }, [chartData]);


    return (
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

                        <li className=" bg-danger rounded-pill p-2" aria-current="page">{nameClicked ? nameClicked : 'ภาพรวมมหาวิทยาลัย'}
                        </li>
                        <div className='bg-light rounded-pill text-dark  p-2 ms-auto'>
                            <ShareThisPage />

                        </div>
                    </ol>
                </nav>


                <div className="row">

                    <div className="col-lg-8 col-md-12 col-sm">
                        <DataTable data={dataTable} />

                    </div>
                    <div className="col-lg-4 col-md-12 col-sm">
                        <div className="row">
                            {/* <div className="col d-flex justify-content-around align-item-center">
                                <h4>Social Share</h4>
                                <ShareThisPage />


                            </div> */}
                        </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Chartcomponent;
