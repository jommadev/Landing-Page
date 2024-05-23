import React, { useState } from 'react';
import ButtonPrimary from './ButtonPrimary';
import Swal from 'sweetalert2';

const Contact = ({isMobileView}) => {
    const [mobileNumber, setMobileNumber] = useState('');

    const handleMobileNumber = (event) => {
		const inputMobileNumber = event.target.value.replace(/[^0-9.]/g, '');
		setMobileNumber(inputMobileNumber);
	};


    const handleStoreNumberMixPanel = () =>{
		
			if(!mobileNumber)
				return 0;
			/* mixpanel.track('Contact Page', {
			'Given Mobile Number': mobileNumber,
			}) */
			Swal.fire({
				position: 'center',
				icon: 'success',
				text: `--------------------------`,
				showConfirmButton: false,
				timer: 2000,
				allowOutsideClick: false,
				allowEscapeKey: false,
			});
			setMobileNumber('');
	}
    return (
        <div
				className={isMobileView ? 'container mt-5' : 'mt-5'}
			>
				<div
					className="container news-videos-background"
					style={{ borderRadius: '4px' }}
				>
					<h1 className="text-center video-section-header">
						Interested to Learn More About Jomma?
					</h1>
					<p className="text-center contact-text">
						Share your contact number, we will contact you soon.
					</p>

					<div className="mobile-number-area">
						<input
							type="text"
							placeholder="Your Phone Number"
							className={` mobile-number-input text-center`}
							value={mobileNumber}
							onChange={handleMobileNumber}
						/>
					</div>

					<div className='d-flex justify-content-center mt-4'>
					<ButtonPrimary
                        onClick={handleStoreNumberMixPanel}
                        size= {isMobileView ? 'custom-medium' : 'custom-small'}
                      >
                        Share
                      </ButtonPrimary>
					</div>
				</div>
			</div>
    );
};

export default Contact;