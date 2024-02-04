import styles from '@/styles/home/home.module.css';
import { boProfileCompletion, redirectToManualOnboardingPageBaseOnJS, redirectToPageBaseOnJS } from '@/utils/boProfile';
import Image from 'next/image';
import previous from '../../../../assets/images/special-notice-previous.svg';
import next from '../../../../assets/images/special-notice-next.svg';
import ButtonPrimary from '../../ButtonPrimary';
import { useRouter } from 'next/router';

const BoProfileComplete = ({
	isMobileView,
	data,
	handleNext,
	handlePrev,
	sliderLength,
	currentIndex,
}) => {
	const router = useRouter();
	const handelBoAccount = () => {
		if(data?.DISABLE_PORICHOY){
			redirectToManualOnboardingPageBaseOnJS(router, data?.JOURNEY_STATUS);
		}else{
			redirectToPageBaseOnJS(router, data?.JOURNEY_STATUS);
		}
	};
	return (
		<>
			<div className="d-flex justify-content-between align-items-center">
				<div className="d-flex justify-content-center align-items-center">
					{sliderLength !== 1 && (
						<Image
							src={previous}
							alt="previous"
							className="me-3"
							onClick={handlePrev}
							style={{ cursor: 'pointer' }}
						/>
					)}
					<p className={`${styles.customeSliderCount} mb-0`}>
						{currentIndex} of {sliderLength}
					</p>
					{sliderLength !== 1 && (
						<Image
							src={next}
							alt="next"
							className="ms-3"
							onClick={handleNext}
							style={{ cursor: 'pointer' }}
						/>
					)}
				</div>
				<span className={`${styles.noticeInfo} mb-lg-2`}>
				</span>
			</div>

			<div className="row">
			<div className="col-lg-7 col-md-7 col-sm-8 col-7 d-flex align-items-center pe-0">
    <div>
        <p className={`${styles.boCompleted} mb-0`}>
            BO Account Progress: {boProfileCompletion(data?.JOURNEY_STATUS)}%
        </p>
        <div className={`${styles.specialNoticeCustomeProgress} progress`}>
            <div
                className={`${styles.customeProgressBar} progress-bar`}
                role="progressbar"
                aria-valuenow={boProfileCompletion(data?.JOURNEY_STATUS)}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${boProfileCompletion(data?.JOURNEY_STATUS)}%` }}
            ></div>
        </div>
    </div>
</div>
				<div className="col-lg-5 col-md-5 col-sm-4 col-5">
					<div
						className={`${styles.btnCompleteBo} d-flex justify-content-end align-items-center h-100 pb-0`}
					>
						<ButtonPrimary
							onClick={handelBoAccount}
							size={isMobileView ? 'custom-medium' : 'custom-small'}
						>
							{data > 0 ? 'Complete BO' : 'Open BO'}
						</ButtonPrimary>
					</div>
				</div>
			</div>
		</>
	);
};

export default BoProfileComplete;
