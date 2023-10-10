import React, { useState, useEffect } from 'react';
import Highcharts, { numberFormat } from 'highcharts';

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

    useEffect(() => {
        fetch('https://stdreport.moo.mywire.org/json')
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


                fetch(`https://stdreport.moo.mywire.org/json/faculty/${facultyID}`)
                    .then(response => response.json())
                    .then(data => setDataTable(data.program))
                    .catch(error => console.log(error))
            }, [facultyID]) :
            useEffect(() => {
                fetch(`https://stdreport.moo.mywire.org/json/`)
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
                text: `<h1 style='font-family:"Prompt",sans-serif;'>รายงานข้อมูลนักศึกษาใหม่ปีการศึกษา 2567</h1>`,
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '<p style="font-size: 14px; font-family: Prompt, sans-serif;">' + this.point.name + ': ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' คน</p>';
                        }
                        // format: `<p: style='font-size:14px;font-family:"Mitr",sans-serif;'>{point.name}: {Highchart.numberFormat(point.y,0,'.',',')} คน </p> `,
                        // '<p style="font-size: 14px; font-family: Mitr, sans-serif;">' + this.point.name + ': ' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' คน</p>';
                    },
                    point: {
                        events: {
                            click: function () {
                                // The 'this' keyword refers to the clicked point
                                const clickedName = this.name;

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
                    name: name[0],
                    // data: chartData.map(item => ({ name: item.name, y: item.plan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") })),
                    // masterData.plan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    data: chartData.map(item => ({ name: item.name, y: item.plan })),
                    // data: chartData.map(item => ({ name: item.name, y: item.plan })),
                    // cheange plan to report ***
                    // drilldown: '01',
                },
            ],
            // drilldown: {
            //     series: [
            //         {
            //             name: 'คณะวิศวกรรมศาสตร์',
            //             id: '01',
            //             data: dataTable,
            //         }],
            // },
        });
    }, [chartData]);


    return (
        <div className='main'>
            <div id="chart-container">
            </div>
            <div className="container mt-2">

                <div className="row">
                    <div className="col-lg-9 col-md-12 col-sm">
                        <table className="table table-striped">
                            <thead className='bg-success'>
                                <tr>
                                    <th scope="col">หลักสูตร</th>
                                    <th scope="col">แผนรับ</th>
                                    <th scope="col">สมัคร</th>
                                    <th scope="col">CF</th>
                                    <th scope="col">Stu.i</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataTable.map((item, index) => (
                                    <tr key={index}>

                                        <td>{item.name}</td>
                                        <td>{item.plan}</td>
                                        <td>{item.applicant}</td>
                                        <td>{item.confirm}</td>
                                        <td>{item.report}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm">
                        <div className="card text-center">
                            <div className="card-body bg-primary text-light">
                                <h5 className="card-title">แผนรับ</h5>
                                <h1 className="card-text">{masterData.plan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                                <p>ร้อยละของแผนรับ</p>
                                <h3>{masterData.percentPlan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
                            </div>

                        </div>
                        <div className="card mt-3 text-center">
                            <div className="card-body bg-warning text-light">
                                <h5 className="card-title">สมัคร</h5>
                                <h1 className="card-text">{masterData.applicant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                                <p>ร้อยละของแผนรับ</p>
                                {masterData.percentApplicant.toLocaleString('en', { maximumFractionDigits: 2 }) + "%"}
                            </div>
                        </div>
                        <div className="card mt-3 text-center">
                            <div className="card-body bg-success text-light">
                                <h5 className="card-title">CF</h5>
                                <h1 className="card-text">{masterData.confirm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                                <p>ร้อยละของแผนรับ</p>
                                {masterData.percentConfirm.toLocaleString('en', { maximumFractionDigits: 2 }) + "%"}
                            </div>
                        </div>
                        <div className="card mt-3 text-center">
                            <div className="card-body bg-danger text-light">
                                <h5 className="card-title">Stu.i</h5>
                                <h1 className="card-text">{masterData.report.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                                <p>ร้อยละของแผนรับ</p>
                                {masterData.percentReport.toLocaleString('en', { maximumFractionDigits: 2 }) + "%"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};


export default Chartcomponent;
