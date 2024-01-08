import React, { useEffect } from 'react'
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
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top" id="nav-menu">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" href="#"><FontAwesomeIcon icon={faHouse} /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {/* <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page" href="#">
                            <FontAwesomeIcon icon={faHouse} />
                            </Link>
                        </li> */}
                            <li className="nav-item">
                                <Link to="/area" className="btn btn-primary rounded-pill rounded-pill shadow mx-2 mb-2" href="#">Area Report</Link>
                            </li>
                            {/* <li className='nav-item'>
                            <button onClick={() => handleExportClick} className="btn btn-primary rounded-pill shadow" href="#">Export to JPG</button>
                        </li> */}


                        </ul>
                    </div>
                </div>
            </nav>
            <div className="navbar-mobile" >
                <div className="container-fluid">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, neque tenetur odio deleniti perspiciatis amet enim dolores dolor. Tempora a tenetur maxime quo illo quas dolorum nisi, cumque, enim unde reiciendis esse sit nemo aut molestias vitae debitis dolores at placeat culpa ea perferendis? Dolor nobis illum harum at nulla laborum commodi veritatis maiores, impedit itaque placeat molestias reiciendis fuga, voluptatem dolorum quos. Consectetur consequatur laboriosam voluptate exercitationem amet. Temporibus magnam similique natus numquam quod ad, assumenda dolorem voluptatem neque recusandae quas minima voluptates enim praesentium, corporis quia quibusdam eum laborum non error exercitationem possimus accusantium aspernatur. Laudantium, facere quasi vel sapiente mollitia totam facilis quos excepturi cupiditate fugiat ipsam in laborum assumenda minima ipsa iste culpa sequi. Alias corporis impedit tempore consequuntur debitis voluptatem quasi iusto, rerum, quia, possimus beatae tenetur quos. Vitae dolore modi, quibusdam, ullam accusamus deleniti error voluptates similique necessitatibus quaerat repellendus aspernatur dolorem perferendis possimus consectetur hic assumenda eum molestias iusto incidunt sequi nam expedita ipsum laboriosam! Quia veritatis ad modi dolore. Blanditiis vel nisi obcaecati, id est totam, nobis pariatur repudiandae quia perspiciatis, architecto maxime ducimus. Ipsam rerum repellendus commodi voluptate explicabo. Ipsam, consequuntur numquam? Fugiat quasi blanditiis labore modi repellat vel aspernatur fuga?</p>
                </div>
            </div>
        </>
    )
}

export default Navbar