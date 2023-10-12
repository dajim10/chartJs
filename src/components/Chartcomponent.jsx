import React, { useState, useEffect } from 'react';
import Highcharts, { numberFormat } from 'highcharts';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DataTable from './DataTable';
import './Mytable.css';
const columns = [

    {
        field: 'name',
        headerName: 'หลักสูตร',
        width: 300,
        editable: true,
    },
    {
        field: 'plan',
        headerName: 'แผนรับ',
        type: 'number',
        width: 50,
        editable: true,
    },
    {
        field: 'applicant',
        headerName: 'สมัคร',
        type: 'number',
        width: 50,
        editable: true,
    },
    {
        field: 'confirm',
        headerName: 'Cf',
        sortable: false,
        width: 50,
    },
    {
        field: 'report',
        headerName: 'Stu.i',
        sortable: false,
        width: 50,
    },

];



// rows.push({ id: 1, name: 'test', plan: 1, applicant: 1, confirm: 1, report: 1 });

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
                                // Do something with the filteredData (e.g., update state or perform other actions)
                                console.log(facultyID);
                                console.log(dataTable)
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

                <div className="row">
                    <h3 className='text-center'>{nameClicked}</h3>
                    <div className="col-lg-8 col-md-12 col-sm">
                        <DataTable data={dataTable} />

                    </div>
                    <div className="col-lg-4 col-md-12 col-sm">
                        <div className="row">
                            <div className="col-lg-6 col-md">
                                <div className="card text-center">
                                    <div className="card-body bg-primary text-light">
                                        <h5 className="card-title">แผนรับ</h5>
                                        <h3 className="card-text">{masterData.plan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
                                        <p>ร้อยละของแผนรับ</p>
                                        <p className='btn btn-light shadow'>{masterData.percentPlan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                    </div>

                                </div>
                                <div className="card text-center">
                                    <div className="card-body bg-warning text-dark">
                                        <h5 className="card-title">สมัคร</h5>
                                        <h3 className="card-text">{masterData.applicant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
                                        <p>ร้อยละของแผนรับ</p>
                                        <p className="btn btn-dark shadow">{masterData.percentApplicant.toLocaleString('en', { maximumFractionDigits: 2 }) + "%"}</p>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-6 col-md">
                                <div className="card text-center">
                                    <div className="card-body bg-success text-light">
                                        <h5 className="card-title">Cf</h5>
                                        <h3 className="card-text">{masterData.confirm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
                                        <p>ร้อยละของแผนรับ</p>
                                        <p className="btn btn-light shadow">{masterData.percentConfirm.toLocaleString('en', { maximumFractionDigits: 2 }) + "%"}</p>
                                    </div>
                                </div>
                                <div className="card text-center">
                                    <div className="card-body bg-danger text-light">
                                        <h5 className="card-title">Stu.i</h5>
                                        <h3 className="card-text">{masterData.report.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
                                        <p>ร้อยละของแผนรับ</p>
                                        <p className="btn btn-dark shadow">{masterData.percentReport.toLocaleString('en', { maximumFractionDigits: 2 }) + "%"}</p>
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
