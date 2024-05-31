import { useState } from 'react';
import ButtonPrimary from './ButtonPrimary';
import mixpanel from 'mixpanel-browser';
import Swal from 'sweetalert2';

const Contact = ({ isMobileView }) => {
	const [mobileNumber, setMobileNumber] = useState('');
	const [isError , setIsError] = useState(false);

	const handleMobileNumber = (event) => {
		setIsError(false);
		const inputMobileNumber = event.target.value.replace(/[^0-9.]/g, '');
		setMobileNumber(inputMobileNumber);
	};

	const handleStoreNumberMixPanel = () => {
		if (!mobileNumber) return 0;
		if (mobileNumber.length !== 11) {
			setIsError(true);
			return 0;
		}

		mixpanel.track('Contact Page', {
			'Given Mobile Number': mobileNumber,
		});
		Swal.fire({
			position: 'center',
			icon: 'success',
			text: `A personnel from Jomma will get in touch with you soon.`,
			showConfirmButton: false,
			timer: 2000,
			allowOutsideClick: false,
			allowEscapeKey: false,
		});
		setMobileNumber('');
	};
	return (
		<div className={isMobileView ? 'container mt-5' : 'mt-5'}>
			<div
				className="container news-videos-background"
				style={{ borderRadius: '4px' }}
			>
				<h2 className="text-center video-section-header">
					Interested to Learn More About Jomma?
				</h2>
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
					{
						isError ?
					<small className="text-danger">Please provide valid number</small>
					:
					null
					}
				</div>

				<div className="d-flex justify-content-center mt-4">
					<ButtonPrimary
						onClick={handleStoreNumberMixPanel}
						size={isMobileView ? 'custom-medium' : 'custom-small'}
					>
						Submit
					</ButtonPrimary>
				</div>
			</div>
		</div>
	);
};

export default Contact;
