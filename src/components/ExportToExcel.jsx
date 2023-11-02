import React, { useState, useEffect } from 'react'
import ExcelJs from 'exceljs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';

const ExportToExcel = ({ data }) => {
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('รายงานข้อมูลการรับเข้านักศึกษา');
    const [isExport, setIsExport] = useState(false);

    const handleExport = () => {
        setIsExport(true)
        if (!isExport) {
            return (
                <div>
                    <button className="btn btn-danger rounded-pill shadow mx-auto"><FontAwesomeIcon icon={faTable} /> {' '}Export to Excel</button>

                </div>
            )
        } else {
            worksheet.columns = [
                { header: 'หลักสูตร', key: 'name', width: '90', alignment: { vertical: 'middle', horizontal: 'left' } },
                { header: 'สมัคร', key: 'applicant', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'Cf', key: 'confirm', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
                { header: 'Stu.i', key: 'report', width: '15', alignment: { vertical: 'middle', horizontal: 'right' } },
            ];



            worksheet.getRow(1).font = { bold: true, size: 16, name: 'Sarabun' };


            data.map(item => {
                worksheet.addRow([item.name, item.applicant, item.confirm, item.report])
            })

            // worksheet.addRow(['รวม', data.plan, data.confirm, data.report]);

            workbook.xlsx.writeBuffer().then((data) => {
                const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.setAttribute('download', 'exported-data.xlsx');
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            }
            );
        }
    }







    return (
        <div>
            <button className="btn btn-danger rounded-pill shadow mx-auto" onClick={handleExport}><FontAwesomeIcon icon={faTable} />{' '}Export to Excel</button>
        </div>
    )
}

export default ExportToExcel