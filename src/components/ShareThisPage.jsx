import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LineShareButton,


} from 'react-share';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faXTwitter, faLine } from '@fortawesome/free-brands-svg-icons';


const ShareThisPage = () => {
    // Define the URL of the current page
    const currentPageUrl = 'https://ars.rmutsv.ac.th/';
    // const currentPageUrl = window.location.href;

    // You can customize the message to be shared
    const shareMessage = 'Check out this awesome page!';

    // URL of the image you want to include in the Facebook share preview
    const imagePreviewUrl = 'https://www.rmutsv.ac.th/ruts/wp-content/uploads/2023/10/previewImg.png';

    return (
        <div>

            <FacebookShareButton
                url={currentPageUrl}
                quote={shareMessage}
                picture={imagePreviewUrl} // Include the image URL
            >
                <FontAwesomeIcon icon={faFacebook} size="2x" className='text-primary' />
            </FacebookShareButton>
            <TwitterShareButton url={currentPageUrl} title={shareMessage}>
                <FontAwesomeIcon icon={faXTwitter} size="2x" className='mx-2' />

            </TwitterShareButton>
            <LineShareButton url={currentPageUrl} title={shareMessage}>
                <FontAwesomeIcon icon={faLine} size="2x" className='text-success' />
            </LineShareButton>
            {/* Add more share buttons for other platforms as needed */}
        </div>
    );
};

export default ShareThisPage;
