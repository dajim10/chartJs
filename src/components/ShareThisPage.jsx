import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
} from 'react-share';

const ShareThisPage = () => {
    // Define the URL of the current page
    const currentPageUrl = 'https://stdreport.rmutsv.ac.th/';
    // const currentPageUrl = window.location.href;

    // You can customize the message to be shared
    const shareMessage = 'Check out this awesome page!';

    // URL of the image you want to include in the Facebook share preview
    const imagePreviewUrl = 'https://img-ha.mthcdn.com/lZMK6eDFIHgwFTrl5Luyc7NQ2fI=/mthai.com/app/uploads/2023/10/315848816_511683717675027_6592604874130095887_n.jpg';

    return (
        <div>
            <h2>Share This Page</h2>
            <FacebookShareButton
                url={currentPageUrl}
                quote={shareMessage}
                picture={imagePreviewUrl} // Include the image URL
            >
                Share on Facebook
            </FacebookShareButton>
            <TwitterShareButton url={currentPageUrl} title={shareMessage}>
                Share on Twitter
            </TwitterShareButton>
            {/* Add more share buttons for other platforms as needed */}
        </div>
    );
};

export default ShareThisPage;
