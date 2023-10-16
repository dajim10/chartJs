import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import 'canvas-toBlob';
import saveAs from 'file-saver';
import Chartcomponent from './Chartcomponent';

const ExportToJPG = () => {
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

    return (
        <div className='py-2 rounded shadow'>
            <button onClick={handleExportClick} className='btn btn-primary rounded-pill shadow m-2'>Export to JPG</button>
            <div ref={contentRef} id="export-to-jpg">
                {/* Your content goes here */}

                <Chartcomponent />
            </div>
        </div>
    );
};

export default ExportToJPG;
