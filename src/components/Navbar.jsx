import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
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
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">ARS</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page" href="#">
                                <FontAwesomeIcon icon={faHouse} />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/area" className="nav-link" href="#">Area Report</Link>
                        </li>
                        <li className='nav-item'>
                            <button onClick={() => handleExportClick} className="btn btn-primary rounded-pill shadow" href="#">Export to JPG</button>
                        </li>


                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar