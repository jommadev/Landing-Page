import styles from '@/styles/home/home.module.css';
import { useState } from 'react';
import ButtonPrimary from '../ButtonPrimary';
import { boProfileCompletion, redirectToPageBaseOnJS } from '@/utils/boProfile';
import { useRouter } from 'next/router';

const BoProfile = ({isMobileView, data}) => {
	const router = useRouter();
	const [completed, setCompleted] = useState(20);
	const handelBoAccount = () => {
		redirectToPageBaseOnJS(router, data)
	};
	return (
		<div className={`${styles.boProfileSection}`}>
			<div className="container">
				<div className="row">
					<div className="col-lg-7 col-md-7 col-sm-8 col-7 pe-0">
						<p className={`${styles.boCompletedBo} mb-1`}>To invest, please complete your BO account</p>
						<p className={`${styles.boCompletedPar} mb-0`}>{boProfileCompletion(data)}% Completed</p>
						<div className={`${styles.customeProgress} progress`}>
							<div
								className={`${styles.customeProgressBar} progress-bar`}
								role="progressbar"
								aria-valuenow={boProfileCompletion(data)}
								aria-valuemin="0"
								aria-valuemax="100"
								style={{ width: `${boProfileCompletion(data)}%` }}
							></div>
						</div>
						<p className={`${styles.progressberBottomText} mb-1`}>
							CDBL BO Account Fee - Tk 450/year
						</p>
						{/* <p className={`${styles.progressberBottomText} mb-1`}>
							Fee will be deducted by your Broker from your BO Account balance
							every year by 31 July.
						</p> */}
					</div>
					<div className="col-lg-5 col-md-5 col-sm-4 col-5">
						<div className={`${styles.btnCompleteBo} d-flex justify-content-end align-items-center h-100 mt-2`}>
							<ButtonPrimary onClick={handelBoAccount} size= {isMobileView ? "custom-medium" : "custom-small" }>
								{data > 0 ? 'Complete BO' : 'Open BO'}
							</ButtonPrimary>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BoProfile;
